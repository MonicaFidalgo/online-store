export type Property = {
  id: number;
  name: string;
  type: "string" | "number" | "enumerated";
  values?: string[];
};

export type Operator = {
  text: string;
  id: string;
};

export type PropertyValue = {
  property_id: number;
  value: string | number;
};

export type Product = {
  id: number;
  property_values: PropertyValue[];
};

export type Filter = {
  propertyId: number | null;
  operatorId: string | null;
  value: string | string[] | number;
};

export type DataStore = {
  getProducts: () => Product[];
  getProperties: () => Property[];
  getOperators: () => Operator[];
  products: Product[];
  properties: Property[];
  operators: Operator[];
};

export enum OperatorId {
  Equals = "equals",
  GreaterThan = "greater_than",
  LessThan = "less_than",
  Any = "any",
  None = "none",
  In = "in",
  Contains = "contains",
}

export enum PropertyType {
  Number = "number",
  Enumerated = "enumerated",
  String = "string",
}
