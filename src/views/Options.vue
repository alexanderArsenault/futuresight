<template>
  <div class="options">
    <h2>Shipment Items</h2>
    <modumVuetable
      :fields="columns"
      :data="filterData"
      class="no-hover"
    ></modumVuetable>
  </div>
</template>

<script>
import modumVuetable from "../components/modumVuetable";
import Options from "../data/order_items.json";
import { store } from "../dataStore.js";
export default {
  name: "Options",
  components: {
    modumVuetable
  },
  data() {
    return {
      columns: [
        {
          name: "name",
          title: "Item",
          dataClass: "aligned right",
          titleClass: "aligned right"
        },
        {
          name: "price",
          title: "Price",
          callback: this.pricify
        },
        {
          name: "temperature_band",
          title: "Temperature Band"
        },
        {
          name: "allowed_time_outside",
          title: "Time allowed out of band",
          callback: this.hourify
        }
      ],
      data: Options
    };
  },
  computed: {
    filterData() {
      return Options.filter(x => x.order_number === store.order_number);
    }
  },
  methods: {
    pricify(value) {
      return value.toFixed(2) + " Fr";
    },
    hourify(value) {
      return value + " hr";
    }
  },
  mounted() {
    var header = document.getElementsByTagName("nav")[0];
    header.scrollIntoView({ behavior: "smooth" });
    this.$emit("can-continue", { value: true });
  }
};
</script>
<style lang="scss">
.options {
  padding: 40px;
}
.shipping-parent {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
}
</style>
