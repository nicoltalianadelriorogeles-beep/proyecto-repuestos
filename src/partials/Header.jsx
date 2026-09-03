
function Header({
  busqueda,
  setBusqueda,
  cantidadCarrito,
  abrirCarrito,
  usuarioActual,
  cambiarPagina,
  cambiarSeccionCliente,
  cambiarSeccionAdmin,
  seccionCliente,
  seccionAdmin,
  cerrarSesion,
  abrirModal
}) {

  const cliente =
    usuarioActual?.rol === "CLIENTE";

  const admin =
    usuarioActual?.rol === "ADMIN";


  const irCliente = (seccion) => {

    cambiarSeccionCliente(seccion);

  };


  const irAdmin = (seccion) => {

    cambiarSeccionAdmin(seccion);

  };


  return (
    <>

      {/* ==================================
          BARRA SUPERIOR
      ================================== */}

      <div className="top-bar">

        <div className="container top-bar-content">

          <span>

            <i className="fa-solid fa-truck"></i>

            Envíos a todo Colombia

          </span>


          <span>

            <i className="fa-solid fa-phone"></i>

            Atención: 300 000 0000

          </span>

        </div>

      </div>


      {/* ==================================
          HEADER PRINCIPAL
      ================================== */}

      <header className="main-header">

        <div className="container header-container">


          {/* LOGO */}

          <button

            type="button"

            className="header-logo-button"

            onClick={() => {

              if (cliente) {

                abrirModal("inicio");

              } else if (admin) {

                irAdmin("productos");

              } else {

                cambiarPagina("home");

              }

            }}

          >

            <div className="header-logo-icon">

              <i className="fa-solid fa-screwdriver-wrench"></i>

            </div>


            <div className="header-logo-text">

              <h4>

                Producciones <span>Angel</span>

              </h4>


              <small>

                REPUESTOS PARA ELECTRODOMÉSTICOS

              </small>

            </div>

          </button>


          {/* ==================================
              BUSCADOR
          ================================== */}

          {!admin && (
          <div className="header-search">

            <input

              type="text"

              placeholder="Buscar repuestos..."

              value={busqueda}

              onChange={(e) =>
                setBusqueda(e.target.value)
              }

            />


            <button type="button">

              <i className="fa-solid fa-magnifying-glass"></i>

            </button>

          </div>
          )}


          {/* ==================================
              ACCIONES
          ================================== */}

          <div className="header-actions">


            {!usuarioActual ? (

              <>

                {/* INGRESAR */}

                <button

                  type="button"

                  className="btn-header login"

                  onClick={() =>
                    cambiarPagina("login")
                  }

                >

                  <i className="fa-solid fa-right-to-bracket"></i>

                  Ingresar

                </button>


                {/* REGISTRARSE */}

                <button

                  type="button"

                  className="btn-header register"

                  onClick={() =>
                    cambiarPagina("registro")
                  }

                >

                  <i className="fa-solid fa-user-plus"></i>

                  Registrarse

                </button>

              </>

            ) : (

              <div className="user-menu">


                {/* NOMBRE / PERFIL */}

                <button

                  type="button"

                  className="user-name"

                  onClick={() => {

                    if (cliente) {

                      abrirModal("perfil");

                    }

                  }}

                >

                  <i className="fa-solid fa-user"></i>

                  {usuarioActual.primerNombre}

                </button>


                {/* CERRAR SESIÓN */}

                <button

                  type="button"

                  className="btn-header logout"

                  onClick={
                    cerrarSesion
                  }

                >

                  <i className="fa-solid fa-right-from-bracket"></i>

                  Salir

                </button>

              </div>

            )}


            {/* ==================================
                CARRITO
            ================================== */}

            {cliente && (

              <button

                type="button"

                className="cart-button"

                onClick={() => {

                  irCliente("carrito");

                  abrirCarrito();

                }}

              >

                <i className="fa-solid fa-cart-shopping"></i>


                {cantidadCarrito > 0 && (

                  <span className="cart-count">

                    {cantidadCarrito}

                  </span>

                )}

              </button>

            )}

          </div>

        </div>

      </header>


      {/* ==================================
          MENÚ DE NAVEGACIÓN
      ================================== */}

      <nav className="main-nav">

        <div className="container nav-container">


          {/* ==================================
              MENÚ CLIENTE
          ================================== */}

          {cliente && (

            <div className="nav-links">


              {/* INICIO */}

              <button

                type="button"

                className={`nav-link ${
                  seccionCliente ===
                  "inicio"
                    ? "active"
                    : ""
                }`}

                onClick={() => {

                  cambiarSeccionCliente(
                    "inicio"
                  );

                  abrirModal(
                    "inicio"
                  );

                }}

              >

                <i className="fa-solid fa-house"></i>

                Inicio

              </button>


              {/* REPUESTOS */}

              <button

                type="button"

                className={`nav-link ${
                  seccionCliente ===
                  "repuestos"
                    ? "active"
                    : ""
                }`}

                onClick={() => {

                  cambiarSeccionCliente(
                    "repuestos"
                  );

                  abrirModal(
                    "repuestos"
                  );

                }}

              >

                <i className="fa-solid fa-gears"></i>

                Repuestos

              </button>


              {/* CATEGORÍAS */}

              <button

                type="button"

                className={`nav-link ${
                  seccionCliente ===
                  "categorias"
                    ? "active"
                    : ""
                }`}

                onClick={() => {

                  cambiarSeccionCliente(
                    "categorias"
                  );

                  abrirModal(
                    "categorias"
                  );

                }}

              >

                <i className="fa-solid fa-layer-group"></i>

                Categorías

              </button>


              {/* MI PERFIL */}

              <button

                type="button"

                className={`nav-link ${
                  seccionCliente ===
                  "perfil"
                    ? "active"
                    : ""
                }`}

                onClick={() => {

                  cambiarSeccionCliente(
                    "perfil"
                  );

                  abrirModal(
                    "perfil"
                  );

                }}

              >

                <i className="fa-solid fa-user"></i>

                Mi perfil

              </button>


              {/* CARRITO */}

              <button

                type="button"

                className={`nav-link ${
                  seccionCliente ===
                  "carrito"
                    ? "active"
                    : ""
                }`}

                onClick={() => {

                  cambiarSeccionCliente(
                    "carrito"
                  );

                  abrirCarrito();

                }}

              >

                <i className="fa-solid fa-cart-shopping"></i>

                Carrito


                {cantidadCarrito > 0 && (

                  <span className="nav-cart-count">

                    {cantidadCarrito}

                  </span>

                )}

              </button>

            </div>

          )}


          {/* ==================================
              MENÚ ADMINISTRADOR
          ================================== */}

          {admin && (

            <div className="nav-links">

              <button
                type="button"
                className={`nav-link ${
                  seccionAdmin === "productos"
                    ? "active"
                    : ""
                }`}
                onClick={() => irAdmin("productos")}
              >
                <i className="fa-solid fa-boxes-stacked"></i>
                Gestionar productos
              </button>

              <button
                type="button"
                className={`nav-link ${
                  seccionAdmin === "usuarios"
                    ? "active"
                    : ""
                }`}
                onClick={() => irAdmin("usuarios")}
              >
                <i className="fa-solid fa-users"></i>
                Gestionar usuarios
              </button>

              <button

                type="button"

                className={`nav-link ${
                  seccionAdmin ===
                  "pendientes"
                    ? "active"
                    : ""
                }`}

                onClick={() =>
                  irAdmin("pendientes")
                }

              >

                <i className="fa-solid fa-clock"></i>

                Pedidos pendientes

              </button>

              <button

                type="button"

                className={`nav-link ${
                  seccionAdmin ===
                  "completados"
                    ? "active"
                    : ""
                }`}

                onClick={() =>
                  irAdmin("completados")
                }

              >

                <i className="fa-solid fa-circle-check"></i>

                Pedidos completados

              </button>

            </div>

          )}


          {/* ==================================
              MENÚ PÚBLICO
          ================================== */}

          {!usuarioActual && (

            <div className="nav-links">


              {/* INICIO */}

              <button

                type="button"

                className="nav-link"

                onClick={() =>
                  cambiarPagina("home")
                }

              >

                <i className="fa-solid fa-house"></i>

                Inicio

              </button>


              {/* REPUESTOS */}

              <button

                type="button"

                className="nav-link"

                onClick={() =>
                  cambiarPagina("home")
                }

              >

                <i className="fa-solid fa-gears"></i>

                Repuestos

              </button>


              {/* CATEGORÍAS */}

              <button

                type="button"

                className="nav-link"

                onClick={() =>
                  cambiarPagina("home")
                }

              >

                <i className="fa-solid fa-layer-group"></i>

                Categorías

              </button>


              {/* NOSOTROS */}

              <button

                type="button"

                className="nav-link"

                onClick={() =>
                  cambiarPagina("home")
                }

              >

                <i className="fa-solid fa-building"></i>

                Nosotros

              </button>

            </div>

          )}

        </div>

      </nav>

    </>
  );
}


export default Header;
