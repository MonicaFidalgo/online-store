import React from "react";
import { Product, Property } from "../types";

type ProductTableProps = {
  products: Product[];
  properties: Property[];
};

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  properties,
}) => {
  const getPropertyValue = (product: Product, propertyId: number) => {
    const propertyValue = product.property_values.find(
      (pv) => pv.property_id === propertyId
    );
    return propertyValue?.value || "-";
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {properties.map((property) => (
              <th
                key={property.id}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {property.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr
              key={product.id}
              className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
            >
              {properties.map((property) => (
                <td
                  key={`${product.id}-${property.id}`}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {getPropertyValue(product, property.id)}
                </td>
              ))}
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td
                colSpan={properties.length}
                className="px-6 py-4 text-center text-sm text-gray-500"
              >
                No products match the current filter
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
