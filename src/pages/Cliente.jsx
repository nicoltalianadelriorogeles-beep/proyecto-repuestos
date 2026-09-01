function Cliente({
  usuarioActual,
  productos,
  busqueda,
  seccion,
  cambiarSeccion,
  agregarAlCarrito,
  cerrarSesion
}) {

  const nombreCompleto = [
    usuarioActual?.primerNombre,
    usuarioActual?.segundoNombre,
    usuarioActual?.primerApellido,
    usuarioActual?.segundoApellido
  ]
    .filter(Boolean)
    .join(" ");


  const textoBusqueda =
    (busqueda || "")
      .trim()
      .toLowerCase();


  const productosFiltrados =
    productos.filter((producto) => {

      const texto =
        `${producto.nombre}
        ${producto.categoria}
        ${producto.descripcion}`
          .toLowerCase();

      return texto.includes(
        textoBusqueda
      );

    });


  /* ====================================
     INICIO
  ==================================== */

  const vistaInicio = () => (

    <section className="cliente-section cliente-home">

      <div className="container py-5">

        <div className="row align-items-center g-5">


          <div className="col-lg-7">

            <span className="cliente-label">

              ÁREA DEL CLIENTE

            </span>


            <h1 className="cliente-title">

              Hola,{" "}

              <span>
                {usuarioActual?.primerNombre}
              </span>

            </h1>


            <p className="cliente-subtitle">

              Bienvenido a tu espacio de
              Producciones Angel.

            </p>


            <p className="text-secondary">

              Desde aquí puedes consultar nuestros
              repuestos, revisar tus categorías
              y administrar tu información personal.

            </p>


            <div className="d-flex gap-3 mt-4 flex-wrap">

              <button
                type="button"
                className="btn btn-warning fw-bold"
                onClick={() =>
                  cambiarSeccion("repuestos")
                }
              >

                <i className="fa-solid fa-box-open me-2"></i>

                Ver repuestos

              </button>


              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() =>
                  cambiarSeccion("perfil")
                }
              >

                <i className="fa-solid fa-user me-2"></i>

                Mi perfil

              </button>

            </div>

          </div>


          <div className="col-lg-5">

            <div className="cliente-hero-card">

              <div className="cliente-big-icon">

                <i className="fa-solid fa-house-user"></i>

              </div>


              <h4>
                Tu espacio personal
              </h4>


              <p>

                Consulta productos y administra
                tus datos desde un solo lugar.

              </p>

            </div>

          </div>

        </div>

      </div>

    </section>

  );


  /* ====================================
     REPUESTOS
  ==================================== */

  const vistaRepuestos = () => (

    <section className="cliente-section">

      <div className="container py-5">


        <div className="section-heading">

          <span className="cliente-label">
            CATÁLOGO
          </span>


          <h2>
            Nuestros repuestos
          </h2>


          <p>
            Encuentra el repuesto que necesitas.
          </p>

        </div>


        <div className="row g-4">

          {productosFiltrados.length > 0 ? (

            productosFiltrados.map(
              (producto) => (

                <div
                  className="col-md-6 col-lg-3"
                  key={producto.id}
                >

                  <div className="card cliente-product-card h-100">


                    <div className="cliente-product-icon">

                      <i
                        className={`fa-solid ${producto.icon}`}
                      ></i>


                      {producto.estado && (

                        <span className="badge bg-warning text-dark">

                          {producto.estado}

                        </span>

                      )}

                    </div>


                    <div className="card-body d-flex flex-column">

                      <small className="text-warning fw-bold">

                        {producto.categoria}

                      </small>


                      <h5 className="fw-bold text-primary mt-2">

                        {producto.nombre}

                      </h5>


                      <p className="text-secondary small flex-grow-1">

                        {producto.descripcion}

                      </p>


                      <div className="d-flex justify-content-between align-items-center mt-3">

                        <strong className="text-primary fs-5">

                          ${producto.precio}

                        </strong>


                        <button
                          type="button"
                          className="btn btn-warning"
                          onClick={() =>
                            agregarAlCarrito(
                              producto
                            )
                          }
                        >

                          <i className="fa-solid fa-cart-plus me-1"></i>

                          Agregar

                        </button>

                      </div>

                    </div>

                  </div>

                </div>

              )
            )

          ) : (

            <div className="col-12">

              <div className="cliente-empty text-center">

                <i className="fa-solid fa-box-open fa-4x text-secondary mb-3"></i>

                <h4 className="fw-bold text-primary">

                  No encontramos productos

                </h4>

                <p className="text-secondary">

                  Prueba con otra búsqueda.

                </p>

              </div>

            </div>

          )}

        </div>

      </div>

    </section>

  );


  /* ====================================
     CATEGORÍAS
  ==================================== */

  const vistaCategorias = () => (

    <section className="cliente-section">

      <div className="container py-5">


        <div className="section-heading">

          <span className="cliente-label">
            CATEGORÍAS
          </span>


          <h2>
            Repuestos por categoría
          </h2>


          <p>
            Selecciona el tipo de electrodoméstico.
          </p>

        </div>


        <div className="row g-4">


          <div className="col-md-6">

            <div className="cliente-category-large">

              <div className="cliente-category-icon blue">

                <i className="fa-solid fa-soap"></i>

              </div>


              <div>

                <h3>
                  Lavadoras
                </h3>


                <p>
                  Bombas, correas, motores,
                  filtros y electroválvulas.
                </p>


                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() =>
                    cambiarSeccion("repuestos")
                  }
                >

                  Ver repuestos

                  <i className="fa-solid fa-arrow-right ms-2"></i>

                </button>

              </div>

            </div>

          </div>


          <div className="col-md-6">

            <div className="cliente-category-large orange">

              <div className="cliente-category-icon orange">

                <i className="fa-solid fa-broom"></i>

              </div>


              <div>

                <h3>
                  Aspiradoras
                </h3>


                <p>
                  Filtros, mangueras,
                  motores y accesorios.
                </p>


                <button
                  type="button"
                  className="btn btn-outline-warning"
                  onClick={() =>
                    cambiarSeccion("repuestos")
                  }
                >

                  Ver repuestos

                  <i className="fa-solid fa-arrow-right ms-2"></i>

                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  );


  /* ====================================
     PERFIL
  ==================================== */

  const vistaPerfil = () => (

    <section className="cliente-section">

      <div className="container py-5">


        <div className="section-heading">

          <span className="cliente-label">
            MI CUENTA
          </span>


          <h2>
            Mi perfil
          </h2>


          <p>
            Consulta la información de tu cuenta.
          </p>

        </div>


        <div className="row justify-content-center">

          <div className="col-lg-8">

            <div className="cliente-profile-card">


              <div className="cliente-profile-header">

                <div className="cliente-profile-avatar">

                  <i className="fa-solid fa-user"></i>

                </div>


                <div>

                  <h4>
                    {nombreCompleto}
                  </h4>

                  <span>
                    Cliente
                  </span>

                </div>

              </div>


              <div className="cliente-profile-body">


                <div className="row g-3">


                  <div className="col-md-6">

                    <div className="profile-field">

                      <small>
                        Tipo de documento
                      </small>

                      <strong>
                        {usuarioActual?.tipoDocumento}
                      </strong>

                    </div>

                  </div>


                  <div className="col-md-6">

                    <div className="profile-field">

                      <small>
                        Número de documento
                      </small>

                      <strong>
                        {usuarioActual?.numeroDocumento}
                      </strong>

                    </div>

                  </div>


                  <div className="col-md-6">

                    <div className="profile-field">

                      <small>
                        Primer nombre
                      </small>

                      <strong>
                        {usuarioActual?.primerNombre}
                      </strong>

                    </div>

                  </div>


                  <div className="col-md-6">

                    <div className="profile-field">

                      <small>
                        Segundo nombre
                      </small>

                      <strong>
                        {usuarioActual?.segundoNombre || "No registrado"}
                      </strong>

                    </div>

                  </div>


                  <div className="col-md-6">

                    <div className="profile-field">

                      <small>
                        Primer apellido
                      </small>

                      <strong>
                        {usuarioActual?.primerApellido}
                      </strong>

                    </div>

                  </div>


                  <div className="col-md-6">

                    <div className="profile-field">

                      <small>
                        Segundo apellido
                      </small>

                      <strong>
                        {usuarioActual?.segundoApellido || "No registrado"}
                      </strong>

                    </div>

                  </div>


                  <div className="col-12">

                    <div className="profile-field">

                      <small>
                        Dirección
                      </small>

                      <strong>
                        {usuarioActual?.direccion}
                      </strong>

                    </div>

                  </div>


                  <div className="col-md-6">

                    <div className="profile-field">

                      <small>
                        Correo
                      </small>

                      <strong>
                        {usuarioActual?.correo}
                      </strong>

                    </div>

                  </div>


                  <div className="col-md-6">

                    <div className="profile-field">

                      <small>
                        Teléfono
                      </small>

                      <strong>
                        {usuarioActual?.telefono}
                      </strong>

                    </div>

                  </div>

                </div>

              </div>


              <div className="cliente-profile-footer">

                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={cerrarSesion}
                >

                  <i className="fa-solid fa-right-from-bracket me-2"></i>

                  Cerrar sesión

                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  );


  /* ====================================
     SELECCIONAR VISTA
  ==================================== */

  let contenido;


  switch (seccion) {

    case "repuestos":
      contenido = vistaRepuestos();
      break;

    case "categorias":
      contenido = vistaCategorias();
      break;

    case "perfil":
      contenido = vistaPerfil();
      break;

    case "inicio":
    default:
      contenido = vistaInicio();
      break;

  }


  return (
    <main className="cliente-page">

      {contenido}

    </main>
  );
}

export default Cliente;