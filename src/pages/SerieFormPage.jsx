import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";

function SerieFormPage() {
    const series = [
        { cod: "1", nom: "Friends", cat: "Comedy", img: "friends.png" },
        { cod: "2", nom: "Law & Order", cat: "Drama", img: "law-order.png" },
        { cod: "3", nom: "The Big Bang Theory", cat: "Comedy", img: "the-big-bang-theory.png" },
        { cod: "4", nom: "Stranger Things", cat: "Drama", img: "stranger-things.png" },
        { cod: "5", nom: "Dr. House", cat: "Drama", img: "Dr-House.png" },
        { cod: "6", nom: "The X-files", cat: "Drama", img: "The-X-files.png" },
    ];

    const { idserie } = useParams();
    const navigate = useNavigate();

    const [serie, setSerie] = useState(null);
    const [nombre, setNombre] = useState("");
    const [categoria, setCategoria] = useState("");
    const [imagen, setImagen] = useState("");

    useEffect(() => {
        const selectedSerie = series.find((item) => item.cod === idserie);
        if (selectedSerie) {
            setSerie(selectedSerie);
            setNombre(selectedSerie.nom);
            setCategoria(selectedSerie.cat);
            setImagen("https://dummyimage.com/400x250/000/fff&text=" + selectedSerie.img);
        } else {
            console.error("Serie no encontrada");
            navigate("/series"); // Redirige si no encuentra la serie
        }
    }, [idserie, navigate, series]);

    const handleSave = (e) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica para guardar los cambios de la serie
        console.log("Serie guardada:", { nombre, categoria });
        navigate("/series");
    };

    const handleCancel = () => {
        navigate("/series");
    };

    const handleBack = () => {
        navigate("/series");
    };

    return (
        <>
            <HeaderComponent />
            <div className="container mt-3">
                <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                    <h3>{serie ? `Editar - ${serie.nom}` : "Nueva Serie"}</h3>
                    <button onClick={handleBack} className="btn btn-outline-secondary">Regresar</button>
                </div>
                <form className="row" onSubmit={handleSave}>
                    <div className="col-md-4">
                        <img
                            id="fileImg"
                            className="card-img-top"
                            src={imagen || "https://dummyimage.com/400x250/000/fff"}
                            alt="img"
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="mb-3">
                            <label htmlFor="inputName" className="form-label">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputName"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputCategory" className="form-label">Categoría</label>
                            <select
                                className="form-select"
                                id="inputCategory"
                                value={categoria}
                                onChange={(e) => setCategoria(e.target.value)}
                                required
                            >
                                <option value="">Seleccione una opción</option>
                                <option value="Horror">Horror</option>
                                <option value="Comedy">Comedy</option>
                                <option value="Action">Action</option>
                                <option value="Drama">Drama</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputImage" className="form-label">Imagen</label>
                            <input
                                type="file"
                                className="form-control"
                                id="inputImage"
                                onChange={(e) => setImagen(URL.createObjectURL(e.target.files[0]))}
                            />
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary">Guardar</button>
                            <button type="button" onClick={handleCancel} className="btn btn-secondary ms-2">Cancelar</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default SerieFormPage;
