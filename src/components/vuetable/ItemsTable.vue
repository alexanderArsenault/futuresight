<template>
  <vuetable
    ref="vuetable"
    :fields="columns"
    :api-mode="false"
    :data="Items"
    id="order-items-table"
    track-by="order_number"
    detail-row-component="detail-row-component"
    @vuetable:row-clicked="bubbleUp($event)"
  ></vuetable>
</template>
<script>
import vuetable from "vuetable-2/src/components/Vuetable";
import OrderItems from "../../data/order_items.json";
import { TableFilters } from "../../mixins/TableFiters.js";

export default {
  components: {
    vuetable
  },
  mixins: [TableFilters],
  props: {
    activeOrder: {
      required: true
    }
  },
  data() {
    return {
      columns: [
        {
          name: "name",
          title: "Item",
          dataClass: "price-row"
        },
        {
          name: "price",
          title: "Price",
          dataClass: "price-row",
          callback: this.pricify
        },
        {
          name: "temperature_band",
          title: "Temperature Band"
        },
        {
          name: "allowed_time_outside",
          title: `Time allowed 
          out of band`,
          callback: this.hourify
        }
      ]
    };
  },
  computed: {
    Items() {
      return OrderItems.filter(x => x.order_number === this.activeOrder);
    }
  }
};
</script>

<style lang="scss">
@import "../../styles/_variables.scss";

#order-items-table {
  font-size: 12px;
  border: none;
  tr {
    border: none;
    cursor: default;
  }
  td {
    padding: 5px 20px;
  }
}

.price-row {
  white-space: nowrap;
}
</style>
