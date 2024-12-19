import React, { useEffect, useRef } from 'react';
import { LastPriceAnimationMode ,createChart, ColorType, UTCTimestamp, LineStyle } from 'lightweight-charts';
import { useAppSelector } from '../hooks';
import { datosDeLaGrafica } from '../states/pronostico';
import { unidadActual } from '../states/unidadParaGrados';

export const CustomChart = () => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const dataGrafica = useAppSelector(datosDeLaGrafica);
  const unidad = useAppSelector(unidadActual);

  const tempDinamico = (gradosKelvin: number) => {
    switch(unidad) {
      case 'celcius':
        return Math.floor(gradosKelvin - 273.15);
      case 'farenheit':
        return Math.floor((gradosKelvin - 273.15) * 9/5 + 32);
      default:
        return Math.floor(gradosKelvin - 273.15);
    }
  }

  let data: {time: UTCTimestamp, value: number}[] = [];

  dataGrafica.forEach(d => {
    data.push({time: d.dt as UTCTimestamp, value: tempDinamico(d.main.temp)})
  })

  useEffect(() => {
    if (!chartContainerRef.current) return;
    
    const chart = createChart(chartContainerRef.current, {
      timeScale: {
        timeVisible: true, 
        secondsVisible: true, 
      },
      handleScroll: false,
      handleScale: false,
      crosshair: {
        horzLine: {
          visible: false,
          labelVisible: false,
        },
        vertLine: {
          labelVisible: false,
          style: LineStyle.SparseDotted,
          width: 1
        },
      },
      layout: {
        background: { type: ColorType.Solid, color: 'rgb(16, 15, 15)' },
        textColor: 'white',
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      rightPriceScale: {
        visible: false,
      },
      width: chartContainerRef.current.clientWidth,
      height: 200
    });

    const areaSeries = chart.addAreaSeries({
      lineColor: '#FFFF00',
      topColor: 'rgba(255, 255, 0, 0.3)',
      bottomColor: 'rgba(255, 255, 0, 0.1)',
      priceLineVisible: false,
      lastPriceAnimation: LastPriceAnimationMode.Continuous,
    });

    areaSeries.setData(data);

    areaSeries.setMarkers(
      data.map((point) => ({
        time: point.time,
        position: 'aboveBar',
        shape: 'circle',
        text: `${point.value}°`,
        color: 'white', 
        size: 0
      }))
    );

    chart.timeScale().fitContent();

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current!.clientWidth });
      chart.timeScale().fitContent();
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data]);

  return (
    <div
      ref={chartContainerRef}
      style={{
        height: '200px',
        width: '100%',
        position: 'relative',
      }}
    />
  );
};
