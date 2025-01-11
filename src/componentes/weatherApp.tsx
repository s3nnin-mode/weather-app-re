import { Route, Routes } from 'react-router-dom';
import { WeatherMain } from './rutas/home';
import { Formularios } from './rutas/formularios';

export const WeatherApp = () => {
  
  return (
    <Routes>
      <Route path='/' element={<WeatherMain />} />
      <Route path='/formulario/*' element={<Formularios />}/>
    </Routes>
  )
}