<template>
  <q-page class="flex content-start">
        <!-- component for rendering the balena applications cards -->
    <Application
      v-for="app in apps"
      :key="app.title"
      v-bind="app"
    />

    <AddAppButton/>
    <RemoveAppButton/>
  </q-page>
</template>

<script>
import Application from 'components/Application.vue'
import AddAppButton from 'components/AddAppButton.vue'
import RemoveAppButton from 'components/RemoveAppButton.vue'

export default {
  name: 'PageIndex',
  components: { Application, AddAppButton, RemoveAppButton },

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
