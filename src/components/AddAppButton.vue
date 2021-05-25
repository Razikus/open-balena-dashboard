<template>
  <div style ="align-self: center">
    <q-item clickable @click="newApp.showPopup = true">
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
          <q-btn flat label="Close" color="primary" v-close-popup />
          <q-btn flat label="Create" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
  export default {
    name: 'AddAppButton',
    data() {
      return {
        newApp: {
          name: "",
          showPopup: false
        }
      }
    },
    clearPopupText: function() { // @cancel -> function(value, initialValue)
      this.newApp.name = ""
      this.$store.state.main.sdk.models.deviceType.getAllSupported().then(function(deviceTypes) {
        console.log(deviceTypes)
      })
    }
  }
</script>
