<template>
  <vuetable
    ref="vuetable"
    :fields="fields"
    :api-mode="false"
    :data="data"
    track-by="order_number"
    @vuetable:row-clicked="bubbleUp($event)"
  ></vuetable>
</template>
<script>
import vuetable from "vuetable-2/src/components/Vuetable";
import { store } from "../dataStore.js";
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
    bubbleUp(event) {
      let selectedArray = this.$refs.vuetable.selectedTo;

      if (selectedArray.includes(event.order_number)) {
        this.$refs.vuetable.unselectId(event.order_number);
      } else {
        this.$refs.vuetable.selectedTo = [];
        this.$refs.vuetable.selectedTo.push(event.order_number);
      }

      this.$emit("vuetable:row-clicked", event);
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
@import "../styles/_variables.scss";

table {
  width: 100%;
  border: 1px solid whitesmoke;
  text-align: left;
  th {
    padding: 15px 20px;
  }
  td {
    margin-bottom: -1px;
    padding: 15px 20px;
  }
  tr {
    border-bottom: 1px solid whitesmoke;
  }
  tbody tr {
    border-bottom: 1px solid whitesmoke;
    &:hover {
      border: 1px solid $brand1;
      margin-top: -1px;
      margin-bottom: -1px;
      border-style: double;
    }
  }
  input[type="checkbox"] {
    border-radius: 0;
  }
}
.aligned.right {
  text-align: right;
}
.no-hover {
  tr:hover {
    border: none;
    border-bottom: 1px solid whitesmoke;
  }
}
</style>
