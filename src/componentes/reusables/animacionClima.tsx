import '../../stylesheet/weatherEffect.scss';
import { useState, useEffect } from "react";

interface WeatherEffectProps {
    id: number;
    left: number;
    size: number;
    duration: number;
    delay: number;
}

export default function WeatherEffect({ 
    weatherType 
    }: { 
    weatherType: 'rain' | 'snow' | 'autumn' | 'storm'
 }) {
  const [elements, setElements] = useState<WeatherEffectProps[]>([]);

  useEffect(() => {
    const createElements = () => {
      const newElements = Array.from({ length: 80 }).map((_, i) => ({
        id: i + Date.now(),
        left: Math.random() * window.innerWidth,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 2 + 1,
        delay: Math.random() * 2,
      }));

      setElements((prev) => [...prev, ...newElements]);

      setTimeout(() => {
        setElements((prev) => prev.slice(80));
      }, 2000);
    };

    const interval = setInterval(createElements, 1000);
    return () => clearInterval(interval);
  }, [weatherType]);

  return (
    <div className={`weather-container ${weatherType}`}>
      {elements.map((el) => (
        <div
          key={el.id}
          className="weather-element"
          style={{
            left: el.left,
            width: el.size + "px",
            height: el.size + "px",
            animationDuration: el.duration + "s",
            animationDelay: el.delay + "s",
          }}
        />
      ))}
      {weatherType === "storm" && <Lightning />}
    </div>
  );
}

function Lightning() {
  return <div className="lightning" />;
}
