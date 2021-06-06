<template>
  <q-page padding>
    <q-table
      :loading="loading"
      :title="$t('Devices')"
      :data="devices"
      :columns="columns"
      row-key="device_name"
      separator="cell"
      :pagination.sync="pagination"
      :filter="filter"
    >
      <template v-slot:body-cell-is_online="props">
        <q-td :props="props">
          <Dot color="green" v-if="props.row.is_online"></Dot>
          <Dot color="red" v-else></Dot>
          /
          <Dot color="green" v-if="props.row.is_connected_to_vpn"></Dot>
          <Dot color="red" v-else></Dot>
        </q-td>
      </template>

      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge :color="determineStatusColor(props.row.overall_status)">{{ props.row.overall_status }}</q-badge>
          {{ !props.row.overall_progress ? "" : props.row.overall_progress}}
        </q-td>
      </template>

      <template v-slot:body-cell-edit="props">
        <q-td :props="props">
          <q-btn icon-right="tune"  color="info" :to="`/devices/${props.row.uuid}/summary`">
          </q-btn>
        </q-td>
      </template>

      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

    </q-table>
  </q-page>
</template>
<script>
import Dot from "../components/Dot"

export default {
  components: { Dot },
  data() {
    return {
      devices: [],
      filter: '',
      loading: false,
      maximizedToggle: true,
      pagination: {
        rowsPerPage: 20
      },
      columns: [
        {
          name: "uuid",
          label: this.$t("uuid"),
          align: "left",
          field: (row) => row.uuid,
          format: (val) => `${val.substring(0, 8)}`,
          sortable: true
        },
        {
          name: "device_name",
          label: this.$t("name"),
          align: "left",
          field: (row) => row.device_name,
          format: (val) => `${val}`,
          sortable: true
        },
        {
          name: "is_online",
          label: this.$t("online"),
          align: "center",
          field: (row) => [row.is_online, row.is_connected_to_vpn],
          format: (val) => `${val}`,
          sortable: true
        },
        {
          name: "ip_address",
          label: this.$t("ip"),
          align: "left",
          field: (row) => row.ip_address,
          format: (val) => `${val.split(" ").join(" / ")}`,
          sortable: true
        },
        {
          name: "status",
          label: this.$t("overall"),
          align: "center",
          field: (row) =>
            row.overall_status +
            " " +
            (row.overall_progress == null ? "" : row.overall_progress),
          format: (val) => `${val}`,
          sortable: true
        },
        {
          name: "last_connectivity_event",
          label: this.$t("last_connectivity_event"),
          align: "left",
          field: (row) => row.last_connectivity_event,
          format: (val) => `${new Date(val).toLocaleString()}`,
          sortable: true
        },
        {
          name: "edit",
          label: "",
          align: "center",
          field: (row) => row.uuid,
          format: (val) => `${val.substring(0, 8)}`,
          sortable: true
        }
      ]
    }
  },
  mounted() {
    this.loadApplicationDetails()
    setInterval(this.loadApplicationDetails, 5000)
    this.$store.commit("main/selectApplication", this.$route.params.id)
  },
  methods: {
    async loadApplicationDetails() {
      this.devices = await this.$store.state.main.sdk.models.device.getAllByApplication(
        this.$route.params.id
      )
    },
    determineStatusColor (status) {
      switch (status.toLowerCase()) {
        case "idle": {
          return "green"
        }
        case "offline": {
          return "red"
        }
        case "updating": {
          return "orange"
        }
      }
    }
  }
}
</script>
