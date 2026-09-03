function Registro({
  formulario,
  setFormulario,
  registrarUsuario,
  irLogin
}) {

  const manejarCambio = (e) => {

    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });

  };


  const manejarSubmit = (e) => {

    e.preventDefault();

    registrarUsuario();

  };


  return (
   <main className="auth-page">

      <div className="container">

        <div className="row justify-content-center">

          <div className="col-lg-10 col-xl-9">

            <div className="card auth-card border-0">

              <div className="card-body p-4 p-md-5">


                {/* =================================
                    TITULO
                ================================= */}

                <div className="text-center mb-4">

                  <div className="auth-icon">

                    <i className="fa-solid fa-user-plus"></i>

                  </div>


                  <span className="cliente-label">
                    PRODUCCIONES ANGEL
                  </span>


                  <h2 className="fw-bold text-primary mt-2">

                    Crear cuenta

                  </h2>


                  <p className="text-secondary">

                    Regístrate para comprar
                    nuestros repuestos.

                  </p>

                </div>


                {/* =================================
                    FORMULARIO
                ================================= */}

                <form
                  onSubmit={
                    manejarSubmit
                  }
                >

                  <div className="row g-3">


                    {/* TIPO DOCUMENTO */}

                    <div className="col-md-4">

                      <label className="form-label">

                        Tipo de documento

                      </label>


                      <div className="input-group">

                        <span className="input-group-text">

                          <i className="fa-solid fa-id-card"></i>

                        </span>


                        <select
                          name="tipoDocumento"
                          className="form-select"
                          value={
                            formulario.tipoDocumento
                          }
                          onChange={
                            manejarCambio
                          }
                          required
                        >

                          <option value="">
                            Selecciona
                          </option>

                          <option value="CC">
                            Cédula de ciudadanía
                          </option>

                          <option value="TI">
                            Tarjeta de identidad
                          </option>

                          <option value="CE">
                            Cédula de extranjería
                          </option>

                          <option value="PP">
                            Pasaporte
                          </option>

                        </select>

                      </div>

                    </div>


                    {/* DOCUMENTO */}

                    <div className="col-md-8">

                      <label className="form-label">

                        Número de documento

                      </label>


                      <div className="input-group">

                        <span className="input-group-text">

                          <i className="fa-solid fa-hashtag"></i>

                        </span>


                        <input
                          type="text"
                          name="numeroDocumento"
                          className="form-control"
                          placeholder="Número de documento"
                          value={
                            formulario.numeroDocumento
                          }
                          onChange={
                            manejarCambio
                          }
                          required
                        />

                      </div>

                    </div>


                    {/* PRIMER NOMBRE */}

                    <div className="col-md-6">

                      <label className="form-label">

                        Primer nombre

                      </label>


                      <input
                        type="text"
                        name="primerNombre"
                        className="form-control"
                        placeholder="Primer nombre"
                        value={
                          formulario.primerNombre
                        }
                        onChange={
                          manejarCambio
                        }
                        required
                      />

                    </div>


                    {/* SEGUNDO NOMBRE */}

                    <div className="col-md-6">

                      <label className="form-label">

                        Segundo nombre

                      </label>


                      <input
                        type="text"
                        name="segundoNombre"
                        className="form-control"
                        placeholder="Segundo nombre"
                        value={
                          formulario.segundoNombre
                        }
                        onChange={
                          manejarCambio
                        }
                      />

                    </div>


                    {/* PRIMER APELLIDO */}

                    <div className="col-md-6">

                      <label className="form-label">

                        Primer apellido

                      </label>


                      <input
                        type="text"
                        name="primerApellido"
                        className="form-control"
                        placeholder="Primer apellido"
                        value={
                          formulario.primerApellido
                        }
                        onChange={
                          manejarCambio
                        }
                        required
                      />

                    </div>


                    {/* SEGUNDO APELLIDO */}

                    <div className="col-md-6">

                      <label className="form-label">

                        Segundo apellido

                      </label>


                      <input
                        type="text"
                        name="segundoApellido"
                        className="form-control"
                        placeholder="Segundo apellido"
                        value={
                          formulario.segundoApellido
                        }
                        onChange={
                          manejarCambio
                        }
                      />

                    </div>


                    {/* DIRECCION */}

                    <div className="col-12">

                      <label className="form-label">

                        Dirección

                      </label>


                      <div className="input-group">

                        <span className="input-group-text">

                          <i className="fa-solid fa-location-dot"></i>

                        </span>


                        <input
                          type="text"
                          name="direccion"
                          className="form-control"
                          placeholder="Dirección de residencia"
                          value={
                            formulario.direccion
                          }
                          onChange={
                            manejarCambio
                          }
                          required
                        />

                      </div>

                    </div>


                    {/* CORREO */}

                    <div className="col-md-7">

                      <label className="form-label">

                        Correo electrónico

                      </label>


                      <div className="input-group">

                        <span className="input-group-text">

                          <i className="fa-solid fa-envelope"></i>

                        </span>


                        <input
                          type="email"
                          name="correo"
                          className="form-control"
                          placeholder="correo@ejemplo.com"
                          value={
                            formulario.correo
                          }
                          onChange={
                            manejarCambio
                          }
                          required
                        />

                      </div>

                    </div>


                    {/* TELEFONO */}

                    <div className="col-md-5">

                      <label className="form-label">

                        Teléfono

                      </label>


                      <div className="input-group">

                        <span className="input-group-text">

                          <i className="fa-solid fa-phone"></i>

                        </span>


                        <input
                          type="tel"
                          name="telefono"
                          className="form-control"
                          placeholder="3000000000"
                          value={
                            formulario.telefono
                          }
                          onChange={
                            manejarCambio
                          }
                          required
                        />

                      </div>

                    </div>


                    {/* CONTRASEÑA */}

                    <div className="col-md-6">

                      <label className="form-label">

                        Contraseña

                      </label>


                      <div className="input-group">

                        <span className="input-group-text">

                          <i className="fa-solid fa-lock"></i>

                        </span>


                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          placeholder="Mínimo 6 caracteres"
                          value={
                            formulario.password
                          }
                          onChange={
                            manejarCambio
                          }
                          minLength="6"
                          required
                        />

                      </div>

                    </div>


                    {/* CONFIRMAR */}

                    <div className="col-md-6">

                      <label className="form-label">

                        Confirmar contraseña

                      </label>


                      <div className="input-group">

                        <span className="input-group-text">

                          <i className="fa-solid fa-lock"></i>

                        </span>


                        <input
                          type="password"
                          name="confirmarPassword"
                          className="form-control"
                          placeholder="Repite tu contraseña"
                          value={
                            formulario.confirmarPassword
                          }
                          onChange={
                            manejarCambio
                          }
                          minLength="6"
                          required
                        />

                      </div>

                    </div>


                    {/* INFORMACION */}

                    <div className="col-12">

                      <div className="alert alert-info d-flex align-items-center gap-2 mb-0">

                        <i className="fa-solid fa-circle-info"></i>

                        <small>

                          Tu cuenta se registrará
                          como cliente.

                        </small>

                      </div>

                    </div>


                    {/* BOTON */}

                    <div className="col-12 mt-4">

                      <button
                        type="submit"
                        className="btn btn-warning w-100 py-3 fw-bold"
                      >

                        <i className="fa-solid fa-user-plus me-2"></i>

                        Crear mi cuenta

                      </button>

                    </div>

                  </div>

                </form>


                {/* VOLVER LOGIN */}

                <div className="text-center mt-4">

                  <p className="text-secondary mb-2">

                    ¿Ya tienes una cuenta?

                  </p>


                  <button
                    type="button"
                    className="btn btn-outline-primary fw-bold"
                    onClick={
                      irLogin
                    }
                  >

                    <i className="fa-solid fa-right-to-bracket me-2"></i>

                    Iniciar sesión

                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}

export default Registro;