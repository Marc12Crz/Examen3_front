import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showCategoryService, updateCategoryService } from "../service/CategoryService";
import HeaderComponent from "../components/HeaderComponent"; // Importar el HeaderComponent

function CategoryEditFormPage() {
    const { id } = useParams();
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const loadCategory = async () => {
            const resp = await showCategoryService(id);
            setDescription(resp.data.description);
        };
        loadCategory();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateCategoryService(id, { description });
            navigate("/categories");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <HeaderComponent /> {/* Agregar el HeaderComponent */}
            <div className="container">
                <h1>Editar Categoría</h1>
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

export default CategoryEditFormPage;
