export interface PropsContaminacion {
    coord: {lon: number, lat: number} 
    list:  {
            main: { aqi: number },
            dt: number,
            components: {
                co: number,
                nh3: number,
                no: number,
                no2: number,
                o3: number,
                pm2_5: number,
                pm10: number,
                so2: number
            }
        }[]
}