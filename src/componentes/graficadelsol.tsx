import React, { useEffect, useRef } from 'react';
import { createChart, UTCTimestamp, ColorType } from 'lightweight-charts';

export const SunChart = ({ sunrise, sunset }: { sunrise: number; sunset: number }) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Crear la gráfica
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
      layout: {
        background: { type: ColorType.Solid, color: '#FFFFFF' },
        textColor: '#000000',
      },
      grid: {
        vertLines: { color: '#D3D3D3', visible: false },
        horzLines: { color: '#D3D3D3', visible: false },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        rightOffset: 2,
      },
    });

    // Serie para la curva
    const areaSeries = chart.addAreaSeries({
      topColor: 'rgba(38, 198, 218, 0.6)',
      bottomColor: 'rgba(38, 198, 218, 0.1)',
      lineColor: 'rgba(38, 198, 218, 1)',
      lineWidth: 2,
    });

    // Convertir sunrise y sunset a UTCTimestamp
    const sunriseTime = Math.floor(sunrise / 1000) as UTCTimestamp;
    const sunsetTime = Math.floor(sunset / 1000) as UTCTimestamp;

    // Crear datos ficticios para la curva
    const data = [];
    for (let i = sunriseTime; i <= sunsetTime; i = (i + 3600) as UTCTimestamp) {
      const value = Math.random() * 10 + 20; // Valores ficticios
      data.push({ time: i, value });
    }

    // Añadir los datos a la serie
    areaSeries.setData(data);

    // Configurar el rango visible
    chart.timeScale().setVisibleRange({ from: sunriseTime, to: sunsetTime });

    // Manejar el cambio de tamaño
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current!.clientWidth });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [sunrise, sunset]);

  return <div ref={chartContainerRef} style={{ width: '100%', height: '300px' }} />;
};
