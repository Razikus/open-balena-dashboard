<template>
  <q-page class="row" padding>
      <div class="col-md-6 col-sm-12">
        <div class="row justify-start">
          <div class="col-md-11 col-sm-12">
              <q-card class="col-xl-3 col-md-4 col-sm-12 col-xs-12" v-if="device">
                <q-card-section>
                  <p class="text-grey">{{$t('Device')}}</p>
                  <div class="row q-col-gutter-lg">
                    <div class="col-6">
                      <p class="text-h6">{{device.device_name}}</p>
                      <q-popup-edit
                        v-model="device.device_name"
                        buttons
                        @save="saveDeviceName(device)"
                        :title="$t('editname')"
                      >
                        <q-input v-model="device.device_name" dense autofocus counter/>
                      </q-popup-edit>
                      <q-tooltip>
                        {{ $t('double-click') }}
                      </q-tooltip>
                    </div>
                    <div class="col-3">
                      <q-btn rounded color="red" :loading="rebootLoading" icon="restart_alt" @click="reboot" v-if="device.is_online">{{
                          $t("reboot")
                        }}
                      </q-btn>
                    </div>
                    <div class="col-3">
                      <q-btn rounded icon="sync" @click="restart" v-if="device.is_online">{{
                          $t("restart")
                        }}
                      </q-btn>
                    </div>
                  </div>
                </q-card-section>
                <q-card-section>
                  <div class="row">
                    <div class="col-4">
                      <q-item-label>
                        {{$t('online')}}
                      </q-item-label>
                      <q-item-label class="q-gutter-sm">
                        <Dot color="green" v-if="device.is_online"></Dot>
                        <Dot color="red" v-else></Dot>
                        /
                        <Dot color="green" v-if="device.is_connected_to_vpn"></Dot>
                        <Dot color="red" v-else></Dot>
                        <q-badge :color="determineStatusColor(device.overall_status)">{{device.overall_status}}</q-badge>
                      </q-item-label>
                    </div>
                    <div class="col-4">
                      <q-item-label>
                        {{$t('uuid')}}
                      </q-item-label>
                      <q-badge style="font-size: 15px;" text-color="deep-orange-14" color="pink-1">
                        {{device.uuid.substring(0,7)}}
                        <q-icon name="content_copy" @click="copyUUIDToClipboard"/>
                      </q-badge>
                    </div>
                    <div class="col-4">
                      <q-item-label>
                        {{$t('type')}}
                      </q-item-label>
                      <q-item-label>
                        <q-img width="20px" :src="deviceType.logo"></q-img>
                        {{deviceType.name}}
                      </q-item-label>

                    </div>
                  </div>

                </q-card-section>
                <q-separator/>
                <q-card-section>
                  <div class="row">
                    <div class="col-4">
                      <q-item-label>
                        {{$t('last_connectivity_event')}}
                      </q-item-label>
                      <q-item-label>
                        <q-badge color="blue">
                          {{getRelTime(device.last_connectivity_event)}}
                        </q-badge>

                      </q-item-label>
                    </div>
                    <div class="col-4">
                      <q-item-label>
                        {{$t('hostVer')}}
                      </q-item-label>
                      <q-badge style="font-size: 14px;" outline color="blue">
                        {{device.os_version}}
                      </q-badge>
                    </div>
                    <div class="col-4">
                      <q-item-label>
                        {{$t('supervisor_version')}}
                      </q-item-label>
                      <q-badge style="font-size: 14px;" outline color="blue">
                        {{device.supervisor_version}}
                      </q-badge>

                    </div>
                  </div>
                </q-card-section>
                <q-card-section>
                  <div class="row">
                    <div class="col-6">
                      <q-item-label>
                        {{$t('is_running_release')}}
                      </q-item-label>
                      <q-badge style="font-size: 14px;" text-color="deep-orange-14" color="pink-1">
                        {{releaseInfo.commit.substring(0,7)}}
                      </q-badge>
                    </div>
                    <div class="col-6">
                      <q-item-label>
                        {{$t('ip')}}
                      </q-item-label>
                      <q-badge style="font-size: 14px;" text-color="deep-orange-14" color="pink-1">
                        {{device.ip_address.split(" ").join("/")}}
                        <q-icon name="content_copy" @click="copyIP"/>
                      </q-badge>
                    </div>
                  </div>
                </q-card-section>
                <q-card-section>
                  <div class="row">
                    <div class="col-12">
                      <q-item-label>
                        {{$t('note')}}
                      </q-item-label>
                      <q-input
                        v-model="device.note"
                        filled
                        type="textarea"
                        autogrow
                        @input="saveNote"
                      />
                    </div>
                  </div>
                </q-card-section>
                <q-card-section>
                  <q-btn :to="'/deviceenvs/'+  device.uuid">{{
                      $t("editDeviceEnv")
                    }}
                  </q-btn>
                </q-card-section>
              </q-card>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-sm-12">
        <div class="row justify-end">
          <div class="col-12">
            <LogTerminal :uuid="currentUUID" :maximized-toggle="maximizedToggle"/>
          </div>
        </div>
      </div>
  </q-page>
