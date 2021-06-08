<template>
  <div class="q-pa-md">
    <q-markup-table>
      <thead>
        <tr>
          <th class="text-left">ID</th>
          <th class="text-left">commit</th>
          <th class="text-left">created at</th>
          <th class="text-left">status</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="app in applicationList" :key="app.id">
          <td>{{app.id}}</td>
          <td>{{app.commit}}</td>
          <td>{{app.created_at}}</td>
          <td>{{app.status}}</td>
        </tr>
      </tbody>
    </q-markup-table>

  </div>
</template>

<script>

export default {
  name: "ApplicationHistory",

  data() {
    return {
      applicationList: {},
      slug: ''
    }
  },

  mounted() {
    this.slug = this.$route.params.id
    this.fetchData()
  },

  methods: {
    async fetchData() {
      this.applicationList = await this.$store.state.main.sdk.models.release.getAllByApplication(this.slug)
    }
  }
}

</script>
