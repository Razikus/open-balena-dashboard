<template>
  <q-page padding>
    <DeviceEnvEditor v-on:reload="loadEnvs" :currentEnvs="envVars" :appConfigVars="configVars" :parentLoading="loading"></DeviceEnvEditor>
  </q-page>
</template>

<script>
import DeviceEnvEditor from "../components/DeviceEnvEditor"
export default {

  data() {
    return {
      loading: false,
      envVars: [],
      configVars: []
    }
  },
  components: { DeviceEnvEditor },
  mounted() {
    this.loadEnvs()
  },
  methods: {
    async loadEnvs() {
      this.loading = true
      this.envVars = await this.$store.state.main.sdk.models.device.envVar.getAllByDevice(this.$route.params.deviceid)
      this.configVars = await this.$store.state.main.sdk.models.device.configVar.getAllByDevice(this.$route.params.deviceid)
      this.loading = false
    }
  }
}
</script>
