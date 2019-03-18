<template>
  <div class="details">
    <h1>This is an details page</h1>
  </div>
</template>
<script>
export default {
  mounted() {
    this.$emit("can-continue", { value: true });
  }
};
</script>
