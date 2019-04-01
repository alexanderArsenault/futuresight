<template>
  <div class="detail-row">
    <div class="approved-selection-cover" v-if="modaldisplay">
      <div class="approved-selection-popup" v-if="selected_option">
        <div class="approved-popup-information">
          <h4>Selected Option</h4>
          <span>Shipping Date: {{ epochToName(selected_option.dates)}}</span>
          <span>Total Value: {{ pricify(rowData.total_amount) }}</span>
          <span>
            Complaint Items: {{ selected_option.ok }} /
            {{ selected_option.ok + selected_option.not_ok }}
          </span>
          <span>Non Compliant Value: {{ pricify(selected_option.loss) }}</span>
          <span>Prediction Confidence: 99%</span>
          <span>Packaging Cost: {{ packageCost }}</span>
          <span>Total Risk: {{ pricify(selected_option.risk) }}</span>
        </div>
        <div @click="modaldisplay = false" class="package-risk-button">Edit Shipment</div>
      </div>
    </div>
    <transition>
      <PendingChartView
        v-if="!showdatepicker"
        :selected_option="selected_option"
        @hidecharts="showdatepicker = true"
      ></PendingChartView>
      <div v-if="showdatepicker" class="detail-row-datepicker">
        <h3>Package Risk Selector</h3>
        <div class="package-risk-matrix">
          <!-- top -->
          <div class="top">
            <div
              class="package-date-dates"
              v-for="(date, index) in StandardRisk"
              :key="'label' + index"
            >{{ epochToName(date.dates) }}</div>
          </div>
          <!-- Left -->
          <div class="left">
            <PackagingLabel>Standard Packing</PackagingLabel>
            <PackagingLabel>Thermal Packing</PackagingLabel>
            <PackagingLabel>Insured Packing</PackagingLabel>
          </div>
          <!-- Middle -->
          <div class="main">
            <TableCell
              @click.native="setActive(date)"
              :class="[{ 'active-cell': findActiveOrder(date) }, 'table-cell']"
              :selectedRisk="selected_option.risk"
              v-for="(date, index) in RiskMatrix"
              :shippingInstance="date"
              :key="date.kind + '_' + index"
            ></TableCell>
          </div>
          <!-- Right -->
          <div class="right">
            <div class="right-icons">
              <font-awesome-icon
                :icon="['fa', 'chart-bar']"
                title="View Data"
                @click="showdatepicker = false"
              />
              <font-awesome-icon :icon="['fa', 'info-circle']" title="Calculations"/>
            </div>
            <div class="right-information">
              <span>Total Value: {{ pricify(rowData.total_amount) }}</span>
              <span>
                Complaint Items: {{ selected_option.ok }} /
                {{ selected_option.ok + selected_option.not_ok }}
              </span>
              <span>Non Compliant Value: {{ pricify(selected_option.loss) }}</span>
              <span>Prediction Confidence: 99%</span>
              <span>Packaging Cost: {{ packageCost }}</span>
              <span>Total Risk: {{ pricify(selected_option.risk) }}</span>
            </div>
          </div>
          <!-- Rightest -->
          <div class="buttons">
            <div
              class="package-risk-button"
              @click="$parent.$emit('accept', rowData); modaldisplay = true"
            >Approve Shipment</div>
            <div
              class="package-risk-button"
              @click="setActive(rowData.suggestion)"
            >Reset to Suggestion</div>
            <div class="package-risk-button" @click="$parent.$emit('close', rowData)">Close Selector</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import RiskData from "../../data/total_exposure_per_order.json";
import { TableFilters } from "../../mixins/TableFiters";
import PendingChartView from "./PendingChartView";
// import ComplianceData from "../../data/compliant_items_per_order.json";
import TableCell from "./TableCell";
import PackagingLabel from "./PackagingLabel";

