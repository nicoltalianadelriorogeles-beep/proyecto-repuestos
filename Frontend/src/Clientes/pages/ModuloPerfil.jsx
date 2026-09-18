function ModuloPerfil() 
{
  return (
    <main className="cliente-page">

      {/* =================================
          PERFIL
      ================================= */}
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

                {/* ENCABEZADO DEL PERFIL */}
                <div className="cliente-profile-header">

                  <div className="cliente-profile-avatar">

                    <i className="fa-solid fa-user"></i>

                  </div>

                  <div>

                    <h4>
                      Cliente
                    </h4>

                    <span>
                      Cliente
                    </span>

                  </div>

                </div>


                {/* INFORMACIÓN DEL PERFIL */}
                <div className="cliente-profile-body">

                  <div className="row g-3">

                    {/* TIPO DE DOCUMENTO */}
                    <div className="col-md-6">

                      <div className="profile-field">

                        <small>
                          Tipo de documento
                        </small>

                        <strong>
                          Cédula
                        </strong>

                      </div>

                    </div>


                    {/* NÚMERO DE DOCUMENTO */}
                    <div className="col-md-6">

                      <div className="profile-field">

                        <small>
                          Número de documento
                        </small>

                        <strong>
                          0000000000
                        </strong>

                      </div>

                    </div>


                    {/* NOMBRE */}
                    <div className="col-md-6">

                      <div className="profile-field">

                        <small>
                          Nombre
                        </small>

                        <strong>
                          Cliente
                        </strong>

                      </div>

                    </div>


                    {/* APELLIDO */}
                    <div className="col-md-6">

                      <div className="profile-field">

                        <small>
                          Apellido
                        </small>

                        <strong>
                          Cliente
                        </strong>

                      </div>

                    </div>


                    {/* DIRECCIÓN */}
                    <div className="col-12">

                      <div className="profile-field">

                        <small>
                          Dirección
                        </small>

                        <strong>
                          Dirección del cliente
                        </strong>

                      </div>

                    </div>


                    {/* CORREO */}
                    <div className="col-md-6">

                      <div className="profile-field">

                        <small>
                          Correo
                        </small>

                        <strong>
                          cliente@correo.com
                        </strong>

                      </div>

                    </div>


                    {/* TELÉFONO */}
                    <div className="col-md-6">

                      <div className="profile-field">

                        <small>
                          Teléfono
                        </small>

                        <strong>
                          0000000000
                        </strong>

                      </div>

                    </div>

                  </div>

                </div>


                {/* PIE DEL PERFIL */}
                <div className="cliente-profile-footer">

                  <button
                    type="button"
                    className="btn btn-outline-danger"
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

    </main>
  );
}

export default ModuloPerfil;

