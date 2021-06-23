<template>
  <q-page padding>
    <EnvEditor v-on:reload="loadEnvs" :parentLoading="loading"
    :appConfigVars="configVars" :appEnvVars="envVars" :appBuildVars="buildVars"
    >
    </EnvEditor>
  </q-page>
</template>

<script>
import EnvEditor from "../components/EnvEditor"
export default {

  data() {
    return {
      loading: false,
      envVars: [],
      configVars: [],
      buildVars: []
    }
  },
  components: { EnvEditor },
  mounted() {
    this.loadEnvs()
  },
  methods: {
    async loadEnvs() {
      this.loading = true

      // 3 sets of vars for the application
      this.configVars = await this.$store.state.main.sdk.models.application.configVar.getAllByApplication(this.$route.params.id)
      console.log("app config vars", this.configVars)
      this.envVars = await this.$store.state.main.sdk.models.application.envVar.getAllByApplication(this.$route.params.id)
      console.log("app env vars", this.envVars)
      // !! Broken
      // this.buildVars = await this.$store.state.main.sdk.models.application.buildVar.getAllByApplication(this.$route.params.id)
      this.buildVars = [{ name: "", value: "" }]
      console.log("build env vars", this.buildVars)

      this.loading = false
    }
  }
}
</script>