export default {
  name: "approved-detail-row",
  mixins: [TableFilters],
  components: {
    PendingChartView,
    TableCell,
    PackagingLabel
  },
  props: {
    rowData: {
      type: Object,
      required: true
    },
    rowIndex: {
      type: Number
    }
  },
  data() {
    return {
      modaldisplay: true,
      showdatepicker: true,
      active_order: this.rowData.order_number,
      selected_option: null
    };
  },
  created() {
    if (this.rowData.suggestion.kind === "thermo-cool-ultra") {
      let order = this.GuaranteedRisk.filter(x => {
        return x.dates === this.rowData.suggestion.dates;
      });
      this.setActive(...order);
      return;
    }
    if (this.rowData.selected_order === undefined) {
      let order = this.suggestionToRiskData(this.rowData);
      this.setActive(...order);
    } else {
      this.setActive(this.rowData.selected_order);
    }
  },
  methods: {
    setActive(shippingOption) {
      this.selected_option = shippingOption;
    },
    findActiveOrder(renderedOrder) {
      if (
        renderedOrder.dates === this.selected_option.dates &&
        renderedOrder.kind === this.selected_option.kind
      ) {
        this.selected_option = renderedOrder;
        return true;
      } else {
        return false;
      }
    }
  },
  computed: {
    packageCost() {
      switch (this.selected_option.kind) {
        case "standard":
          return "0.10 CHF";
        case "thermo-o-cool":
          return "4.00 CHF";
        default:
          return "25.00 CHF";
      }
    },
    RiskArray() {
      return RiskData.filter(x => x.order_number === this.active_order);
    },
    StandardRisk() {
      return this.RiskArray.filter(x => x.kind === "standard");
    },
    ThermalRisk() {
      return this.RiskArray.filter(x => x.kind === "thermo-o-cool");
    },
    GuaranteedRisk() {
      let array = this.StandardRisk;
      array = JSON.parse(JSON.stringify(array));
      return array.map(x => {
        x.kind = "thermo-cool-ultra";
        x.risk = 25.0;
        x.loss = 0.0;
        x.ok = x.ok + x.not_ok;
        x.not_ok = 0;
        return x;
      });
    },
    RiskMatrix() {
      return [
        ...this.StandardRisk,
        ...this.ThermalRisk,
        ...this.GuaranteedRisk
      ];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/_variables.scss";

.package-risk-matrix {
  display: grid;
  grid-gap: 5px;
  grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr 1fr 2fr 2fr;
  grid-template-rows: 1fr 2fr 2fr 2fr;
  grid-template-areas: ". top top top top top right ." "left main main main main main right buttons" "left main main main main main right buttons" "left main main main main main right buttons";
}

.top {
  grid-area: top;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.main {
  grid-area: main;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(5, 1fr);
}

.left {
  grid-area: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.right {
  grid-area: right;
  display: grid;
  grid-template-rows: 1fr 6fr;
  grid-gap: 3px;
  &-icons {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    svg {
      margin-right: 10px;
      cursor: pointer;
    }
  }
  &-information {
    border-radius: 5px;
    border: 1px solid whitesmoke;
    padding: 20px;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}

.buttons {
  grid-area: buttons;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr;
  grid-gap: 5px;
}

.package-risk-button {
  border-radius: 5px;
  border: 1px solid whitesmoke;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  cursor: pointer;
}

.table-cell {
  cursor: pointer;
}

.detail-row {
  position: relative;
  h3 {
    text-align: center;
    margin-bottom: 30px;
    width: 70%;
  }
}

.tablecell.active-cell {
  border: 1px solid $standard;
  box-shadow: 1px 1px 2px rgba(71, 183, 132, 0.3);
}
// Transition
.slide-leave-active,
.slide-enter-active {
  transition: 1s;
}
.slide-enter {
  transform: translate(100%, 0);
}
.slide-leave-to {
  transform: translate(-100%, 0);
}

.approved-selection-cover {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(50, 50, 50, 0.7);
}

.approved-selection-popup {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  .package-risk-button {
    padding: 10px;
  }
}

.approved-popup-information {
  width: auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 10px;
  span {
    display: block;
    padding-bottom: 5px;
  }
  h4 {
    margin-top: 0;
  }
}
</style>
