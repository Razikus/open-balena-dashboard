<template>
<div>
  <h6 style="margin-top: 20px; margin-bottom: 20px;">The devices settings override the application ones</h6>
  <p>Warning broken SDK</p>

  <q-table
    :data="deviceConfigVars"
    :columns="columns"
    :loading="loading || parentLoading"
    :title="$t('ConfigVars')"
  >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="Name" :props="props">
            {{ props.row.name }}
          </q-td>

          <q-td key="Value" :props="props">
            {{ props.row.value }}
            <q-popup-edit v-model="props.row.value" @save="updateConfig(props)">
              <q-input v-model="props.row.value" dense counter/>
            </q-popup-edit>

            </q-td>
          <q-td key="Action" :props="props">
            <q-btn @click="deleteConfig(props)">Delete</q-btn>

          </q-td>
        </q-tr>
      </template>

      <template v-slot:bottom-row>
        <q-tr>
          <q-td>
            <q-input filled v-model="newConfig.name" :label="$t('name')" />
          </q-td>

          <q-td key="Value">
            <q-input filled v-model="newConfig.value" :label="$t('value')" />
          </q-td>
          <q-td key="Action">
            <q-btn @click="saveConfig">Save</q-btn>
          </q-td>
        </q-tr>
      </template>

  </q-table>

  <q-table
    :data="deviceEnvVars"
    :columns="columns"
    :loading="loading || parentLoading"
    :title="$t('DeviceEnvVars')"
  >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="Name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="Value" :props="props">
            {{ props.row.value }}
            <q-popup-edit v-model="props.row.value" @save="updateEnv(props)">
              <q-input v-model="props.row.value" dense counter />
            </q-popup-edit>
            </q-td>
          <q-td key="Action" :props="props">
            <q-btn @click="deleteEnv(props)">{{$t("delete")}}</q-btn>

          </q-td>
        </q-tr>
      </template>

      <template v-slot:bottom-row>
        <q-tr>
          <q-td>
            <q-input filled v-model="newEnv.name" :label="$t('name')" />
          </q-td>

          <q-td key="Value">
            <q-input filled v-model="newEnv.value" :label="$t('value')" />
          </q-td>
          <q-td key="Action">
            <q-btn @click="saveEnv">Save</q-btn>
          </q-td>
        </q-tr>
      </template>

  </q-table>

  <q-table
    :data="deviceServiceVars"
    :columns="columns"
    :loading="loading || parentLoading"
    :title="$t('ServiceEnvVars')"
  >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="Name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="Value" :props="props">
            {{ props.row.value }}
            <q-popup-edit v-model="props.row.value" @save="updateService(props)">
              <q-input v-model="props.row.value" dense counter />
            </q-popup-edit>
            </q-td>
          <q-td key="Action" :props="props">
            <q-btn @click="deleteService(props)">{{$t("delete")}}</q-btn>

          </q-td>
        </q-tr>
      </template>

      <template v-slot:bottom-row>
        <q-tr>
          <q-td>
            <q-input filled v-model="newService.name" :label="$t('name')" />
          </q-td>

          <q-td key="Value">
            <q-input filled v-model="newService.value" :label="$t('value')" />
          </q-td>
          <q-td key="Action">
            <q-btn @click="saveService">Save</q-btn>
          </q-td>
        </q-tr>
      </template>

  </q-table>

  </div>
</template>

<script>

export default {
  name: 'DeviceEnvEditor',
  data () {
    return {
      loading: false,
      columns: [
        { name: "Name", label: this.$t("name"), field: "name", align: "left" },
        { name: "Value", label: this.$t("value"), field: "value", align: "left" },
        { name: "Action", label: this.$t("actions"), field: "value", align: "left" }
      ],
      newConfig: { name: "BALENA_", value: "" },
      newEnv: { name: "", value: "" },
      newService: { name: "", value: "" }
    }
  },
  methods: {
    async saveConfig() {
      await this.$store.state.main.sdk.models.device.configVar.set(this.$route.params.deviceid, this.newConfig.name, this.newConfig.value)
      this.newConfig = { name: "BALENA_", value: "" } // clear input form
      this.reload()
    },
    async deleteConfig(props) {
      await this.$store.state.main.sdk.models.device.configVar.remove(this.$route.params.deviceid, props.row.name)
      this.reload()
    },
    async updateConfig(props) {
      await this.$store.state.main.sdk.models.device.configVar.set(this.$route.params.deviceid, props.row.name, props.row.value)
      this.reload()
    },

    async saveEnv() {
      await this.$store.state.main.sdk.models.device.envVar.set(this.$route.params.deviceid, this.newEnv.name, this.newEnv.value)
      this.newEnv = { name: "", value: "" } // clear input form
      this.reload()
    },
    async deleteEnv(props) {
      await this.$store.state.main.sdk.models.device.envVar.remove(this.$route.params.deviceid, props.row.name)
      this.reload()
    },
    async updateEnv(props) {
      await this.$store.state.main.sdk.models.device.envVar.set(this.$route.params.deviceid, props.row.name, props.row.value)
      this.reload()
    },

    async saveService() {
      await this.$store.state.main.sdk.models.device.serviceVar.set(this.$route.params.deviceid, this.newEnv.name, this.newEnv.value)
      this.newService = { name: "", value: "" } // clear input form
      this.reload()
    },
    async deleteService(props) {
      await this.$store.state.main.sdk.models.device.serviceVar.remove(this.$route.params.deviceid, props.row.name)
      this.reload()
    },
    async updateService(props) {
      await this.$store.state.main.sdk.models.device.serviceVar.set(this.$route.params.deviceid, props.row.name, props.row.value)
      this.reload()
    },

    async reload() {
      this.$emit("reload")
    }
  },
  props: {
    deviceConfigVars: {
      type: Array,
      required: true
    },
    deviceEnvVars: {
      type: Array,
      required: true
    },
    deviceServiceVars: {
      type: Array,
      required: true
    },
    parentLoading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
