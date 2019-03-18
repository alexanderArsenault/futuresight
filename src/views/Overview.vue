<template>
  <div class="overview">
    <modumVuetable
      :fields="columns"
      :data="data"
      @vuetable:row-clicked="rowClicked($event)"
    ></modumVuetable>
  </div>
</template>
<script>
import modumVuetable from "../components/modumVuetable";
import Orders from "../data/orders.json";
import { EventBus } from "../Eventbus.js";
import { store } from "../dataStore.js";
import moment from "moment";
export default {
  name: "Overview",
  components: {
    modumVuetable
  },
  watch: {
    order_number: function(value) {
      if (value !== null) {
        this.$emit("can-continue", { value: true });
      }
    }
  },
  data() {
    return {
      order_number: store.order_number,
      columns: [
        {
          name: "__checkbox",
          titleClass: "hide"
        },
        {
          name: "order_number",
          title: "Order Number"
        },
        {
          name: "destination",
          title: "Destination"
        },
        // {
        //   name: "item_number",
        //   title: "Number of Items"
        // },
        {
          name: "deliver_until",
          title: "Ship Before",
          callback: this.epochToDate
        },
        {
          name: "suggested_shipping_date",
          title: "Suggested Shipping Date",
          callback: this.epochToDate
        },
        {
          name: "suggest_packing",
          title: "Suggested Packaging",
          callback: this.packageNameConverter
        }
      ],
      data: Orders.slice(0, 10)
    };
  },
  mounted() {
    if (store.order_number !== null) {
      this.$emit("can-continue", { value: true });
    }
  },
  methods: {
    epochToDate(value) {
      return moment(value).format("DD-MM-YYYY");
    },
    packageNameConverter(value) {
      switch (value) {
        case "thermo-o-cool":
          return "Thermal Packaging";
        case "standard":
          return "Standard Packaging";
        default:
          return "Thermal Guaranteed";
      }
    },
    rowClicked(event) {
      this.$emit("can-continue", { value: true });
      EventBus.$emit("item-selected", event);
    }
  }
};
</script>
<style lang="scss">
.hide {
  & > * {
    display: none;
  }
}
.left-aligned {
  text-align: left;
}

.overview {
  padding: 40px;
}
</style>
