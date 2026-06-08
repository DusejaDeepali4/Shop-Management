import { useEffect, useState } from "react";
import api from "../services/api";
import "./CategoryPage.css";

function CategoryPage() {

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
const [message, setMessage] = useState("");
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

  const saveCategory = async () => {

    if (!name.trim()) {
      alert("Enter Category Name");
      return;
    }

    try {

      if (editId) {

  await api.put(
    `/categories/${editId}`,
    { name }
  );

  setMessage("✅ Category Updated Successfully!");

  setEditId(null);

} else {

  await api.post(
    "/categories",
    { name }
  );

  setMessage("✅ Category Added Successfully!");
}

setName("");

loadCategories();

setTimeout(() => {
  setMessage("");
}, 3000);

    } catch (err) {

      console.log(err);

      alert("Error Saving Category");
    }
  };

  const editCategory = (cat) => {

    setEditId(cat.id);

    setName(cat.name);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const deleteCategory = async (id) => {

    if (
      window.confirm(
        "Delete Category ?"
      )
    ) {

      try {

        await api.delete(
          `/categories/${id}`
        );

        loadCategories();

      } catch (err) {

        console.log(err);

        alert("Error Deleting Category");
      }
    }
  };

  return (

    <div className="category-page">

      {/* FORM CARD */}

      <div className="glass-card form-card">

        <div className="header-section">

          <h1 className="page-title">
            Category Management
          </h1>

          <p className="page-subtitle">
            Create, Update and Manage Hardware Categories
          </p>
{message && (
  <div className="success-message">
    {message}
  </div>
)}
        </div>

        <div className="row align-items-center g-4 justify-content-center">

          <div className="col-md-5">

            <input
              type="text"
              className="form-control custom-input"
              placeholder="Enter Category"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

          </div>

          <div className="col-md-3">

            <button
              className="save-btn"
              onClick={saveCategory}
            >
              {editId
                ? "Update Category"
                : "Add Category"}
            </button>

          </div>

        </div>

      </div>

      {/* TABLE */}

      <div className="glass-card table-card mt-4">

        <div className="table-header">

          <h3>
            📂 Category List
          </h3>

          <span>
            Total Categories :
            {" "}
            {categories.length}
          </span>

        </div>

        <table className="table custom-table">

          <thead>

            <tr>
              <th>ID</th>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {categories.length > 0 ? (

              categories.map((cat) => (

                <tr key={cat.id}>

                  <td>{cat.id}</td>

                  <td>{cat.name}</td>

                  <td>

                    <button
                      className="edit-btn"
                      onClick={() =>
                        editCategory(cat)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteCategory(cat.id)
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="3"
                  className="text-center"
                >
                  No Categories Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default CategoryPage;