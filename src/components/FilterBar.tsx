import React from "react";
import { Filter, Property } from "../types";
import { getPropertyValidOperators } from "../utils/getValidOperators";

interface FilterBarProps {
  properties: Property[];
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
  onClear?: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  properties,
  filter,
  onFilterChange,
}) => {
  const selectedProperty = properties.find((p) => p.id === filter.propertyId);
  const validPropertyOperators = getPropertyValidOperators(selectedProperty);

  console.log(
    "selectedProperty",
    selectedProperty,
    filter,
    validPropertyOperators
  );

  const handlePropertyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const propertyId = Number(e.target.value);
    console.log("propertyId", propertyId);
    onFilterChange({
      propertyId,
      operatorId: null,
      value: "",
    });
  };

  return (
    <div className="flex gap-4">
      <select
        className="px-3 py-2 border rounded-lg"
        // 0 || "" evaluates to "" which doesnt work for Product name
        value={filter.propertyId !== null ? filter.propertyId : ""}
        onChange={handlePropertyChange}
      >
        <option value="">Select property</option>
        {properties.map((property) => (
          <option key={property.id} value={property.id}>
            {property.name}
          </option>
        ))}
      </select>
      <select
        className="px-3 py-2 border rounded-lg"
        value={filter.operatorId !== null ? filter.operatorId : ""}
        onChange={(e) => {
          console.log(e.target.value);
        }}
        disabled={!filter.propertyId}
      >
        <option value="">Select operator</option>
        {validPropertyOperators.map((operator) => (
          <option key={operator.id} value={operator.id}>
            {operator.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
