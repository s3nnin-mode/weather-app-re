export const conversor = (unidad: string, gradosKelvin: number) => {
    switch(unidad) {
        case 'celcius':
        return Math.floor(gradosKelvin - 273.15);
        case 'farenheit':
        return Math.floor((gradosKelvin - 273.15) * 9/5 + 32);
        default:
        return Math.floor(gradosKelvin - 273.15);
    }
}