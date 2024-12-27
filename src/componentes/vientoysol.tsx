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
        <i className="bi bi-cone"></i>
        <h5>Under construccion!</h5>
      </div>
    )
}