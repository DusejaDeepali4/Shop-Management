import {
  FaBoxes,
  FaLayerGroup,
  FaFileInvoiceDollar,
  FaUsers
} from "react-icons/fa";

import { MdInventory } from "react-icons/md";

import "./Dashboard.css";

function Dashboard({ setPage }) {
  return (
    <div className="dashboard-container">

      {/* Remove overlay temporarily if clicks are not working */}
      {/* <div className="overlay"></div> */}

      <div className="dashboard-content">

        <h1 className="main-title">
          Hardware Shop Billing System
        </h1>

        <p className="sub-title">
          Smart Inventory • Product Management • Billing
        </p>

        <div className="cards">

          {/* Categories */}
          <div
            className="card-box"
            onClick={() => setPage("category")}
          >
            <FaLayerGroup className="icon" />
            <h3>Categories</h3>
            <p>Manage all hardware categories</p>
          </div>

          {/* Products */}
          <div
            className="card-box"
            onClick={() => setPage("product")}
          >
            <FaBoxes className="icon" />
            <h3>Products</h3>
            <p>Add and track shop products</p>
          </div>


          {/* Billing */}
          <div
            className="card-box"
            onClick={() => setPage("bill")}
          >
            <FaFileInvoiceDollar className="icon" />
            <h3>Billing</h3>
            <p>Generate customer bills instantly</p>
          </div>

         

        </div>

        <div className="welcome-box">

          <h2>Welcome Admin 👋</h2>

          <p>
            Manage categories, products, inventory,
            customers and billing from one dashboard.
          </p>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;