<template>
  <div class="approved-content">
    <vuetable
      ref="vuetable"
      track-by="order_number"
      :api-mode="false"
      :fields="columns"
      :data="approvedOrders"
      @vuetable:field-event="processIconClick($event)"
      :detail-row-component="detailRow"
      @close="toggleDetailRow($event.order_number)"
      @accept="updateState($event.order_number)"
    >
    </vuetable>
  </div>
</template>
<script>
import moment from "moment";
import vuetable from "vuetable-2/src/components/Vuetable";
import Orders from "../data/orders.json";
import { TableFilters } from "../mixins/TableFiters";
import ApprovedActionBar from "../components/vuetable/ApprovedActionBar.vue";
import ApprovedDetailRow from "../components/vuetable/ApprovedDetailRow";

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
      detailRow: ApprovedDetailRow,
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
          name: "suggestion.dates",
          title: "Selected Date",
          formatter(value) {
            return moment(value).format("DD-MM-YYYY");
          }
        },
        {
          name: "suggestion.kind",
          title: "Selected Packaging",
          formatter(value) {
            switch (value) {
              case "thermo-o-cool":
                return "Thermal Packaging";
              case "standard":
                return "Standard Packaging";
              default:
                return "Thermal Guaranteed";
            }
          }
        },
        {
          name: ApprovedActionBar,
          title: "action"
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
    processIconClick(event) {
      if (event.type === "details") {
        this.toggleDetailRow(event.data.order_number);
      } else if (event.type === "accept") {
        this.updateState(event.data.order_number);
      }
    },
    toggleDetailRow(ordernumber) {
      if (this.active_row === null) {
        this.$refs.vuetable.showDetailRow(ordernumber);
        this.active_row = ordernumber;
        return;
      }
      if (this.$refs.vuetable.isVisibleDetailRow(ordernumber)) {
        this.$refs.vuetable.hideDetailRow(ordernumber);
        return;
      } else {
        this.$refs.vuetable.hideDetailRow(this.active_row);
        this.$refs.vuetable.showDetailRow(ordernumber);
        this.active_row = ordernumber;
      }
    },
    updateState(ordernumber) {
      for (var i = 0; i < this.Orders.length; i++) {
        if (this.Orders[i].order_number === ordernumber) {
          this.Orders[i].state = 1;
        }
      }
    }
  }
};
</script>

<style lang="scss">
@import "../styles/_tables.scss";
</style>
