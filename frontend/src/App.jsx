import { useState } from "react";
import "./App.css";

import Dashboard from "./components/Dashboard";
import CategoryPage from "./components/CategoryPage";
import ProductPage from "./components/ProductPage";
import BillingPage from "./components/BillingPage";
import InvoicePage from "./components/InvoicePage";

function App() {

  const [page, setPage] = useState("dashboard");

  const [billData, setBillData] = useState(null);
  const [billItems, setBillItems] = useState([]);

  return (
    <div className="app-container">

      {page !== "dashboard" && page !== "invoice" && (

        <div className="top-navbar">

          <div className="logo-section">
            <h2>🔩 Anand Krishna Enterprises</h2>
          </div>

          <div className="nav-buttons">

            <button
              className={page === "dashboard" ? "nav-btn active" : "nav-btn"}
              onClick={() => setPage("dashboard")}
            >
              Dashboard
            </button>

            <button
              className={page === "category" ? "nav-btn active" : "nav-btn"}
              onClick={() => setPage("category")}
            >
              Categories
            </button>

            <button
              className={page === "product" ? "nav-btn active" : "nav-btn"}
              onClick={() => setPage("product")}
            >
              Products
            </button>

            <button
              className={page === "bill" ? "nav-btn active" : "nav-btn"}
              onClick={() => setPage("bill")}
            >
              Billing
            </button>

          </div>

        </div>

      )}

      <div className="page-wrapper">

        {page === "dashboard" &&
          <Dashboard setPage={setPage} />
        }

        {page === "category" &&
          <CategoryPage />
        }

        {page === "product" &&
          <ProductPage />
        }

        {page === "bill" &&
          <BillingPage
            setPage={setPage}
            setBillData={setBillData}
            setBillItems={setBillItems}
          />
        }

        {page === "invoice" &&
          <InvoicePage
            bill={billData}
            items={billItems}
            setPage={setPage}
          />
        }

      </div>

    </div>
  );
}

export default App;