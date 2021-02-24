<template>
  <q-page padding>
    <EnvEditor v-on:reload="loadEnvs" :currentEnvs="envVars" :appConfigVars="configVars" :parentLoading="loading"></EnvEditor>
  </q-page>
</template>

<script>
import EnvEditor from "../components/EnvEditor"
export default {
  
  data() {
    return {
      loading: false,
      envVars: [],
      configVars: []
    }
  },
  components: { EnvEditor },
  mounted() {
    this.loadEnvs()
  },
  methods: {
    async loadEnvs() {
      this.loading = true
      this.envVars = await this.$store.state.main.sdk.models.application.envVar.getAllByApplication(this.$route.params.id)
      this.configVars = await this.$store.state.main.sdk.models.application.configVar.getAllByApplication(this.$route.params.id)
      this.loading = false
    }
  }
}
</script>
