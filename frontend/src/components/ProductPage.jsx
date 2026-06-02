import { useEffect, useState } from "react";
import api from "../services/api";

function ProductPage() {

  const [categories, setCategories] = useState([]);

  const [product, setProduct] = useState({
    productName: "",
    brand: "",
    size: "",
    unit: "",
    price: "",
    stock: "",
    categoryId: ""
  });

  const [products, setProducts] = useState([]);

  const loadCategories = async () => {
    const res = await api.get("/categories");
    setCategories(res.data);
  };

  const loadProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, []);

  const saveProduct = async () => {

    await api.post("/products", product);

    loadProducts();
  };

  return (
    <div>

      <h2>Products</h2>

      <input
        className="form-control mb-2"
        placeholder="Product Name"
        onChange={(e) =>
          setProduct({
            ...product,
            productName: e.target.value
          })
        }
      />

      <input
        className="form-control mb-2"
        placeholder="Brand"
        onChange={(e) =>
          setProduct({
            ...product,
            brand: e.target.value
          })
        }
      />

      <input
        className="form-control mb-2"
        placeholder="Size"
        onChange={(e) =>
          setProduct({
            ...product,
            size: e.target.value
          })
        }
      />

      <input
        className="form-control mb-2"
        placeholder="Unit"
        onChange={(e) =>
          setProduct({
            ...product,
            unit: e.target.value
          })
        }
      />

      <input
        className="form-control mb-2"
        placeholder="Price"
        onChange={(e) =>
          setProduct({
            ...product,
            price: e.target.value
          })
        }
      />

      <input
        className="form-control mb-2"
        placeholder="Stock"
        onChange={(e) =>
          setProduct({
            ...product,
            stock: e.target.value
          })
        }
      />

      <select
        className="form-select mb-2"
        onChange={(e) =>
          setProduct({
            ...product,
            categoryId: e.target.value
          })
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

      <button
        className="btn btn-success"
        onClick={saveProduct}
      >
        Save Product
      </button>

      <hr />

      <table className="table table-bordered">

        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>

        <tbody>

          {products.map(p => (
            <tr key={p.pid}>
              <td>{p.productName}</td>
              <td>{p.price}</td>
              <td>{p.stock}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ProductPage;