</template>
<script>
import Dot from "../components/Dot"
import LogTerminal from "components/LogTerminal"
import { copyToClipboard } from 'quasar'
import getRelativeTime from "../utils/timeUtils"
export default {
  components: { LogTerminal, Dot },
  data() {
    return {
      device: undefined,
      releaseInfo: { commit: "" },
      filter: '',
      currentUUID: '',
      rebootLoading: false,
      loading: false,
      maximizedToggle: true,
      history: this.$t("notloaded"),
      currLogs: null,
      appEnvVars: [],
      appConfigVars: [],
      deviceLoadingState: {},
      services: {},
      deviceType: {},
      timers: []
    }
  },
  async beforeMount() {
    await this.loadApplicationDetails()
    this.$store.commit("main/selectDevice", this.device.device_name)
  },
  mounted() {
    this.timers = [setInterval(this.loadApplicationDetails, 10000)]
  },
  destroyed() {
    this.timers.forEach(clearInterval)
  },
  methods: {
    copyUUIDToClipboard() {
      copyToClipboard(this.currentUUID).then(res => {
        this.$q.notify({
          type: 'positive',
          message: this.$t('clipboard')
        })
      })
    },
    copyIP() {
      copyToClipboard(this.device.ip_address).then(res => {
        this.$q.notify({
          type: 'positive',
          message: this.$t('clipboard')
        })
      })
    },
    getRelTime(time) {
      return getRelativeTime(this.$i18n.locale, new Date(time))
    },
    async saveNote() {
      await this.$store.state.main.sdk.models.device.note(this.device.uuid, this.device.note)
    },
    async reboot() {
      this.rebootLoading = true
      await this.$store.state.main.sdk.models.device.reboot(this.currentUUID).then(res => {
        this.rebootLoading = false
      }).catch(_ => {
        this.rebootLoading = false
      })
    },
    async saveDeviceName(name) {
      this.loading = true
      await this.$store.state.main.sdk.models.device.rename(
        this.device.uuid,
        this.device.device_name
      ).then(res => {
        this.$store.commit("main/selectDevice", this.device.device_name)
      })
      this.loading = false
    },
    async restart() {
      this.loading = true
      await this.$store.state.main.sdk.models.device.restartApplication(this.currentUUID)
      this.loading = false
    },
    async loadApplicationDetails() {
      this.device = await this.$store.state.main.sdk.models.device.getWithServiceDetails(
        this.$route.params.id
      )
      this.currentUUID = this.device.uuid
      const deviceTypeData = await this.$store.state.main.sdk.models.device.getManifestByApplication(this.device.belongs_to__application.__id)
      this.deviceType = { name: deviceTypeData.name + " (" + deviceTypeData.slug + ")" }
      this.releaseInfo = await this.$store.state.main.sdk.models.release.get(this.device.is_running__release.__id)
    },
    determineStatusColor(status) {
      if (status === undefined) {
        return "gray"
      }
      switch (status.toLowerCase()) {
        case "idle": {
          return "green"
        }
        case "offline": {
          return "red"
        }
        case "updating": {
          return "orange"
        }
      }
    }
  }
}
</script>
