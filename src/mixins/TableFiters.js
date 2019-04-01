import RiskData from "../data/total_exposure_per_order.json";
import moment from "moment";

export const TableFilters = {
	methods: {
		suggestionToRiskData(orderobject) {
			let order = RiskData.filter(riskDataEntry => {
				return (
					riskDataEntry.order_number === orderobject.order_number &&
					riskDataEntry.kind === orderobject.suggestion.kind &&
					riskDataEntry.dates === orderobject.suggestion.dates
				);
			});
			return order;
		},
		toggleDetailRow(data) {
			this.$refs.vuetable.toggleDetailRow(data.order_number);
		},
		epochToDate(value) {
			return moment(value).format("DD-MM-YYYY");
		},
		epochToName(value) {
			return moment(value).format("MMM DD");
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
		pricify(value) {
			return value.toFixed(2) + " CHF";
		},
		hourify(value) {
			return value + " hr";
		}
	}
};
