<template>
  <q-page padding>
    <q-dialog v-model="dialog">
      <q-card class="big">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Logs</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <pre>{{ history }}</pre>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-table
      :loading="loading"
      grid
      title="Devices"
      :data="devices"
      :columns="columns"
      row-key="device_name"
      :selected.sync="selected"
      :pagination.sync="pagination"
    >

      <template v-slot:item="props">
        <div
          class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
        >
          <q-card >
            <q-list dense>
              <q-item v-for="col in props.cols" :key="col.name">
                
                <q-item-section>
                  <q-item-label>{{ col.label }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label v-if="col.name == 'is_online'">
                    <Dot color='green' v-if="props.row.is_online"></Dot>
                    <Dot color='red' v-else></Dot> / 
                    <Dot color='green' v-if="props.row.is_connected_to_vpn"></Dot>
                    <Dot color='red' v-else></Dot>
                  </q-item-label>
                  <q-item-label v-else-if="col.name == 'device_name'">
                    {{col.value}}
                    <q-popup-edit v-model="props.row.device_name" buttons @save="saveDeviceName(props)" :title="$t('editname')">
                      <q-input v-model="props.row.device_name" dense autofocus counter />
                    </q-popup-edit>
                  </q-item-label>
                  <q-item-label v-else-if="col.name == 'note'">
                    <span v-if="props.row.note !== null"> {{ col.value }}</span>
                    <span v-else>{{ $t('nonote') }}</span>
                    <q-popup-edit v-model="props.row.note" buttons @save="saveNote(props)" :title="$t('editname')">
                      <q-input v-model="props.row.note" dense autofocus counter />
                    </q-popup-edit>
                  </q-item-label>
                  <q-item-label v-else>{{ col.value }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <q-separator />
            <q-card-section>
              <q-btn @click="showLogs(props)">{{ $t("logs") }}</q-btn>
              <q-btn @click="reboot(props)" v-if="props.row.is_online">{{ $t("reboot") }}</q-btn>
              <q-btn @click="restart(props)" v-if="props.row.is_online">{{ $t("restart") }}</q-btn>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <q-btn @click="refresh(props)">{{ $t("refresh") }}</q-btn>
            </q-card-section>
          </q-card>
        </div>
      </template>

    </q-table>
  </q-page>
</template>
<style scoped>
.big {
  min-width: 100%;
}
</style>
<script>

import Dot from "../components/Dot"

export default {
  components: { Dot },
  data() {
    return {
      devices: [],
      loading: false,
      selected: null,
      history: this.$t("notloaded"),
      dialog: false,
      currLogs: null,
      appEnvVars: [],
      appConfigVars: [],
      pagination: {
        rowsPerPage: 20
      },
      columns: [
        {
          name: 'device_name',
          label: this.$t("name"),
          align: 'left',
          field: row => row.device_name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'is_online',
          label: this.$t("online"),
          align: 'left',  
          field: row => [row.is_online, row.is_connected_to_vpn],
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'ip_address',
          label: this.$t("ip"),
          align: 'left',
          field: row => row.ip_address,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'note',
          label: this.$t("note"),
          align: 'left',
          field: row => row.note,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'status',
          label: this.$t("overall"),
          align: 'left',
          field: row => row.overall_status + " " + (row.overall_progress == null ? "" : row.overall_progress),
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'uuid',
          label: this.$t("uuid"),
          align: 'left',
          field: row => row.uuid,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'last_connectivity_event',
          label: this.$t("last_connectivity_event"),
          align: 'left',
          field: row => row.last_connectivity_event,
          format: val => `${val}`,
          sortable: true
        }
      ]
    }
  },
  mounted() {
    this.loadApplicationDetails()
    this.$store.commit("main/selectApplication", this.$route.params.id)
  },
  methods: {
    async saveNote(what) {
      this.loading = true
      await this.$store.state.main.sdk.models.device.note(what.row.uuid, what.row.note)
      this.loading = false
    },
    async reboot(what) {
      this.loading = true
      await this.$store.state.main.sdk.models.device.reboot(what.row.uuid)
      this.loading = false
    },
    async saveDeviceName(what) {
      this.loading = true
      await this.$store.state.main.sdk.models.device.rename(what.row.uuid, what.row.device_name)
      this.loading = false
    },
    async restart(what) {
      this.loading = true
      await this.$store.state.main.sdk.models.device.restartApplication(what.row.uuid)
      this.loading = false
    },
    async loadApplicationDetails() {
      this.loading = true
      this.devices = await this.$store.state.main.sdk.models.device.getAllByApplication(this.$route.params.id)
      this.loading = false
    },
    async refresh(what) {
      this.loading = true
      const res = await this.$store.state.main.sdk.models.device.get(what.row.uuid)
      let realIndex = null
      for (let index = 0; index < this.devices.length; index++) {
        const element = this.devices[index]
        if (element.uuid === what.row.uuid) {
          realIndex = index
          break
        }
      }
      this.devices.splice(realIndex, 1, res)
      this.loading = false
    },
    async showLogs(what) {
      if (this.currLogs) {
        this.currLogs.unsubscribe()
      }
      this.history = "Loading"
      this.dialog = true
      const uuid = what.row.uuid
      let historyNew = ""
      const history = await this.$store.state.main.sdk.logs.history(uuid)
      for (let index = history.length - 1; index >= 0; index--) {
        const element = history[index]
        historyNew = historyNew + "\n" + new Date(element.timestamp).toISOString() + ": " + element.message
      }
      this.history = historyNew

      const logs = await this.$store.state.main.sdk.logs.subscribe(uuid)
      logs.on("line", (line) => {
        this.history = new Date(line.timestamp).toISOString() + ": " + line.message + "\n" + this.history
      })
      this.currLogs = logs
    }
  }
}
</script>
