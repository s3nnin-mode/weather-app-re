import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HistorialDeNavegacion } from './contextos/historialContexto';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// Importar Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Importar Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.json';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <HistorialDeNavegacion>
      <App />
    </HistorialDeNavegacion>
  </React.StrictMode>
);

//registrar el service worker si el navegador lo soporta
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
