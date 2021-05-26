<template>
  <q-page padding>
    <DeviceEnvEditor v-on:reload="loadEnvs" :parentLoading="loading"
      :deviceConfigVars="configVars" :deviceEnvVars="envVars" :deviceServiceVars="serviceVars" 
    >
    </DeviceEnvEditor>
  </q-page>
</template>

<script>
import DeviceEnvEditor from "../components/DeviceEnvEditor"
export default {

  data() {
    return {
      loading: false,
      configVars: [],
      envVars: [],
      serviceVars: []
    }
  },
  components: { DeviceEnvEditor },
  mounted() {
    this.loadEnvs()
  },
  methods: {
    async loadEnvs() {
      this.loading = true
      this.configVars = await this.$store.state.main.sdk.models.device.configVar.getAllByDevice(this.$route.params.deviceid)
      this.envVars = await this.$store.state.main.sdk.models.device.envVar.getAllByDevice(this.$route.params.deviceid)
      this.serviceVars = await this.$store.state.main.sdk.models.device.serviceVar.getAllByDevice(this.$route.params.deviceid)
      this.loading = false
    }
  }
}
</script>
