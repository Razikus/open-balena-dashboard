<template>
  <div style ="align-self: center">
    <q-item clickable @click="selectedApp.showPopup = true">
      <q-item-section>
        <q-card class="big" bordered>
          <q-card-section>
            <span class="material-icons" style="font-size: 48px">
              remove_circle_outline
            </span>
          </q-card-section>
        </q-card>
      </q-item-section>
    </q-item>

    <q-dialog v-model="selectedApp.showPopup" @hide="clearPopupText()">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Select the application to remove</div>
        </q-card-section>

        <q-card-section>
            <q-select
              filled
              v-model="selectedApp.slug"
              use-input
              input-debounce="0"
              label="Apps"
              :options="options"
              @filter="filterFn"
              behavior="menu"
              style="font-size: large;"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
          <q-btn flat label="Remove" color="primary" v-close-popup @click="removeApp"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>

  export default {
    name: 'RemoveAppButton',
    data() {
      return {
        selectedApp: {
          slug: "",
          showPopup: false
        },
        appList: [],
        options: [] // filtered options of the select menu
      }
    },

    async mounted() {
      const apps = await this.$store.state.main.sdk.models.application.getAll()

      this.appList = apps.map(element => element.slug)
      this.options = this.appList
    },

    methods: {
      clearPopupText: function() { // @cancel -> function(value, initialValue)
        this.selectedApp.name = ""
      },

      async removeApp() {
        await this.$store.state.main.sdk.models.application.remove(this.selectedApp.slug)
        this.clearPopupText()
      },

      filterFn (val, update) {
        if (val === '') {
          update(() => {
            this.options = this.appList
          })
          return
        }

        update(() => {
          const needle = val.toLowerCase()
          this.options = this.appList.filter(v => v.toLowerCase().indexOf(needle) > -1)
        })
      }

    } // end methods
  }
</script>
