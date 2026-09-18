
function InfoModal({
  abierto,
  cerrar,
  tipo,
  usuarioActual,
  productos
}) {


  // ==========================================
  // SI EL MODAL ESTÁ CERRADO
  // ==========================================

  if (!abierto) {
    return null;
  }


  // ==========================================
  // NOMBRE COMPLETO
  // ==========================================

  const nombreCompleto = [

    usuarioActual?.primerNombre,

    usuarioActual?.segundoNombre,

    usuarioActual?.primerApellido,

    usuarioActual?.segundoApellido

  ]
    .filter(Boolean)
    .join(" ");


  return (
    <>


      {/* ======================================
          FONDO OSCURO
      ====================================== */}

      <div

        className="section-modal-backdrop"

        onClick={cerrar}

      ></div>


      {/* ======================================
          CONTENEDOR
      ====================================== */}

      <div

        className="section-modal-container"

        role="dialog"

        aria-modal="true"

      >

        <div className="section-modal">


          {/* ==================================
              HEADER DEL MODAL
          ================================== */}

          <div className="section-modal-header">


            <div className="d-flex align-items-center gap-3">


              {/* ICONO */}

              <div className="section-modal-icon">


                {tipo === "inicio" && (

                  <i className="fa-solid fa-house"></i>

                )}


                {tipo === "repuestos" && (

                  <i className="fa-solid fa-box-open"></i>

                )}


                {tipo === "categorias" && (

                  <i className="fa-solid fa-layer-group"></i>

                )}


                {tipo === "perfil" && (

                  <i className="fa-solid fa-user"></i>

                )}

              </div>


              {/* TÍTULO */}

              <div>

                <small className="section-modal-label">

                  PRODUCCIONES ANGEL

                </small>


                <h3 className="mb-0 fw-bold text-primary">


                  {tipo === "inicio" &&
                    "Inicio"}


                  {tipo === "repuestos" &&
                    "Nuestros repuestos"}


                  {tipo === "categorias" &&
                    "Categorías"}


                  {tipo === "perfil" &&
                    "Mi perfil"}


                </h3>

              </div>

            </div>


            {/* BOTÓN X */}

            <button

              type="button"

              className="section-modal-close"

              onClick={cerrar}

              aria-label="Cerrar"

            >

              <i className="fa-solid fa-xmark"></i>

            </button>

          </div>


          {/* ==================================
              CUERPO
          ================================== */}

          <div className="section-modal-body">


            {/* ==================================
                INICIO
            ================================== */}

            {tipo === "inicio" && (

              <div className="modal-home-content">


                <div className="modal-home-icon">

                  <i className="fa-solid fa-screwdriver-wrench"></i>

                </div>


                <h4 className="fw-bold text-primary">

                  Bienvenido a Producciones Angel

                </h4>


                <p className="text-secondary">

                  Encuentra repuestos y accesorios
                  para lavadoras y aspiradoras.

                </p>


                <div className="row g-3 mt-3">


                  {/* ENVÍOS */}

                  <div className="col-md-6">

                    <div className="modal-feature">

                      <i className="fa-solid fa-truck-fast"></i>


                      <div>

                        <strong>
                          Envíos
                        </strong>

                        <small>
                          Envíos a todo Colombia.
                        </small>

                      </div>

                    </div>

                  </div>


                  {/* ATENCIÓN */}

                  <div className="col-md-6">

                    <div className="modal-feature">

                      <i className="fa-solid fa-headset"></i>


                      <div>

                        <strong>
                          Atención
                        </strong>

                        <small>
                          Soporte personalizado.
                        </small>

                      </div>

                    </div>

                  </div>

                </div>


                <button

                  type="button"

                  className="btn btn-warning mt-4"

                  onClick={cerrar}

                >

                  <i className="fa-solid fa-check me-2"></i>

                  Entendido

                </button>

              </div>

            )}


            {/* ==================================
                REPUESTOS
            ================================== */}

            {tipo === "repuestos" && (

              <div>

                <p className="text-secondary mb-4">

                  Consulta algunos de los repuestos
                  disponibles en nuestra tienda.

                </p>


                <div className="row g-3">


                  {productos.map(
                    (producto) => (

                      <div

                        className="col-md-6"

                        key={producto.id}

                      >

                        <div className="modal-product">


                          {/* ICONO */}

                          <div className="modal-product-icon">

                            <i

                              className={`fa-solid ${producto.icon}`}

                            ></i>

                          </div>


                          {/* INFORMACIÓN */}

                          <div className="flex-grow-1">


                            <small className="text-warning fw-bold">

                              {producto.categoria}

                            </small>


                            <h6 className="fw-bold text-primary mb-1">

                              {producto.nombre}

                            </h6>


                            <span className="text-secondary small">

                              {producto.descripcion}

                            </span>

                          </div>


                          {/* PRECIO */}

                          <strong className="text-primary">

                            ${producto.precio}

                          </strong>

                        </div>

                      </div>

                    )
                  )}

                </div>

              </div>

            )}


            {/* ==================================
                CATEGORÍAS
            ================================== */}

            {tipo === "categorias" && (

              <div>


                <p className="text-secondary mb-4">

                  Selecciona la categoría de
                  electrodoméstico que necesitas.

                </p>


                <div className="row g-4">


                  {/* LAVADORAS */}

                  <div className="col-md-6">

                    <div className="modal-category blue">


                      <div className="modal-category-icon">

                        <i className="fa-solid fa-soap"></i>

                      </div>


                      <div>

                        <h5 className="fw-bold text-primary">

                          Lavadoras

                        </h5>


                        <p className="text-secondary mb-0">

                          Bombas, correas, motores,
                          filtros y electroválvulas.

                        </p>

                      </div>

                    </div>

                  </div>


                  {/* ASPIRADORAS */}

                  <div className="col-md-6">

                    <div className="modal-category orange">


                      <div className="modal-category-icon">

                        <i className="fa-solid fa-broom"></i>

                      </div>


                      <div>

                        <h5 className="fw-bold text-primary">

                          Aspiradoras

                        </h5>


                        <p className="text-secondary mb-0">

                          Filtros, mangueras,
                          motores y accesorios.

                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            )}


            {/* ==================================
                PERFIL
            ================================== */}

            {tipo === "perfil" &&
              usuarioActual && (

              <div>


                {/* USUARIO */}

                <div className="profile-modal-user">


                  <div className="profile-modal-avatar">

                    <i className="fa-solid fa-user"></i>

                  </div>


                  <div>

                    <h5 className="fw-bold text-primary mb-1">

                      {nombreCompleto}

                    </h5>


                    <small className="text-secondary">

                      Cliente de Producciones Angel

                    </small>

                  </div>

                </div>


                {/* DATOS */}

                <div className="row g-3 mt-3">


                  {/* TIPO DOCUMENTO */}

                  <div className="col-md-6">

                    <div className="modal-profile-data">

                      <small>
                        Tipo de documento
                      </small>

                      <strong>

                        {usuarioActual.tipoDocumento}

                      </strong>

                    </div>

                  </div>


                  {/* DOCUMENTO */}

                  <div className="col-md-6">

                    <div className="modal-profile-data">

                      <small>
                        Número de documento
                      </small>

                      <strong>

                        {usuarioActual.numeroDocumento}

                      </strong>

                    </div>

                  </div>


                  {/* TELÉFONO */}

                  <div className="col-md-6">

                    <div className="modal-profile-data">

                      <small>
                        Teléfono
                      </small>

                      <strong>

                        {usuarioActual.telefono}

                      </strong>

                    </div>

                  </div>


                  {/* CORREO */}

                  <div className="col-md-6">

                    <div className="modal-profile-data">

                      <small>
                        Correo
                      </small>

                      <strong>

                        {usuarioActual.correo}

                      </strong>

                    </div>

                  </div>


                  {/* DIRECCIÓN */}

                  <div className="col-12">

                    <div className="modal-profile-data">

                      <small>
                        Dirección
                      </small>

                      <strong>

                        {usuarioActual.direccion}

                      </strong>

                    </div>

                  </div>

                </div>

              </div>

            )}

          </div>


          {/* ==================================
              FOOTER
          ================================== */}

          <div className="section-modal-footer">

            <button

              type="button"

              className="btn btn-outline-secondary"

              onClick={cerrar}

            >

              Cerrar

            </button>

          </div>

        </div>

      </div>

    </>
  );
}


export default InfoModal;
