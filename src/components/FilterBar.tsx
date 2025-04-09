import React from "react";
import { Filter, OperatorId, Property, PropertyType } from "../types";
import { getPropertyValidOperators } from "../utils/getValidOperators";

interface FilterBarProps {
  properties: Property[];
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
  onClear: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  properties,
  filter,
  onFilterChange,
  onClear,
}) => {
  const selectedProperty = properties.find((p) => p.id === filter.propertyId);
  const validPropertyOperators = getPropertyValidOperators(selectedProperty);

  const handlePropertyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const propertyId = Number(e.target.value);
    onFilterChange({
      propertyId,
      operatorId: null,
      value: "",
    });
  };

  const handleOperatorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filter,
      operatorId: e.target.value,
      value: "",
    });
  };

  const handleValueChange = (val: string | string[]) => {
    const parsedValue =
      selectedProperty?.type === PropertyType.Number ? Number(val) : val;
    onFilterChange({ ...filter, value: parsedValue });
  };

  const renderValueInput = () => {
    if (!selectedProperty || !filter.operatorId) return null;
    if (
      [OperatorId.Any, OperatorId.None].includes(
        filter.operatorId as OperatorId
      )
    )
      return null;

    const isMultiSelect =
      filter.operatorId === OperatorId.In &&
      selectedProperty.type === PropertyType.Enumerated;

    const isSingleSelect = selectedProperty.type === PropertyType.Enumerated;

    if (isMultiSelect) {
      return (
        <select
          multiple
          className="px-3 py-2 border rounded-lg"
          value={Array.isArray(filter.value) ? filter.value : []}
          onChange={(e) => {
            const values = Array.from(e.target.selectedOptions).map(
              (opt) => opt.value
            );
            handleValueChange(values);
          }}
        >
          {selectedProperty.values?.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      );
    }

    if (isSingleSelect) {
      return (
        <select
          className="px-3 py-2 border rounded-lg"
          value={filter.value.toString()}
          onChange={(e) => handleValueChange(e.target.value)}
        >
          <option value="">Select a value</option>
          {selectedProperty.values?.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type={selectedProperty.type === PropertyType.Number ? "number" : "text"}
        className="px-3 py-2 border rounded-lg"
        value={filter.value.toString()}
        onChange={(e) => handleValueChange(e.target.value)}
        placeholder="Enter value..."
      />
    );
  };

  return (
    <div className="flex items-center gap-4">
      <select
        className="px-3 py-2 border rounded-lg"
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
        onChange={handleOperatorChange}
        disabled={filter.propertyId == null}
      >
        <option value="">Select operator</option>
        {validPropertyOperators.map((operator) => (
          <option key={operator.id} value={operator.id}>
            {operator.text}
          </option>
        ))}
      </select>

      {renderValueInput()}

      <button
        onClick={onClear}
        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 ml-auto"
      >
        Clear
      </button>
    </div>
  );
};

export default FilterBar;
