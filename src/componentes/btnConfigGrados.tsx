import { useAppDispatch } from '../hooks';
import { setUnidad } from '../states/unidadParaGrados';
import { useEffect, useRef } from 'react';

export const BotonConfigUnidadDeGrados = () => {
  const dispatch = useAppDispatch();
  const liCelciusRef = useRef<HTMLLIElement | null>(null);
  const liFarenheitRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    const toastLiveExample = document.getElementById('liveToast');
    if (toastLiveExample) {
      const toastBootstrap = (window as any).bootstrap.Toast.getOrCreateInstance(toastLiveExample);
      const handleToast = () => toastBootstrap.show();
      liCelciusRef.current?.addEventListener('click', handleToast);
      liFarenheitRef.current?.addEventListener('click', handleToast);
      return () => {
        liCelciusRef.current?.removeEventListener('click', handleToast);
        liFarenheitRef.current?.removeEventListener('click', handleToast);
      }
    }
  }, []);

  return (
    <div className="dropdown">
      <button className="btn btn-dark" type="button" data-bs-toggle="dropdown" aria-expanded="false">
      <i id='icon-config' className="bi bi-list" />
      </button>
      <ul className="dropdown-menu dropdown-menu-dark">
        <li ref={liCelciusRef} className='dropdown-item opcion' onClick={() => dispatch(setUnidad('celcius'))}>
          Grados celcius
        </li>
        <li><hr className="dropdown-divider" /></li>
        <li ref={liFarenheitRef} className='dropdown-item opcion' onClick={() => dispatch(setUnidad('farenheit'))}>
          Grados Farenheit
        </li>
      </ul>
    </div>
  )
}