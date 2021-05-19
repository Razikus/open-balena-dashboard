<template>
  <q-item
    clickable
    @click="showDetails"
  >
    <q-item-section>
      <q-card class="big" bordered>
        <q-card-section>
          <div class="text-overline text-orange-9 text-center">{{ device_type }}</div>
          <div class="text-h5 q-mt-sm q-mb-xs text-center">{{app_name}}</div>
          <div class="row">
            <div class="col-12 text-center">
              <div class="text-h3 q-mt-sm q-mb-xs">{{online_devices}}/{{ owns__device.length }}</div>
            </div>
            <div class="col-12 text-center">
              <div class="text-caption text-grey">
                DEVICES
              </div>
            </div>
          </div>
          <div class="row text-center">
            <div class="col-6">
              <div class="text-caption text-grey">ARCH</div>
              <div class="text-caption">{{ arch }}</div>
            </div>
            <div class="col-6">
              <div class="text-caption text-grey">ID</div>
              <div class="text-caption">{{ id }}</div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'Application',
  props: {
    id: {
      type: Number,
      required: true
    },
    uuid: {
      type: String,
      required: true
    },
    app_name: {
      type: String,
      required: true
    },
    created_at: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    },

    owns__device: {
      type: Array,
      required: false
    }
  },
  data() {
    return {
      device_type: {}, arch: '', image: ''
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    showDetails() {
      this.$router.push({ name: "application", params: { id: this.slug } })
    },
    fetchData() {
      this.$store.state.main.sdk.models.device.getManifestByApplication(this.slug).then(res => {
        this.device_type = res.slug
        this.arch = res.arch
      })
    }
  },
  computed: {
    online_devices() {
      let count = 0
      for (const device of this.owns__device) {
        if (device.is_online === true) {
          count++
        }
      }
      return count
    }
  }

}
</script>
