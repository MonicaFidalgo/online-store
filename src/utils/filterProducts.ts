import datastore from "../mocks/datastore";
import { Filter, OperatorId, Product } from "../types";

export const filterProducts = (
  products: Product[],
  filter: Filter
): Product[] => {
  if (filter.propertyId == null || filter.operatorId == null) {
    return products;
  }

  const property = datastore.properties.find((p) => p.id === filter.propertyId);

  if (!property) return products;

  return products.filter((product) => {
    const propertyValue = product.property_values.find(
      (pv) => pv.property_id === filter.propertyId
    );

    if (!propertyValue) {
      return filter.operatorId === OperatorId.None;
    }

    const value = propertyValue.value;

    switch (filter.operatorId) {
      case OperatorId.Equals:
        return property.type === "string"
          ? value.toString().toLowerCase() ===
              filter.value.toString().toLowerCase()
          : value.toString() === filter.value.toString();

      case OperatorId.GreaterThan:
        return (
          property.type === "number" && Number(value) > Number(filter.value)
        );

      case OperatorId.LessThan:
        return (
          property.type === "number" && Number(value) < Number(filter.value)
        );

      case OperatorId.Any:
        return true;

      case OperatorId.None:
        return false;

      case OperatorId.In:
        return (
          Array.isArray(filter.value) && filter.value.includes(value.toString())
        );

      case OperatorId.Contains:
        return (
          property.type === "string" &&
          value
            .toString()
            .toLowerCase()
            .includes(filter.value.toString().toLowerCase())
        );

      default:
        return true;
    }
  });
};
