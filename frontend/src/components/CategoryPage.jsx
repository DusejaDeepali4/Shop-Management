import { useEffect, useState } from "react";
import api from "../services/api";
import "./CategoryPage.css";
function CategoryPage() {

  const [categories,setCategories]=useState([]);

  const [name,setName]=useState("");

  const [editId,setEditId]=useState(null);

  useEffect(()=>{
      loadCategories();
  },[]);

  const loadCategories=async()=>{

      const res=
      await api.get("/categories");

      setCategories(res.data);
  };

  const saveCategory=async()=>{

      if(editId){

          await api.put(
            `/categories/${editId}`,
            {name}
          );

          setEditId(null);
      }
      else{

          await api.post(
            "/categories",
            {name}
          );
      }

      setName("");

      loadCategories();
  };

  const editCategory=(cat)=>{

      setEditId(cat.id);

      setName(cat.name);
  };

  const deleteCategory=async(id)=>{

      if(
        window.confirm(
        "Delete Category ?"
        )
      ){

          await api.delete(
            `/categories/${id}`
          );

          loadCategories();
      }
  };

  return (
    <div className="category-page">

      {/* FORM CARD */}
      <div className="glass-card form-card">

        <div className="header-section">
          <h1 className="page-title">Category Management</h1>
          <p className="page-subtitle">
            Create, Update and Manage Hardware Categories
          </p>
        </div>

        {/* INPUT + BUTTON ROW */}
        <div className="row align-items-center g-3 mt-3">

          {/* INPUT */}
          <div className="col-md-1">
            <input
              className="form-control custom-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Category Name"
            />
          </div>

          {/* BUTTON */}
          <div className="col-md-9">
            <button
              className="save-btn w-10"
              onClick={saveCategory}
            >
              {editId ? "Update Category" : "Add Category"}
            </button>
          </div>

        </div>

      </div>

      {/* TABLE CARD */}
      <div className="glass-card table-card mt-4">

        <div className="table-header">
          <h3>📂 Category List</h3>
          <span>Total Categories : {categories.length}</span>
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
            {categories.map((cat) => (
              <tr key={cat.id}>
                <td>{cat.id}</td>
                <td>{cat.name}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => editCategory(cat)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteCategory(cat.id)}
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

export default CategoryPage;