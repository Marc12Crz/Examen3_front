import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import HeaderComponent from "../components/HeaderComponent";

const SerieFormPage = () => {
    const [name, setName] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [rating, setRating] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const { idserie } = useParams(); // Obtener parámetro dinámico de la URL
    const navigate = useNavigate();
    const apiUrl = "http://127.0.0.1:8000/series/api/v1/series/";
    const categoryApiUrl = "http://127.0.0.1:8000/series/api/v1/categories/";

    useEffect(() => {
        loadCategories(); // Cargar categorías disponibles
        if (idserie) {
            loadSerie(); // Cargar datos de la serie si se está editando
        }
    }, [idserie]);

    const loadCategories = async () => {
        try {
            const response = await axios.get(categoryApiUrl);
            setCategories(response.data);
        } catch (error) {
            console.error("Error al cargar categorías:", error);
        }
    };

    const loadSerie = async () => {
        try {
            const response = await axios.get(`${apiUrl}${idserie}/`);
            setName(response.data.name);
            setReleaseDate(response.data.release_date);
            setRating(response.data.rating);
            setCategory(response.data.category);
        } catch (error) {
            console.error("Error al cargar serie:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name,
            release_date: releaseDate,
            rating,
            category,
        }; // Datos enviados al backend
        try {
            if (idserie) {
                await axios.put(`${apiUrl}${idserie}/`, data, {
                    headers: { "Content-Type": "application/json" },
                });
            } else {
                await axios.post(apiUrl, data, {
                    headers: { "Content-Type": "application/json" },
                });
            }
            navigate("/series");
        } catch (error) {
            console.error("Error al guardar serie:", error.response || error);
            alert("Error al guardar la serie. Verifica los datos ingresados.");
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
                        <label htmlFor="releaseDate" className="form-label">Fecha de Lanzamiento</label>
                        <input
                            type="date"
                            id="releaseDate"
                            className="form-control"
                            value={releaseDate}
                            onChange={(e) => setReleaseDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="rating" className="form-label">Calificación</label>
                        <input
                            type="number"
                            step="0.1"
                            id="rating"
                            className="form-control"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Categoría</label>
                        <select
                            id="category"
                            className="form-select"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option value="">Selecciona una categoría</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.description}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Guardar</button>
                </form>
            </div>
        </div>
    );
};

export default SerieFormPage;
