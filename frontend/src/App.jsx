import { useState } from "react";
import Dashboard from "./components/Dashboard";
import CategoryPage from "./components/CategoryPage";
import ProductPage from "./components/ProductPage";
import BillingPage from "./components/BillingPage";

function App() {

  const [page, setPage] = useState("dashboard");

  return (
    <div className="container mt-4">

      <h1 className="text-center">
        Hardware Shop Billing System
      </h1>

      <div className="mb-3">

        <button
          className="btn btn-primary me-2"
          onClick={() => setPage("dashboard")}
        >
          Dashboard
        </button>

        <button
          className="btn btn-success me-2"
          onClick={() => setPage("category")}
        >
          Categories
        </button>

        <button
          className="btn btn-warning me-2"
          onClick={() => setPage("product")}
        >
          Products
        </button>

        <button
          className="btn btn-danger"
          onClick={() => setPage("bill")}
        >
          Billing
        </button>

      </div>

      {page === "dashboard" && <Dashboard />}
      {page === "category" && <CategoryPage />}
      {page === "product" && <ProductPage />}
      {page === "bill" && <BillingPage />}

    </div>
  );
}

export default App;