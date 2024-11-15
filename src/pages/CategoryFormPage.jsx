import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderComponent from "../components/HeaderComponent";

const CategoryFormPage = () => {
    const [description, setDescription] = useState(""); // Estado para la descripción de la categoría
    const navigate = useNavigate();
    const apiUrl = "http://localhost:8000/api/v1/categories/"; // URL de tu API

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
        try {
            // Solicitud POST al backend para crear una nueva categoría
            await axios.post(apiUrl, { description });
            navigate("/categories"); // Redirigir a la lista de categorías tras la creación
        } catch (error) {
            console.error("Error al crear la categoría:", error);
        }
    };

    return (
        <div>
            <HeaderComponent />
            <div className="container mt-4">
                <h1>Nueva Categoría</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Descripción
                        </label>
                        <input
                            type="text"
                            id="description"
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Guardar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CategoryFormPage;
