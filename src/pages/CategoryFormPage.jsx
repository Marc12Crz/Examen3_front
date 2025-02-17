import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCategoryService } from "../service/CategoryService";
import HeaderComponent from "../components/HeaderComponent"; // Importar el HeaderComponent

function CategoryFormPage() {
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createCategoryService({ description });
            navigate("/categories");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <HeaderComponent /> {/* Agregar el HeaderComponent */}
            <div className="container">
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
                    <button className="btn btn-primary">Guardar</button>
                </form>
            </div>
        </div>
    );
}

export default CategoryFormPage;
