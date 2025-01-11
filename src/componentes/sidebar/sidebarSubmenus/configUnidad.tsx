import { ChangeEvent, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setUnidad, unidadActual } from '../../../states/unidadParaGrados';
import '../../../stylesheet/sidebar/submenus/interfazCambiarUnidad.scss';
import { Collapse } from 'bootstrap';

interface Props {
    liberarEspacio: () => void;
    hayUnaInterfazAbierta: boolean;
}

export const InterfazCambiarUnidad: React.FC<Props> = ({ liberarEspacio, hayUnaInterfazAbierta }) => {
    const dispatch = useAppDispatch();
    const unidad = useAppSelector(unidadActual);
    const collapseRef = useRef(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setUnidad(e.target.value))
    }

    const handleCollapse = () => {
        if (collapseRef.current) {
            const bsCollapse = Collapse.getInstance(collapseRef.current) || new Collapse(collapseRef.current);
            bsCollapse.hide(); // Cierra el colapso manualmente
            liberarEspacio(); // Llama a la función de React
        }
    };

    return (
        <div ref={collapseRef} className='collapse contenedor-para-configurar-unidad' id="config-unidad">
            <button 
                className="btn btn-dark" 
                type="button" 
        
                onClick={handleCollapse}
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