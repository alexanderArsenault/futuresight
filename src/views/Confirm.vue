<template>
  <div class="overview">
    <div class="overview-header">
      <p>Potential Savings: {{ totalSavings }}</p>
      <p>Calculated with risk minus cost of temperature guaranteed packaging</p>
    </div>
    <modumVuetable
      :fields="columns"
      :data="data"
      @vuetable:row-clicked="rowClicked($event)"
    ></modumVuetable>
  </div>
</template>
<script>
import modumVuetable from "../components/vuetable/modumVuetable";
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
          name: "suggested_shipping_date",
          title: "Shipping",
          callback: this.epochToDate
        },
        {
          name: "suggest_packing",
          title: "Packaging",
          callback: this.packageNameConverter
        },
        {
          name: "potential_savings",
          title: "Potential Savings",
          callback: this.pricify
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
  computed: {
    totalSavings() {
      let totalSavings = 0;
      console.log(this.data);
      for (var order in this.data) {
        console.log(this.data[order].potential_savings);
        totalSavings = totalSavings + this.data[order].potential_savings;
      }
      return this.pricify(totalSavings);
    }
  },
  methods: {
    pricify(value) {
      if (value === 0) {
        return "-";
      }
      return value.toFixed(2) + " Fr";
    },
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
  p {
    font-weight: 500;
  }
}
.overview-header {
  margin-bottom: 40px;
}
</style>
