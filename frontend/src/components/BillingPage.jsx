import { useEffect, useState } from "react";
import Select from "react-select";
import "./BillingPage.css";
import api from "../services/api";
function BillingPage({
  setPage,
  setBillData,
  setBillItems
}) {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
const [generatedBill, setGeneratedBill] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCategoryChange = async (selected) => {
    setSelectedCategory(selected);

    const res = await api.get(
      `/products/category/${selected.value}`
    );

    setProducts(res.data);

    const uniqueBrands = [
      ...new Set(
        res.data.map((p) => p.brand)
      )
    ];

    setBrands(uniqueBrands);

    setSelectedBrand(null);
    setSelectedSize(null);
    setSelectedProduct(null);

    setSizes([]);
    setFilteredProducts([]);
  };

  const handleBrandChange = (selected) => {

    setSelectedBrand(selected);

    const brandProducts =
      products.filter(
        p => p.brand === selected.value
      );

    const uniqueSizes = [
      ...new Set(
        brandProducts.map(
          p => p.size
        )
      )
    ];

    setSizes(uniqueSizes);

    setSelectedSize(null);
    setSelectedProduct(null);
    setFilteredProducts([]);
  };

  const handleSizeChange = (selected) => {

    setSelectedSize(selected);

    const filtered =
      products.filter(
        p =>
          p.brand === selectedBrand.value &&
          p.size === selected.value
      );

    setFilteredProducts(filtered);

    setSelectedProduct(null);
  };

  const addItem = () => {

    if (!selectedProduct) {
      alert("Select Product");
      return;
    }

    if (!quantity || quantity <= 0) {
      alert("Enter Quantity");
      return;
    }

    const p =
      filteredProducts.find(
        x => x.pid === selectedProduct.value
      );

    const item = {
      id: Date.now(),

      productId: p.pid,

      productName: p.productName,

      brand: p.brand,

      size: p.size,
       category: p.category,
      quantity: Number(quantity),

      price: p.price,

      amount:
        p.price *
        Number(quantity)
    };

    setCart([...cart, item]);

    setQuantity("");
  };

  const updateQuantity = (id, qty) => {

    const updated =
      cart.map(item =>
        item.id === id
          ? {
              ...item,
              quantity: Number(qty),
              amount:
                item.price *
                Number(qty)
            }
          : item
      );

    setCart(updated);
  };

  const removeItem = (id) => {

    setCart(
      cart.filter(
        item => item.id !== id
      )
    );
  };

  const totalAmount =
    cart.reduce(
      (sum, item) =>
        sum + item.amount,
      0
    );

  const createBill = async () => {

  if (cart.length === 0) {
    alert("Add Items First");
    return;
  }

  try {

    const payload = {
      items: cart.map(c => ({
        productId: c.productId,
        quantity: c.quantity
      }))
    };

    const res = await api.post(
      "/bills",
      payload
    );
    

    setBillData(res.data);
setBillItems(cart);
setPage("invoice");

  } catch (err) {
    console.error(err);
    alert("Error Generating Bill");
  }
};

const printBill = () => {

  const printContents =
    document.getElementById(
      "bill-section"
    ).innerHTML;

  const win =
    window.open(
      "",
      "",
      "width=900,height=700"
    );

  win.document.write(`
    <html>
      <head>
        <title>Invoice</title>

        <style>
          body{
            font-family:Arial;
            padding:20px;
          }

          table{
            width:100%;
            border-collapse:collapse;
          }

          th,td{
            border:1px solid black;
            padding:8px;
            text-align:center;
          }
        </style>

      </head>

      <body>
        ${printContents}
      </body>

    </html>
  `);

  win.document.close();
  win.print();
};
  return (

   <div className="billing-page">
  <div className="glass-card form-card">

      <h1 className="page-title">
            Billing Management
          </h1>

      {/* CATEGORY */}

      <div className="mb-3">

        <label className="form-label">
          Category
        </label>

        <Select
          placeholder="Search Category..."
          value={selectedCategory}
          onChange={handleCategoryChange}
          options={categories.map(cat => ({
            value: cat.id,
            label: cat.name
          }))}
        />

      </div>

      {/* BRAND */}

      <div className="mb-3">

        <label className="form-label">
          Brand
        </label>

        <Select
          placeholder="Search Brand..."
          value={selectedBrand}
          onChange={handleBrandChange}
          options={brands.map(brand => ({
            value: brand,
            label: brand
          }))}
        />

      </div>

      {/* SIZE */}

      <div className="mb-3">

        <label className="form-label">
          Size
        </label>

        <Select
          placeholder="Search Size..."
          value={selectedSize}
          onChange={handleSizeChange}
          options={sizes.map(size => ({
            value: size,
            label: size
          }))}
        />

      </div>

      {/* PRODUCT */}

      <div className="mb-3">

        <label className="form-label">
          Product
        </label>

        <Select
          placeholder="Search Product..."
          value={selectedProduct}
          onChange={setSelectedProduct}
          options={filteredProducts.map(p => ({
            value: p.pid,
            label:
              p.productName +
              " - ₹" +
              p.price
          }))}
        />

      </div>

      {/* QUANTITY */}

      <div className="mb-3">

        <label className="form-label">
          Quantity
        </label>

        <input
          type="number"
          className="form-control"
          value={quantity}
          onChange={(e) =>
            setQuantity(e.target.value)
          }
        />

      </div>

      <button
        className="add-item-btn"
        onClick={addItem}
      >
        Add Item
      </button>

      {/* BILL TABLE */}

      

<div className="table-header">
  <h3>🛒 Billing Cart</h3>
  <span>Total Items : {cart.length}</span>
</div>

<table className="table custom-table">

        <thead>
          <tr>
            <th>Brand</th>
            <th>Category</th>
            <th>Size</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {cart.map(item => (

            <tr key={item.id}>

               
              <td>{item.brand}</td>
               <td>{item.category?.name}</td>
              <td>{item.size}</td>

              <td>{item.productName}</td>

              <td>

                <input
                  type="number"
                  className="form-control"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(
                      item.id,
                      e.target.value
                    )
                  }
                />

              </td>

              <td>₹{item.price}</td>

              <td>₹{item.amount}</td>

              <td>

                <button
                  className="btn btn-danger"
                  onClick={() =>
                    removeItem(item.id)
                  }
                >
                  Remove
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <h4>
        Total Amount : ₹{totalAmount}
      </h4>

      <button
        className="generate-btn"
        onClick={createBill}
      >
        Generate Bill
        </button>
        {
  generatedBill && (

    <div className="card mt-4 p-4">

      <h3>Invoice</h3>

      <hr />

      <p>
        <strong>Bill No:</strong>
        {" "}
        {generatedBill.billId}
      </p>

      <p>
        <strong>Date:</strong>
        {" "}
        {generatedBill.billDate}
      </p>

      <table className="table table-bordered">

        <thead>
          <tr>
          <th>Brand</th>
          <th>Category</th>
          <th>Size</th>
          <th>Product</th>
          <th>Qty</th>
          <th>Rate</th>
          <th>Amount</th>
          </tr>
        </thead>

        <tbody>

          {cart.map((item) => (

            <tr key={item.id}>

            <td>{item.brand}</td>

           <td>{item.category?.name}</td>
            <td>{item.size}</td>

            <td>{item.productName}</td>

            <td>{item.quantity}</td>

            <td>₹{item.price}</td>

            <td>₹{item.amount}</td>

            </tr>

          ))}

        </tbody>

      </table>

      <h4 className="bill-total">
        Total Amount : ₹
        {generatedBill.totalAmount}
      </h4>

      <button
        className="btn btn-success mt-3"
        onClick={() => window.print()}
      >
        Print Bill
      </button>

    </div>

  )
}
      
</div>
    </div>
  );
}

export default BillingPage;