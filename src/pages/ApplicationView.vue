<template>
  <q-page padding>
    <LogTerminal :hideLog="hideLog" :uuid="currentUUID" :dialog="dialog" :maximized-toggle="maximizedToggle"/>
    <q-table
      :loading="loading"
      grid
      title="Devices table"
      :data="devices"
      :columns="columns"
      row-key="device_name"
      :selected.sync="selected"
      :pagination.sync="pagination"
    >
      <template v-slot:item="props">
        <q-card class="col-xl-3 col-md-4 col-sm-12 col-xs-12">
          <q-list dense>
            <q-item v-for="col in props.cols" :key="col.name">
              <q-item-section>
                <q-item-label>{{ col.label }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label v-if="col.name == 'is_online'">
                  <Dot color="green" v-if="props.row.is_online"></Dot>
                  <Dot color="red" v-else></Dot>
                  /
                  <Dot color="green" v-if="props.row.is_connected_to_vpn"></Dot>
                  <Dot color="red" v-else></Dot>
                </q-item-label>
                <q-item-label v-else-if="col.name == 'device_name'">
                  {{ col.value }}
                  <q-popup-edit
                    v-model="props.row.device_name"
                    buttons
                    @save="saveDeviceName(props)"
                    :title="$t('editname')"
                  >
                    <q-input v-model="props.row.device_name" dense autofocus counter/>
                  </q-popup-edit>
                </q-item-label>
                <q-item-label v-else-if="col.name == 'note'">
                  <span v-if="props.row.note !== null"> {{ col.value }}</span>
                  <span v-else>{{ $t("nonote") }}</span>
                  <q-popup-edit
                    v-model="props.row.note"
                    buttons
                    @save="saveNote(props)"
                    :title="$t('editname')"
                  >
                    <q-input v-model="props.row.note" dense autofocus counter/>
                  </q-popup-edit>
                </q-item-label>
                <q-item-label v-else>{{ col.value }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <q-separator/>
          <q-card-section>
            <q-btn @click="showLog(props.row.uuid)">{{ $t("logs") }}</q-btn>
            <q-btn @click="reboot(props)" v-if="props.row.is_online">{{
                $t("reboot")
              }}
            </q-btn>
            <q-btn @click="restart(props)" v-if="props.row.is_online">{{
                $t("restart")
              }}
            </q-btn>
            <q-btn :to="'/deviceenvs/' + $route.params.id + '/' +  props.row.uuid">{{
                $t("editDeviceEnv")
              }}
            </q-btn>
          </q-card-section>
          <q-separator/>
          <q-card-section v-if="$store.state.main.tunnelerUrl">
            <q-toggle
              v-model="props.row.sshExposed"
              color="green"
              :label="$t('exposedssh')"
              @input="ssh(props)"
              checked-icon="check"
              unchecked-icon="clear"
              :disable="deviceLoadingState[props.row.uuid]"
              style="width: 200px;"
            />
            <q-btn v-if="props.row.sshExposed" @click="openDomain(props.row.sshDetails)"
                   :disable="deviceLoadingState[props.row.uuid]" style="margin-left: 10px;" color="secondary">
              {{ $t("open") }}
            </q-btn>
          </q-card-section>
          <q-card-section v-if="$store.state.main.tunnelerUrl">
            <q-toggle
              v-model="props.row.exposed"
              color="green"
              :label="$t('exposed80')"
              @input="expose(props)"
              checked-icon="check"
              unchecked-icon="clear"
              :disable="deviceLoadingState[props.row.uuid]"
              style="width: 200px;"
            />
            <q-btn @click="openDomain(props.row.exposedDetails)" :disable="deviceLoadingState[props.row.uuid]"
                   v-if="props.row.exposed" style="margin-left: 10px;" color="secondary">{{ $t("open") }}
            </q-btn>
          </q-card-section>
          <q-card-section v-if="$store.state.main.tunnelerUrl && $store.state.main.SSLSuffix">
            <q-toggle
              v-model="props.row.exposedSSL"
              color="green"
              :label="$t('exposedSSL')"
              @input="exposeSSL(props)"
              checked-icon="check"
              unchecked-icon="clear"
              :disable="deviceLoadingState[props.row.uuid]"
              style="width: 200px;"
            />
            <q-btn @click="openDomain(props.row.exposedDetails)" :disable="deviceLoadingState[props.row.uuid]"
                   v-if="props.row.exposedSSL" style="margin-left: 10px;" color="secondary">{{ $t("open") }}
            </q-btn>
          </q-card-section>
          <q-separator/>
        </q-card>
      </template>
    </q-table>
  </q-page>
</template>
<script>
import Dot from "../components/Dot"
import LogTerminal from "components/LogTerminal"

export default {
  components: { LogTerminal, Dot },
  data() {
    return {
      devices: [],
      currentUUID: '',
      loading: false,
      maximizedToggle: true,
      sshExpose: false,
      selected: null,
      history: this.$t("notloaded"),
      dialog: false,
      currLogs: null,
      appEnvVars: [],
      appConfigVars: [],
      deviceLoadingState: {},
      pagination: {
        rowsPerPage: 20
      },
      columns: [
        {
          name: "device_name",
          label: this.$t("name"),
          align: "left",
          field: (row) => row.device_name,
          format: (val) => `${val}`,
          sortable: true
        },
        {
          name: "is_online",
          label: this.$t("online"),
          align: "left",
          field: (row) => [row.is_online, row.is_connected_to_vpn],
          format: (val) => `${val}`,
          sortable: true
        },
        {
          name: "ip_address",
          label: this.$t("ip"),
          align: "left",
          field: (row) => row.ip_address,
          format: (val) => `${val}`,
          sortable: true
        },
        {
          name: "mac_address",
          label: this.$t("mac_address"),
          align: "left",
          field: (row) => row.mac_address,
          format: (val) => `${val}`,
          sortable: true
        },
        {
          name: "note",
          label: this.$t("note"),
          align: "left",
          field: (row) => row.note,
          format: (val) => `${val}`,
          sortable: true
        },
        {
          name: "status",
          label: this.$t("overall"),
          align: "left",
          field: (row) =>
            row.overall_status +
            " " +
            (row.overall_progress == null ? "" : row.overall_progress),
          format: (val) => `${val}`,
          sortable: true
        },
        {
          name: "uuid",
          label: this.$t("uuid"),
          align: "left",
          field: (row) => row.uuid,
          format: (val) => `${val}`,
          sortable: true
        },
        {
          name: "last_connectivity_event",
          label: this.$t("last_connectivity_event"),
          align: "left",
          field: (row) => row.last_connectivity_event,
          format: (val) => `${new Date(val).toLocaleString()}`,
          sortable: true
        },
        {
          name: "created_at",
          label: this.$t("created_at"),
          align: "left",
          field: (row) => row.created_at,
          format: (val) => `${new Date(val).toLocaleString()}`,
          sortable: true
        }
      ]
    }
  },
  mounted() {
    this.loadApplicationDetails()
    setInterval(this.loadApplicationDetails, 5000)
    this.$store.commit("main/selectApplication", this.$route.params.id)
  },
  methods: {
    async saveNote(what) {
      this.loading = true
      await this.$store.state.main.sdk.models.device.note(what.row.uuid, what.row.note)
      this.loading = false
    },
    showLog(uuid) {
      this.dialog = true
      this.currentUUID = uuid
    },
    hideLog() {
      this.dialog = false
    },
    async reboot(what) {
      this.loading = true
      await this.$store.state.main.sdk.models.device.reboot(what.row.uuid)
      this.loading = false
    },
    async saveDeviceName(what) {
      this.loading = true
      await this.$store.state.main.sdk.models.device.rename(
        what.row.uuid,
        what.row.device_name
      )
      this.loading = false
    },
    async restart(what) {
      this.loading = true
      await this.$store.state.main.sdk.models.device.restartApplication(what.row.uuid)
      this.loading = false
    },
    async loadApplicationDetails() {
      const devices = await this.$store.state.main.sdk.models.device.getAllByApplication(
        this.$route.params.id
      )
      console.log(devices)
      if (this.$store.state.main.tunnelerUrl) {
        const tunnelerInformation = await this.$tunnelerClient.getConnectionsForApp(
          this.$route.params.id
        )
        for (let index = 0; index < devices.length; index++) {
          const device = devices[index]
          if (device.sshExposed === undefined) {
            device.sshExposed = false
          }
          if (device.exposed === undefined) {
            device.exposed = false
          }
          if (device.exposedSSL === undefined) {
            device.exposedSSL = false
          }
          for (let index = 0; index < tunnelerInformation.length; index++) {
            const element = tunnelerInformation[index]
            if (device.uuid === element.deviceUUID) {
              if (element.forwarderType === "SSHTRAEFIK") {
                device.sshExposed = true
                device.sshDetails = element
              } else if (element.forwarderType === "TRAEFIK") {
                device.exposed = true
                device.exposedDetails = element
              } else if (element.forwarderType === "SSLTRAEFIK") {
                device.exposedSSL = true
                device.exposedDetails = element
                device.exposedDetails.ssl = true
              }
              if (device.tunneler) {
                device.tunneler.push(element)
              } else {
                device.tunneler = [element]
              }
            }
          }
        }
      }
      this.devices = devices
    },
    async openDomain(details) {
      const prefix = details.ssl ? "https://" : "http://"
      window.open(prefix + details.domainName, "_blank")
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
      if (this.$store.state.main.tunnelerUrl) {
        const tunnelerInformation = await this.$tunnelerClient.getConnectionsForDevice(
          what.row.uuid
        )
        res.tunneler = tunnelerInformation
        res.exposedSSL = false
        res.exposed = false
        res.sshExposed = false
        for (let index = 0; index < res.tunneler.length; index++) {
          const element = res.tunneler[index]
          console.log(element)
          if (element.forwarderType === "SSHTRAEFIK") {
            res.sshExposed = true
            res.sshDetails = element
            res.exposedDetails.ssl = false
          } else if (element.forwarderType === "TRAEFIK") {
            res.exposed = true
            res.exposedDetails = element
            res.exposedDetails.ssl = false
          } else if (element.forwarderType === "SSLTRAEFIK") {
            res.exposedSSL = true
            res.exposedDetails = element
            res.exposedDetails.ssl = true
          }
        }
      }
      this.devices.splice(realIndex, 1, res)
      this.loading = false
    },

    async exposeSSL(props) {
      this.loading = true
      this.deviceLoadingState[props.row.uuid] = true
      const uuid = props.row.uuid
      if (!props.row.exposedSSL) {
        await this.$tunnelerClient.deleteConnections(
          uuid,
          undefined,
          undefined,
          "SSLTRAEFIK"
        )
      } else {
        const domain = uuid.substr(0, 10) + ".s1.skryba.online"
        await this.$tunnelerClient.openSSLDomainFor(
          uuid,
          domain,
          80,
          this.$route.params.id
        )
        props.row.exposedDetails = {
          domainName: "https://" + domain
        }
        await new Promise((resolve) => setTimeout(resolve, 500))
        window.open(props.row.exposedDetails.domainName, "_blank")
      }
      this.deviceLoadingState[props.row.uuid] = false
      this.loading = false
    },
    async expose(props) {
      this.loading = true
      this.deviceLoadingState[props.row.uuid] = true
      const uuid = props.row.uuid
      if (!props.row.exposed) {
        await this.$tunnelerClient.deleteConnections(
          uuid,
          undefined,
          undefined,
          "TRAEFIK"
        )
      } else {
        const res = await this.$tunnelerClient.openDomainFor(
          uuid,
          uuid,
          80,
          true,
          this.$route.params.id
        )
        props.row.exposedDetails = {
          domainName: "http://" + uuid + "." + res.ip + ".xip.io"
        }
        await new Promise((resolve) => setTimeout(resolve, 500))
        window.open(props.row.exposedDetails.domainName, "_blank")
      }
      this.deviceLoadingState[props.row.uuid] = false
      this.loading = false
    },
    async ssh(props) {
      this.loading = true
      this.deviceLoadingState[props.row.uuid] = true
      const uuid = props.row.uuid
      if (!props.row.sshExposed) {
        await this.$tunnelerClient.deleteConnections(
          uuid,
          undefined,
          undefined,
          "SSHTRAEFIK"
        )
      } else {
        const res = await this.$tunnelerClient.openSSHTraefik(
          uuid,
          "ssh." + uuid,
          22222,
          true,
          this.$route.params.id
        )
        props.row.sshDetails = {
          domainName: "http://ssh." + uuid + "." + res.ip + ".xip.io"
        }
        await new Promise((resolve) => setTimeout(resolve, 500))
        window.open(props.row.sshDetails.domainName, "_blank")
      }
      this.loading = false
      this.deviceLoadingState[props.row.uuid] = false
    }
  }
}
</script>
