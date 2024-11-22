import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SeriePage from './pages/SeriePage';
import SerieFormPage from './pages/SerieFormPage';
import SerieEditFormPage from './pages/SerieEditFormPage';
import CategoryPage from './pages/CategoryPage'; 
import CategoryFormPage from './pages/CategoryFormPage'; 
import CategoryEditFormPage from './pages/CategoryEditFormPage'; 

function App() {
    return (
        <BrowserRouter>
        <AppProvider>
            <Routes>
                <Route path='/'element={<LoginPage />} />
                <Route path='/home'element={<HomePage />} />
                {/* Rutas para Series */}
                <Route path="/series" element={<SeriePage />} />
                <Route path="/series/new" element={<SerieFormPage />} />
                <Route path="/series/:id/edit" element={<SerieEditFormPage />} />

                {/* Rutas para Categorías */}
                <Route path="/categories" element={<CategoryPage />} />
                <Route path="/categories/new" element={<CategoryFormPage />} />
                <Route path="/categories/:id/edit" element={<CategoryEditFormPage />} />
            </Routes>
            </AppProvider>
        </BrowserRouter>
    );
}

export default App;
