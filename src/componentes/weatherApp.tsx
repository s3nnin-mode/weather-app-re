import { Route, Routes } from 'react-router-dom';
import { WeatherMain } from './rutas/home';
import { FormularioLogin } from './rutas/login';
import { Formularios } from './formularios';

export const WeatherApp = () => {
  
  return (
    <Routes>
      <Route path='/' element={<WeatherMain />} />
      <Route path='/formulario/*' element={<Formularios />}/>
    </Routes>
  )
}