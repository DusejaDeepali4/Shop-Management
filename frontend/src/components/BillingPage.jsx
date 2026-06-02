import { useEffect, useState } from "react";
import api from "../services/api";

function BillingPage() {

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] =
    useState("");

  const [quantity, setQuantity] =
    useState("");

  const [cart, setCart] =
    useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {

    const res =
      await api.get("/categories");

    setCategories(res.data);
  };

  const loadProducts = async (categoryId) => {

    const res =
      await api.get(
        `/products/category/${categoryId}`
      );

    setProducts(res.data);
  };

  const addItem = () => {

    const p =
      products.find(
        x => x.pid == selectedProduct
      );

    setCart([
      ...cart,
      {
        productId: p.pid,
        productName: p.productName,
        quantity: Number(quantity),
        price: p.price,
        amount: p.price * quantity
      }
    ]);
  };

  const createBill = async () => {

    const payload = {
      items:
        cart.map(c => ({
          productId: c.productId,
          quantity: c.quantity
        }))
    };

    const res =
      await api.post(
        "/bills",
        payload
      );

    alert(
      "Bill Generated\nTotal = ₹" +
      res.data.totalAmount
    );

    setCart([]);
  };

  return (
    <div>

      <h2>Create Bill</h2>

      <select
        className="form-select mb-2"
        onChange={(e) =>
          loadProducts(e.target.value)
        }
      >
        <option>Select Category</option>

        {categories.map(cat => (
          <option
            key={cat.id}
            value={cat.id}
          >
            {cat.name}
          </option>
        ))}
      </select>

      <select
        className="form-select mb-2"
        onChange={(e) =>
          setSelectedProduct(e.target.value)
        }
      >
        <option>Select Product</option>

        {products.map(p => (
          <option
            key={p.pid}
            value={p.pid}
          >
            {p.productName}
          </option>
        ))}
      </select>

      <input
        className="form-control mb-2"
        placeholder="Quantity"
        onChange={(e) =>
          setQuantity(e.target.value)
        }
      />

      <button
        className="btn btn-primary"
        onClick={addItem}
      >
        Add Item
      </button>

      <hr />

      <table className="table">

        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>

          {cart.map((c, index) => (
            <tr key={index}>
              <td>{c.productName}</td>
              <td>{c.quantity}</td>
              <td>{c.amount}</td>
            </tr>
          ))}

        </tbody>

      </table>

      <button
        className="btn btn-success"
        onClick={createBill}
      >
        Generate Bill
      </button>

    </div>
  );
}

export default BillingPage;