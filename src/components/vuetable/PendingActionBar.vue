<template>
  <th v-if="isHeader"></th>
  <td v-else>
    <font-awesome-icon
      class="icon icons-grid-cog"
      :icon="['fa', 'search']"
      title="View Details"
      @click="viewOrderDetails()"
    />
    <font-awesome-icon
      class="icon icons-grid-check"
      :icon="['fa', 'check']"
      title="Accept Suggestion"
      @click="acceptSuggestion()"
    />
  </td>
</template>

<script>
import VuetableFieldMixin from "vuetable-2/src/components/VuetableFieldMixin";

export default {
  mixins: [VuetableFieldMixin],
  name: "pending-action-bar",
  methods: {
    acceptSuggestion() {
      let payload = {
        type: "accept",
        data: this.rowData
      };
      this.$emit("vuetable:field-event", payload);
    },
    viewOrderDetails() {
      let payload = {
        type: "details",
        data: this.rowData
      };
      this.$emit("vuetable:field-event", payload);
    }
  }
};
</script>
<style lang="scss" scoped>
p {
  margin: 0;
}
.icons-grid-cog {
  margin-right: 20px;
}
.icon {
  cursor: pointer;
}
</style>
