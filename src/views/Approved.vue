<template>
  <div class="content">
    <vuetable
      ref="vuetable"
      track-by="order_number"
      :api-mode="false"
      :fields="columns"
      :data="approvedOrders"
      @vuetable:row-clicked="processRowClick($event)"
      detail-row-component="pending-detail-row"
    >
    </vuetable>
  </div>
</template>
<script>
import Vue from "vue";
import vuetable from "vuetable-2/src/components/Vuetable";
import Orders from "../data/orders.json";
import { TableFilters } from "../mixins/TableFiters";
import PendingDetailRow from "../components/vuetable/PendingDetailRow";

Vue.component("pending-detail-row", PendingDetailRow);

export default {
  name: "pendingOrders",
  components: {
    vuetable
  },
  mixins: [TableFilters],
  data() {
    return {
      active_row: null,
      Orders,
      columns: [
        {
          name: "order_number",
          title: "Order Number"
        },
        {
          name: "destination",
          title: "Destination"
        },
        {
          name: "deliver_until",
          title: "Ship By Date",
          callback: this.epochToDate
        },
        {
          name: "suggestion.dates",
          title: "Suggested Date",
          callback: this.epochToDate
        },
        {
          name: "suggestion.kind",
          title: "Suggested Packaging",
          callback: this.packageNameConverter
        }
      ]
    };
  },
  computed: {
    approvedOrders() {
      return this.Orders.filter(x => x.state === 1);
    }
  },
  methods: {
    processRowClick(event) {
      if (this.active_row !== null) {
        this.$refs.vuetable.hideDetailRow(this.active_row);
      }
      this.toggleDetailRow(event);
      this.active_row = event;
    }
  }
};
</script>

<style lang="scss">
@import "../styles/_tables.scss";
</style>
