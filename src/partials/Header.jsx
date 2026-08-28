
function Header({
  busqueda,
  setBusqueda,
  cantidadCarrito,
  abrirCarrito,
  usuarioActual,
  cambiarPagina,
  cerrarSesion
}) {

  return (
    <>
      {/* BARRA SUPERIOR */}

      <div className="bg-dark text-white py-2 small">

        <div className="container d-flex justify-content-between">

          <span>
            <i className="fa-solid fa-truck me-2 text-warning"></i>
            Envíos a todo Colombia
          </span>

          <span>
            <i className="fa-solid fa-phone me-2 text-warning"></i>
            Atención: 300 000 0000
          </span>

        </div>

      </div>


      {/* HEADER */}

      <header className="bg-white shadow-sm">

        <div className="container py-3">

          <div className="d-flex align-items-center justify-content-between gap-4">


            {/* LOGO */}

            <div
              className="d-flex align-items-center"
              role="button"
              onClick={() =>
                cambiarPagina("home")
              }
            >

              <div className="bg-warning text-primary rounded-3 p-3 me-2">

                <i className="fa-solid fa-screwdriver-wrench"></i>

              </div>

              <div>

                <h4 className="fw-bold text-primary mb-0">

                  Producciones{" "}

                  <span className="text-warning">
                    Angel
                  </span>

                </h4>

                <small className="text-secondary">
                  REPUESTOS PARA ELECTRODOMÉSTICOS
                </small>

              </div>

            </div>


            {/* BUSCADOR */}

            <div className="input-group w-50">

              <input
                type="text"
                className="form-control"
                placeholder="Buscar repuestos..."
                value={busqueda}
                onChange={(e) =>
                  setBusqueda(e.target.value)
                }
              />

              <button className="btn btn-warning">

                <i className="fa-solid fa-magnifying-glass"></i>

              </button>

            </div>


            {/* ACCIONES */}

            <div className="d-flex align-items-center gap-2">


              {!usuarioActual ? (

                <>

                  <button
                    className="btn btn-outline-primary"
                    onClick={() =>
                      cambiarPagina("login")
                    }
                  >

                    <i className="fa-solid fa-right-to-bracket me-1"></i>

                    Ingresar

                  </button>


                  <button
                    className="btn btn-warning"
                    onClick={() =>
                      cambiarPagina("registro")
                    }
                  >

                    <i className="fa-solid fa-user-plus me-1"></i>

                    Registrarse

                  </button>

                </>

              ) : (

                <div className="dropdown">

                  <button
                    className="btn btn-outline-primary dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >

                    <i className="fa-solid fa-user me-2"></i>

                    {usuarioActual.primerNombre ||
                      usuarioActual.nombre}

                  </button>


                  <ul className="dropdown-menu dropdown-menu-end">


                    {usuarioActual.rol === "ADMIN" && (

                      <li>

                        <button
                          className="dropdown-item"
                          onClick={() =>
                            cambiarPagina("admin")
                          }
                        >

                          <i className="fa-solid fa-gear me-2"></i>

                          Administración

                        </button>

                      </li>

                    )}


                    <li>

                      <button
                        className="dropdown-item text-danger"
                        onClick={cerrarSesion}
                      >

                        <i className="fa-solid fa-right-from-bracket me-2"></i>

                        Cerrar sesión

                      </button>

                    </li>

                  </ul>

                </div>

              )}


              {/* CARRITO */}

              <button
                className="btn btn-primary position-relative"
                onClick={abrirCarrito}
              >

                <i className="fa-solid fa-cart-shopping"></i>


                {cantidadCarrito > 0 && (

                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">

                    {cantidadCarrito}

                  </span>

                )}

              </button>

            </div>

          </div>

        </div>

      </header>


      {/* NAVBAR */}

      <nav className="navbar bg-primary navbar-dark">

        <div className="container d-flex align-items-center">

          <button className="btn btn-warning fw-bold">

            <i className="fa-solid fa-bars me-2"></i>

            Categorías

          </button>


          <div className="d-flex gap-4 ms-4">

            <button
              className="nav-link text-white bg-transparent border-0"
              onClick={() =>
                cambiarPagina("home")
              }
            >
              Inicio
            </button>


            <a
              href="#productos"
              className="nav-link text-white"
            >
              Repuestos
            </a>


            <a
              href="#categorias"
              className="nav-link text-white"
            >
              Categorías
            </a>


            <a
              href="#nosotros"
              className="nav-link text-white"
            >
              Nosotros
            </a>


            <a
              href="#contacto"
              className="nav-link text-white"
            >
              Contacto
            </a>

          </div>


          <span className="ms-auto text-warning fw-bold">

            <i className="fa-solid fa-bolt me-1"></i>

            Ofertas

          </span>

        </div>

      </nav>

    </>
  );
}

export default Header;
