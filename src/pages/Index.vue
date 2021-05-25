<template>
  <q-page class="flex content-start">
        <!-- component for rendering the balena applications cards -->
    <Application
      v-for="app in apps"
      :key="app.title"
      v-bind="app"
    />

<!--    button for adding balena applications
        <q-item
          clickable

        >
          <q-item-section>
            <q-card class="big" bordered>
              <q-card-section>
                <span class="material-icons" style="font-size: 48px">
                  add_circle_outline
                  <q-popup-edit
                    v-model="newApp.name"
                    :title="$t('new application name')"
                    buttons label-set label-cancel
                    @cancel="clearPopupText()"
                  >
                    <q-input v-model="newApp.name" dense autofocus counter/>
                  </q-popup-edit>
                </span>
              </q-card-section>
            </q-card>
          </q-item-section>
        </q-item>
-->
    <AddAppButton/>
  </q-page>
</template>

<script>
import Application from 'components/Application.vue'
import AddAppButton from 'components/AddAppButton.vue'

export default {
  name: 'PageIndex',
  components: { Application, AddAppButton },

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
