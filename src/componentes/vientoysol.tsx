import { Molinos } from "./molinos";
import { useAppSelector } from "../hooks";
import { weatherData } from "../states/weather";
import '../stylesheet/vientoysol.scss';
import { SunChart } from "./graficadelsol";
import { useEffect, useState } from "react";
import { getMapa } from "../services/mapa";
import { AxiosResponse } from "axios";

export const convertirMsAKm = (viento: number) => {
  return Math.floor(viento * 3.6);
}

export const VientoYSol = () => {
    const weather = useAppSelector(weatherData);
    const { sunrise, sunset} = weather.sys;
    const velocidadDelViento = weather.wind.speed;
    const direccionDelViento = weather.wind.deg;


    return (
      <div className='viento-y-sol'>
        <div className='viento-container'>
          <Molinos />
          <div className='detalles-del-viento'>
            <div>
              <p className='descripcion font-google'>Velocidad del viento:</p>
              <p className='font-google-delgada'>{convertirMsAKm(velocidadDelViento)}K/H</p>
            </div>
            <div>
              <p className='descripcion font-google'>Direccion del viento:</p>
              <p className='font-google-delgada'>{direccionDelViento}°</p>
            </div>
          </div>
        </div>
        <div className='sol-container'>
        </div>
      </div>
    )
}