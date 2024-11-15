import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";

const CategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const apiUrl = "http://localhost:8000/api/v1/categories/";

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const response = await axios.get(apiUrl);
            setCategories(response.data);
        } catch (error) {
            console.error("Error al cargar categorías:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${apiUrl}${id}/`);
            loadCategories(); // Actualiza la lista después de eliminar
        } catch (error) {
            console.error("Error al eliminar categoría:", error);
        }
    };
    return (
        <div>
            <HeaderComponent />
            <div className="container mt-4">
                <h1>Categorías</h1>
                <Link to="/categories/new" className="btn btn-primary mb-3">
                    Nueva Categoría
                </Link>
                <table className="table">
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
                                    <button onClick={() => handleDelete(category.id)} className="btn btn-danger">
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
};

export default CategoryPage;
