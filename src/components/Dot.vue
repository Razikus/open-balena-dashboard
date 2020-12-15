<template>
  <span class="dot" :style="'background-color: ' + color"></span>
</template>

<style scoped>
.dot {
  height: 25px;
  width: 25px;
  background-color: green;
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
