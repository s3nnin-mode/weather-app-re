import '../stylesheet/btnAbrirSidebar.scss';

export const BtnAbrirSidebar = () => {
    return (
      <button className='btn btn-dark btn-abrir-sidebar' type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
        <i id='icon-config' className="bi bi-list" />
      </button>
    )
}