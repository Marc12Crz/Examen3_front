import React from 'react';
import ReactDOM from "react-dom/client"; // Importa desde react-dom/client
import App from './App';
import { AppProvider } from './contexts/AppContext';

// Obtén el elemento raíz del DOM
const rootElement = document.getElementById('root');

// Usa createRoot para inicializar la aplicación
const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <AppProvider>
            <App />
        </AppProvider>
    </React.StrictMode>
);
