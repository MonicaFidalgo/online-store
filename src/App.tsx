import React, { useMemo, useState } from "react";
import "./App.css";
import { ProductTable } from "./components/ProductTable";
import datastore from "./mocks/datastore";
import FilterBar from "./components/FilterBar";
import { Filter } from "./types";
import { filterProducts } from "./utils/filterProducts";

function App() {
  const [filter, setFilter] = useState<Filter>({
    propertyId: null,
    operatorId: null,
    value: "",
  });

  const products = datastore.getProducts();
  const properties = datastore.getProperties();

  const filteredProducts = useMemo(() => {
    return filterProducts(products, filter);
  }, [products, filter]);

  const handleClear = () => {
    setFilter({
      propertyId: null,
      operatorId: null,
      value: "",
    });
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-center text-3xl font-bold ">Online Store</h1>
        <FilterBar
          properties={properties}
          filter={filter}
          onFilterChange={setFilter}
          onClear={handleClear}
        />
        <ProductTable products={filteredProducts} properties={properties} />
      </div>
    </div>
  );
}

export default App;
