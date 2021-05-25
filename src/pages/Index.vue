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
    <q-item
      clickable
      @click="newApp.showPopup = true"
    >
      <q-item-section>
        <q-card class="big" bordered>
          <q-card-section>
            <span class="material-icons" style="font-size: 48px">
              add_circle_outline
            </span>
          </q-card-section>
        </q-card>
      </q-item-section>
    </q-item>

    <q-dialog v-model="newApp.showPopup" @hide="clearPopupText()">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Creation of new application</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="newApp.name" :label="$t('app name')" dense autofocus />
        </q-card-section>

        <q-card-section>
          <q-input dense />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup @click="clearPopupText()" />
          <q-btn flat label="Create" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
import Application from 'components/Application.vue'
export default {
  name: 'PageIndex',
  components: { Application },

  data() {
    return {
      apps: [],
      newApp: {
        name: "",
        showPopup: false
      }
    }
  },
  mounted() {
    this.loadApplications()
  },
  methods: {
    async loadApplications() {
      this.apps = await this.$store.state.main.sdk.models.application.getAllWithDeviceServiceDetails()
    },
    clearPopupText: function() { // @cancel -> function(value, initialValue)
      this.newApp.name = ""
    }
  }
}
</script>
