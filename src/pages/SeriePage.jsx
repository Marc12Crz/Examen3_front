import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";

const SeriePage = () => {
    const [series, setSeries] = useState([]);
    const apiUrl = "http://localhost:8000/api/v1/series/";

    useEffect(() => {
        loadSeries();
    }, []);

    const loadSeries = async () => {
        try {
            const response = await axios.get(apiUrl);
            setSeries(response.data);
        } catch (error) {
            console.error("Error al cargar series:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${apiUrl}${id}/`);
            loadSeries(); // Actualiza la lista después de eliminar
        } catch (error) {
            console.error("Error al eliminar serie:", error);
        }
    };

    return (
        <div>
            <HeaderComponent />
            <div className="container mt-4">
                <h1>Series</h1>
                <Link to="/series/new" className="btn btn-primary mb-3">Nueva Serie</Link>
                <table className="table">
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
                                <td>{serie.category}</td>
                                <td>
                                    <Link to={`/series/edit/${serie.id}`} className="btn btn-warning me-2">
                                        Editar
                                    </Link>
                                    <button onClick={() => handleDelete(serie.id)} className="btn btn-danger">
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

export default SeriePage;
