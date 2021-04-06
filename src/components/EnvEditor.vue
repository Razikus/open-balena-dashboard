<template>
<div>
  <q-table
    grid
    :data="currentEnvs"
    :columns="columns"
    :loading="loading || parentLoading"
    :title="$t('EnvVars')"
  >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="Name" :props="props">
            {{ props.row.name }}
          </q-td>

          <q-td key="Value" :props="props">
            {{ props.row.value }}
            <q-popup-edit v-model="props.row.value" @save="updateEnv(props)">
              <q-input v-model="props.row.value" dense autofocus counter />
            </q-popup-edit>

            </q-td>
          <q-td key="Action" :props="props">
            <q-btn @click="deleteEnv(props)">Delete</q-btn>

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
    :data="appConfigVars"
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
              <q-input v-model="props.row.value" dense autofocus counter />
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
  </div>
</template>

<script>
export default {
  name: 'EnvEditor',
  data () {
    return {
      loading: false,
      columns: [
        { name: "Name", label: this.$t("name"), field: "name", align: "left" },
        { name: "Value", label: this.$t("value"), field: "value", align: "left" },
        { name: "Action", label: this.$t("actions"), field: "value", align: "left" }
      ],
      newConfig: { name: "BALENA_", value: "" },
      newEnv: { name: "", value: "" }
    }
  },
  methods: {
    async saveConfig() {
      await this.$store.state.main.sdk.models.application.configVar.set(this.$route.params.id, this.newConfig.name, this.newConfig.value)
      this.reload()
    },
    async deleteConfig(props) {
      await this.$store.state.main.sdk.models.application.configVar.remove(this.$route.params.id, props.row.name)
      this.reload()
    },
    async updateConfig(props) {
      await this.$store.state.main.sdk.models.application.configVar.set(this.$route.params.id, props.row.name, props.row.value)
      this.reload()
    },
    async saveEnv() {
      await this.$store.state.main.sdk.models.application.envVar.set(this.$route.params.id, this.newEnv.name, this.newEnv.value)
      this.reload()
    },
    async deleteEnv(props) {
      await this.$store.state.main.sdk.models.application.envVar.remove(this.$route.params.id, props.row.name)
      this.reload()
    },
    async updateEnv(props) {
      await this.$store.state.main.sdk.models.application.envVar.set(this.$route.params.id, props.row.name, props.row.value)
      this.reload()
    },
    async reload() {
      this.$emit("reload")
    }
  },
  props: {
    currentEnvs: {
      type: Array,
      required: true
    },
    appConfigVars: {
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
