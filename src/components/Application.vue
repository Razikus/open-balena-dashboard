<template>
  <q-item
    clickable
    @click="showDetails"
  >

    <q-item-section>
      <q-item-label>{{ app_name }} ({{id}})</q-item-label>
      <q-item-label caption>
        {{ slug }}
      </q-item-label>
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
    slug: {
      type: String,
      required: true
    }
  },
  methods: {
    showDetails() {
      this.$router.push({ name: "application", params: { id: this.slug } })
    }
  }
}
</script>
