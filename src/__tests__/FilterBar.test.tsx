import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { Filter, OperatorId, PropertyType } from "../types";
import FilterBar from "../components/FilterBar";

const mockProperties = [
  { id: 0, name: "Product Name", type: PropertyType.String },
  { id: 2, name: "Weight", type: PropertyType.Number },
  {
    id: 3,
    name: "Category",
    type: PropertyType.Enumerated,
    values: ["tools", "electronics"],
  },
];

const mockFilter: Filter = {
  propertyId: 0,
  operatorId: OperatorId.Equals,
  value: "Headphones",
};

const mockOnFilterChange = jest.fn();
const mockOnClear = jest.fn();

describe("FilterBar", () => {
  beforeEach(() => {
    mockOnFilterChange.mockClear();
    mockOnClear.mockClear();
  });

  it("renders the component with correct initial values", () => {
    render(
      <FilterBar
        properties={mockProperties}
        filter={mockFilter}
        onFilterChange={mockOnFilterChange}
        onClear={mockOnClear}
      />
    );

    expect(screen.getByDisplayValue("Product Name")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Equals")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Headphones")).toBeInTheDocument();
  });

  it("calls onFilterChange when property is changed", () => {
    render(
      <FilterBar
        properties={mockProperties}
        filter={mockFilter}
        onFilterChange={mockOnFilterChange}
        onClear={mockOnClear}
      />
    );

    fireEvent.change(screen.getByDisplayValue("Product Name"), {
      target: { value: "2" },
    });

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      propertyId: 2,
      operatorId: null,
      value: "",
    });
  });

  it("calls onFilterChange when operator is changed", () => {
    render(
      <FilterBar
        properties={mockProperties}
        filter={mockFilter}
        onFilterChange={mockOnFilterChange}
        onClear={mockOnClear}
      />
    );

    fireEvent.change(screen.getByDisplayValue("Equals"), {
      target: { value: OperatorId.Contains },
    });

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ...mockFilter,
      operatorId: OperatorId.Contains,
      value: "",
    });
  });

  it("calls onFilterChange when value is changed", () => {
    render(
      <FilterBar
        properties={mockProperties}
        filter={mockFilter}
        onFilterChange={mockOnFilterChange}
        onClear={mockOnClear}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Enter value..."), {
      target: { value: "Phone" },
    });

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ...mockFilter,
      value: "Phone",
    });
  });

  it("calls onClear when Clear button is clicked", () => {
    render(
      <FilterBar
        properties={mockProperties}
        filter={mockFilter}
        onFilterChange={mockOnFilterChange}
        onClear={mockOnClear}
      />
    );

    fireEvent.click(screen.getByText("Clear"));
    expect(mockOnClear).toHaveBeenCalled();
  });
});
