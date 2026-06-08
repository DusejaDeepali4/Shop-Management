import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Common.css";

function ProductPage() {

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
const [message, setMessage] = useState("");
  const [product, setProduct] = useState({
    brand: "",
    size: "",
    categoryId: "",
    productName: "",
    unit: "",
    price: ""
  });

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, []);

  const loadCategories = async () => {
    const res = await api.get("/categories");
    setCategories(res.data);
  };

  const loadProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  const clearForm = () => {
    setProduct({
      brand: "",
    size: "",
    categoryId: "",
    productName: "",
    unit: "",
    price: ""
    });

    setEditId(null);
  };

  const saveProduct = async () => {

  try {

    if (editId) {

      await api.put(
        `/products/${editId}`,
        product
      );

      setMessage(
        "✅ Product Updated Successfully!"
      );

    } else {

      await api.post(
        "/products",
        product
      );

      setMessage(
        "✅ Product Added Successfully!"
      );
    }

    clearForm();

    loadProducts();

    setTimeout(() => {
      setMessage("");
    }, 3000);

  } catch (err) {

    console.log(err);

    setMessage(
      "❌ Error Saving Product"
    );
  }
};

  const editProduct = (p) => {

  setEditId(p.pid);

  setProduct({
    brand: p.brand || "",
    size: p.size || "",
    categoryId: p.category?.id || "",
    productName: p.productName || "",
    unit: p.unit || "",
    price: p.price || ""
  });
 setMessage(
    `✏️ Editing Product : ${p.productName}`
  );
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

  const deleteProduct = async (id) => {

  if (window.confirm("Delete Product ?")) {

    try {

      await api.delete(
        `/products/${id}`
      );

      loadProducts();

      setMessage(
        "🗑️ Product Deleted Successfully!"
      );

      setTimeout(() => {
        setMessage("");
      }, 3000);

    } catch (err) {

      console.log(err);

      setMessage(
        "❌ Error Deleting Product"
      );
    }
  }
};

  return (
    <div className="category-page product-page">

      {/* FORM CARD */}

      <div className="glass-card form-card">

        <h1 className="page-title">
          Product Management
        </h1>

        <p className="page-subtitle">
          Add, Update and Manage Shop Products
        </p>
{message && (
  <div className="success-message">
    {message}
  </div>
)}
        <div className="row g-3">

           <div className="col-md-4">
  <label className="form-label text-white fw-bold">
    Product Name
  </label>

  <input
    className="form-control custom-input"
    value={product.productName}
    onChange={(e)=>
      setProduct({
        ...product,
        productName:e.target.value
      })
    }
  />
</div>

          <div className="col-md-4">
  <label className="form-label text-white fw-bold">
    Brand
  </label>

  <input
    className="form-control custom-input"
    value={product.brand}
    onChange={(e)=>
      setProduct({
        ...product,
        brand:e.target.value
      })
    }
  />
</div>

<div className="col-md-4">
  <label className="form-label text-white fw-bold">
    Size
  </label>

  <input
    className="form-control custom-input"
    value={product.size}
    onChange={(e)=>
      setProduct({
        ...product,
        size:e.target.value
      })
    }
  />
</div>

<div className="col-md-4">
  <label className="form-label text-white fw-bold">
    Unit
  </label>

  <input
    className="form-control custom-input"
    value={product.unit}
    onChange={(e)=>
      setProduct({
        ...product,
        unit:e.target.value
      })
    }
  />
</div>

<div className="col-md-4">
  <label className="form-label text-white fw-bold">
    Price (₹)
  </label>

  <input
    type="number"
    className="form-control custom-input"
    value={product.price}
    onChange={(e)=>
      setProduct({
        ...product,
        price:e.target.value
      })
    }
  />
</div>


<div className="col-md-4">
  <label className="form-label text-white fw-bold">
    Category
  </label>

  <select
    className="form-select custom-input"
    value={product.categoryId}
    onChange={(e)=>
      setProduct({
        ...product,
        categoryId:e.target.value
      })
    }
  >
    <option value="">
      Select Category
    </option>

    {categories.map(cat=>(
      <option
        key={cat.id}
        value={cat.id}
      >
        {cat.name}
      </option>
    ))}
  </select>
</div>

          <div className="col-md-3">
            <button
              className="save-btn"
              onClick={saveProduct}
            >
              {editId
                ? "Update Product"
                : "Save Product"}
            </button>
          </div>

          <div className="col-md-3">
            <button
              className="delete-btn w-100"
              onClick={clearForm}
            >
              Clear
            </button>
          </div>

        </div>

      </div>

      {/* TABLE CARD */}

      <div className="glass-card table-card">

        <div className="table-header">

          <h3>📦 Product Inventory</h3>

          <span>
            Total Products : {products.length}
          </span>

        </div>

        <table className="table custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Brand</th>
              <th>Size</th>
              <th>Category</th>
              <th>Name</th>
              <th>Unit</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {products.map((p) => (

              <tr key={p.pid}>

                <td>{p.pid}</td>
                <td>{p.brand}</td>
                <td>{p.size}</td>
                <td>{p.category?.name}</td>
                <td>{p.productName}</td>
                <td>{p.unit}</td>
                <td>₹{p.price}</td>

                <td>

                  <button
                    className="edit-btn me-4"
                    onClick={() => editProduct(p)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteProduct(p.pid)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ProductPage;