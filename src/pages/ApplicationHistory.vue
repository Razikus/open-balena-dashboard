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

      <tbody v-if=" loading=== false">
        <tr v-for="image in imageList" :key="image.id" >
          <td>{{image.id}}</td>
          <td>{{image.commit}}</td>
          <td>{{image.created_at}}</td>
          <td>{{image.status}}</td>
          <td>{{image.size}} MB</td>
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
      imageList: {},
      slug: '',
      loading: true
    }
  },

  mounted() {
    this.slug = this.$route.params.id

    this.fetchData()
  },

  methods: {
    async fetchData() {
      this.loading = true
      this.imageList = await this.$store.state.main.sdk.models.release.getAllByApplication(this.slug)

      const appIDs = this.imageList.map(elem => {
        return elem.id
      })

// trying to pull image size from the registry

      const details = await Promise.all(
        appIDs.map(async (elem) => {
          return await this.$store.state.main.sdk.models.image.get(elem)
        })
      )

      for (let i = 0; i < details.length; i++) {
        this.imageList[i].size = Math.trunc(details[i].image_size / (1000000)) // 1M
      }
      console.log(this.imageList)

      this.loading = false
    }
  }
}

</script>
