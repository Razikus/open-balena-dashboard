<template>
  <div class="q-pa-md">
    <q-markup-table>
      <thead>
        <tr>
          <th class="text-left">ID</th>
          <th class="text-left">commit</th>
          <th class="text-left">created at</th>
          <th class="text-left">status</th>
          <th class="text-left">size</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="app in applicationList" :key="app.id">
          <td>{{app.id}}</td>
          <td>{{app.commit}}</td>
          <td>{{app.created_at}}</td>
          <td>{{app.status}}</td>
          <td>{{app.size}}</td>
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

      const appIDs = this.applicationList.map(elem => {
        return elem.id
      })

// trying to pull image size from the registry
      await appIDs.forEach(async (elem, index) => {
        const temp = await this.$store.state.main.sdk.models.image.get(elem)

        if (temp === undefined) {
          this.applicationList[index].size = null
        } else {
          this.applicationList[index].size = temp.image_size
        }
      })
    }
  }
}

</script>
