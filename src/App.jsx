import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import SeriePage from "./pages/SeriePage";
import SerieFormPage from "./pages/SerieFormPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/categories" element={<CategoryPage />} />
                <Route path="/series" element={<SeriePage />} />
                <Route path="/series/new" element={<SerieFormPage />} />
                <Route path="/series/edit/:idserie" element={<SerieFormPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
