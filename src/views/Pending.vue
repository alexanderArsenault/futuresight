<template>
  <div class="content">
    <vuetable
      ref="vuetable"
      track-by="order_number"
      :api-mode="false"
      :fields="columns"
      :data="pendingOrders"
      @vuetable:field-event="processIconClick($event)"
      :detail-row-component="detailRow"
      @close="toggleDetailRow($event.order_number)"
      @accept="updateState($event)"
    ></vuetable>
  </div>
</template>
<script>
import moment from "moment";
import vuetable from "vuetable-2/src/components/Vuetable";
import { TableFilters } from "../mixins/TableFiters";
import Orders from "../data/orders.json";
import RiskData from "../data/total_exposure_per_order.json";
import PendingActionBar from "../components/vuetable/PendingActionBar.vue";
import PendingDetailRow from "../components/vuetable/PendingDetailRow";

export default {
  name: "pendingOrders",
  mixins: [TableFilters],
  components: {
    vuetable
  },
  data() {
    return {
      active_row: null,
      Orders,
      detailRow: PendingDetailRow,
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
          formatter(value) {
            return moment(value).format("DD-MM-YYYY");
          }
        },
        {
          name: "suggestion.dates",
          title: "Suggested Date",
          formatter(value) {
            return moment(value).format("DD-MM-YYYY");
          }
        },
        {
          name: "suggestion.kind",
          title: "Suggested Packaging",
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
          name: PendingActionBar,
          title: "action"
        }
      ]
    };
  },
  computed: {
    pendingOrders() {
      return this.Orders.filter(x => x.state === 0);
    }
  },
  methods: {
    processIconClick(event) {
      if (event.type === "details") {
        this.toggleDetailRow(event.data.order_number);
      } else if (event.type === "accept") {
        this.acceptFromIcon(event.data);
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
    // suggestion format and render format are different, looking for suggestion in risk data
    acceptFromIcon(orderobject) {
      if (orderobject.suggestion.kind === "thermo-cool-ultra") {
        let order = this.findDateGenerateGuaranteedRiskData(orderobject);
        this.updateState(...order);
        return;
      }
      let order = this.suggestionToRiskData(orderobject);
      console.log(order);
      this.updateState(...order);
    },
    // set order to active, expects the order combination format from total_eposure_per_order
    updateState(selectedorder) {
      for (var i = 0; i < this.Orders.length; i++) {
        if (this.Orders[i].order_number === selectedorder.order_number) {
          this.Orders[i].selected_order = selectedorder;
          this.Orders[i].state = 1;
        }
      }
    },
    findDateGenerateGuaranteedRiskData(orderobject) {
      console.log(orderobject);
      let correctObject = RiskData.filter(x => {
        return (
          x.order_number === orderobject.order_number &&
          x.dates === orderobject.suggestion.dates
        );
      });
      correctObject = JSON.parse(JSON.stringify(correctObject));
      return correctObject.map(x => {
        x.kind = "thermo-cool-ultra";
        x.risk = 25.0;
        x.loss = 0.0;
        x.ok = x.ok + x.not_ok;
        x.not_ok = 0;
        return x;
      });
    }
  }
};
</script>

<style lang="scss">
@import "../styles/_tables.scss";
</style>
