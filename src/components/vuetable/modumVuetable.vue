<template>
  <vuetable
    ref="vuetable"
    :fields="fields"
    :api-mode="false"
    :data="data"
    track-by="order_number"
    detail-row-component="detail-row-component"
    @vuetable:row-clicked="bubbleUp($event)"
  ></vuetable>
</template>
<script>
import vuetable from "vuetable-2/src/components/Vuetable";
import { store } from "../../dataStore.js";
export default {
  components: {
    vuetable
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    fields: {
      type: Array,
      required: true
    }
  },
  methods: {
    bubbleUp() {
      this.$refs.vuetable.toggleDetailRow(this.data.id);
    }
  },
  mounted() {
    if (store.order_number !== null) {
      this.$refs.vuetable.selectedTo.push(store.order_number);
    }
  }
};
</script>

<style lang="scss">
@import "../../styles/_variables.scss";
</style>
