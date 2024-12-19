import '../stylesheet/molinos.scss'

export const Molinos = () => {

  return (
    <div className='molinos'>
      <i className="bi bi-wind icono-viento" />
      <div className='molino'>
        <div className='aspa'>
          <img src='https://s.yimg.com/os/weather/1.0.1/windmill/blade_big@2x.png' alt='aspa de molino'/>
        </div>
        <div className='poste' />
      </div>

      <div className='molino-chico'>
        <div className='aspa'>
          <img src='https://s.yimg.com/os/weather/1.0.1/windmill/blade_big@2x.png' alt='aspa de molino'/>
        </div>
        <div className='poste' />
      </div>
    </div>
  )
}