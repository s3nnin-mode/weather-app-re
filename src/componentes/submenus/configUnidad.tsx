import { ChangeEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setUnidad, unidadActual } from '../../states/unidadParaGrados';
import '../../stylesheet/submenus/interfazCambiarUnidad.scss';

interface Props {
    liberarEspacio: () => void;
}

export const InterfazCambiarUnidad: React.FC<Props> = ({ liberarEspacio }) => {
    const dispatch = useAppDispatch();
    const unidad = useAppSelector(unidadActual);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        dispatch(setUnidad(e.target.value))
    }

    return (
        <div className='collapse contenedor-para-configurar-unidad' id="config-unidad">
            <button 
                className="btn btn-dark" 
                type="button" 
                data-bs-toggle="collapse"
                data-bs-target="#config-unidad" 
                aria-expanded="false" 
                aria-controls="collapseExample" 
                onClick={liberarEspacio}
                >
                <i className="bi bi-arrow-left"></i>
            </button>
            <h2 className='font-google'>
                Unidades
            </h2>
            <p>Cambia a la unidad que desees.</p>
            <ul className='interfaz-configuracion-unidad'>
                <li>
                    <label htmlFor='bt-celcius' className='font-google-delgada'>Grados Celcius</label>
                    <input type='radio' name='unidades' value='celcius' checked={unidad === 'celcius' ? true : false } onChange={handleChange}/>
                </li>
                <li>
                    <label htmlFor='btn-farenheit' className='font-google-delgada'>Grados Farenheit</label>
                    <input type='radio' name='unidades' value='farenheit' checked={unidad === 'farenheit' ? true : false } onChange={handleChange}/>
                </li>
            </ul>
            <div className='nota-unidades'>
                <p>
                    <span>NOTA: </span>Tambien puedes cambiar de unidad seleccionando la 'C' de Celcius
                    o la 'F' de farenheit en el encabezado de la pagina junto a la temperatura actual.
                </p>
            </div>
        </div>
    )
}