import React, { useEffect, useState } from "react";
import { getAllCategoryService, deleteCategoryService } from "../service/CategoryService";
import { Link } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent"; // Importar el HeaderComponent

function CategoryPage() {
    const [categories, setCategories] = useState([]);

    const loadCategories = async () => {
        const resp = await getAllCategoryService();
        setCategories(resp.data);
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar esta categoría?")) {
            await deleteCategoryService(id);
            loadCategories();
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    return (
        <div>
            <HeaderComponent /> {/* Agregar el HeaderComponent */}
            <div className="container">
                <h1>Lista de Categorías</h1>
                <Link to="/categories/new" className="btn btn-primary">
                    Nueva Categoría
                </Link>
                <table className="table mt-3">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Descripción</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>{category.description}</td>
                                <td>
                                    <Link
                                        to={`/categories/${category.id}/edit`}
                                        className="btn btn-warning me-2"
                                    >
                                        Editar
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(category.id)}
                                        className="btn btn-danger"
                                    >
                                        Eliminar
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
