<template>
  <q-badge  class="dot" rounded :color="color" />
</template>

<style scoped>
.dot {
  height: 15px;
  width: 15px;
  border-radius: 50%;
  display: inline-block;
}
</style>

<script>
export default {
  props: {
    color: {
      type: String
    }
  }
}
</script>
