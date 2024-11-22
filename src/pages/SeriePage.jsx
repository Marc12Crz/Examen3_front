import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import HeaderComponent from "../components/HeaderComponent";

const SeriePage = () => {
    const [series, setSeries] = useState([]);
    const apiUrl = "http://127.0.0.1:8000/series/api/v1/series/";

    useEffect(() => {
        loadSeries();
    }, []);

    const loadSeries = async () => {
        try {
            const response = await axios.get(apiUrl);
            setSeries(response.data);
        } catch (error) {
            console.error("Error al cargar las series:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar esta serie?")) {
            try {
                await axios.delete(`${apiUrl}${id}/`);
                loadSeries(); // Recarga las series después de eliminar
            } catch (error) {
                console.error("Error al eliminar la serie:", error);
            }
        }
    };

    return (
        <div>
            <HeaderComponent />
            <div className="container mt-4">
                <h1>Lista de Series</h1>
                <Link to="/series/new" className="btn btn-primary mb-3">Nueva Serie</Link>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {series.map((serie) => (
                            <tr key={serie.id}>
                                <td>{serie.id}</td>
                                <td>{serie.name}</td>
                                <td>{serie.category_description || "Sin categoría"}</td>
                                <td>
                                    <Link to={`/series/${serie.id}/edit`} className="btn btn-warning me-2">Editar</Link>
                                    <button onClick={() => handleDelete(serie.id)} className="btn btn-danger">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SeriePage;
