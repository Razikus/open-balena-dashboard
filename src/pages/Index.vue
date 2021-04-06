<template>
  <q-page class="flex content-start">
        <Application
          v-for="app in apps"
          :key="app.title"
          v-bind="app"
        />
  </q-page>
</template>

<script>
import Application from 'components/Application.vue'
export default {
  name: 'PageIndex',
  components: { Application },

  data() {
    return {
      apps: []
    }
  },
  mounted() {
    this.loadApplications()
  },
  methods: {
    async loadApplications() {
      this.apps = await this.$store.state.main.sdk.models.application.getAllWithDeviceServiceDetails()
    }
  }
}
</script>
