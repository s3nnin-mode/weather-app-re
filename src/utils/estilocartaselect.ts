export const cartaSelecAnimacion = (fecha: string) => {
    const cartas = Array.from(document.querySelectorAll('.carta'));
    cartas.forEach(carta => {
        if (carta.classList.contains('carta-select')) carta.classList.remove('carta-select');
        const index = cartas.findIndex(el => el.id === fecha);
        if (index > -1) cartas[index].classList.add('carta-select');
    })
}