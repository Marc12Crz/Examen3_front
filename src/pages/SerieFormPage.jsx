import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import HeaderComponent from "../components/HeaderComponent";

const SerieFormPage = () => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const { idserie } = useParams(); // Obtener el parámetro de la URL
    const navigate = useNavigate();
    const apiUrl = "http://localhost:8000/api/v1/series/";

    useEffect(() => {
        if (idserie) {
            loadSerie();
        }
    }, [idserie]);

    const loadSerie = async () => {
        try {
            const response = await axios.get(`${apiUrl}${idserie}/`);
            setName(response.data.name);
            setCategory(response.data.category);
        } catch (error) {
            console.error("Error al cargar serie:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { name, category };
        try {
            if (idserie) {
                // Editar serie existente
                await axios.put(`${apiUrl}${idserie}/`, data);
            } else {
                // Crear nueva serie
                await axios.post(apiUrl, data);
            }
            navigate("/series");
        } catch (error) {
            console.error("Error al guardar serie:", error);
        }
    };

    return (
        <div>
            <HeaderComponent />
            <div className="container mt-4">
                <h1>{idserie ? "Editar Serie" : "Nueva Serie"}</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Categoría</label>
                        <input
                            type="text"
                            id="category"
                            className="form-control"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Guardar</button>
                </form>
            </div>
        </div>
    );
};

export default SerieFormPage;
