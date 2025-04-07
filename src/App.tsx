import React, { useState } from "react";
import "./App.css";
import { ProductTable } from "./components/ProductTable";
import datastore from "./mocks/datastore";
import FilterBar from "./components/FilterBar";
import { Filter } from "./types";

console.log("datastore", datastore);
function App() {
  const [filter, setFilter] = useState<Filter>({
    propertyId: null,
    operatorId: null,
    value: "",
  });

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-center text-3xl font-bold ">Online Store</h1>
        <FilterBar
          properties={datastore.properties}
          filter={filter}
          onFilterChange={setFilter}
        />
        <ProductTable
          products={datastore.products}
          properties={datastore.properties}
        />
      </div>
    </div>
  );
}

export default App;
