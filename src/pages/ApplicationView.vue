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
      grid
      title="Devices"
      :data="devices"
      :columns="columns"
      row-key="device_name"
      :selected.sync="selected"
    >

      <template v-slot:item="props">
        <div
          class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
        >
          <q-card >
            <q-card-section>
              <q-btn @click="showLogs(props)">{{ $t("logs") }}</q-btn>
            </q-card-section>
            <q-separator />
            <q-list dense>
              <q-item v-for="col in props.cols" :key="col.name">
                <q-item-section>
                  <q-item-label>{{ col.label }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption>{{ col.value }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
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
export default {
  data() {
    return {
      devices: [],
      selected: null,
      history: this.$t("notloaded"),
      dialog: false,
      currLogs: null,
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
          field: row => row.is_online + "/" + row.is_connected_to_vpn,
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
          field: row => row.overall_status + " " + row.overall_progress,
          format: val => `${val}`,
          sortable: true
        }

      ]
    }
  },
  mounted() {
    this.loadApplicationDetails()
  },
  methods: {
    async loadApplicationDetails() {
      this.devices = await this.$store.state.main.sdk.models.device.getAllByApplication(this.$route.params.id)
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
