
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
    <main className="auth-page py-5">

      <div className="container">

        <div className="row justify-content-center">

          <div className="col-lg-10 col-xl-9">

            <div className="card border-0 shadow-lg auth-card">

              <div className="card-body p-4 p-md-5">

                {/* ENCABEZADO */}

                <div className="text-center mb-4">

                  <div className="auth-icon">

                    <i className="fa-solid fa-user-plus"></i>

                  </div>

                  <h2 className="fw-bold text-primary">
                    Crear cuenta
                  </h2>

                  <p className="text-secondary">
                    Regístrate en Producciones Angel
                  </p>

                </div>


                <form onSubmit={manejarSubmit}>

                  <div className="row g-3">


                    {/* TIPO DOCUMENTO */}

                    <div className="col-md-4">

                      <label className="form-label fw-bold">
                        Tipo de documento
                      </label>

                      <select
                        name="tipoDocumento"
                        className="form-select"
                        value={
                          formulario.tipoDocumento
                        }
                        onChange={manejarCambio}
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


                    {/* NÚMERO */}

                    <div className="col-md-8">

                      <label className="form-label fw-bold">
                        Número de documento
                      </label>

                      <div className="input-group">

                        <span className="input-group-text">
                          <i className="fa-solid fa-id-card"></i>
                        </span>

                        <input
                          type="text"
                          name="numeroDocumento"
                          className="form-control"
                          placeholder="Número de documento"
                          value={
                            formulario.numeroDocumento
                          }
                          onChange={manejarCambio}
                          required
                        />

                      </div>

                    </div>


                    {/* PRIMER NOMBRE */}

                    <div className="col-md-6">

                      <label className="form-label fw-bold">
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
                        onChange={manejarCambio}
                        required
                      />

                    </div>


                    {/* SEGUNDO NOMBRE */}

                    <div className="col-md-6">

                      <label className="form-label fw-bold">
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
                        onChange={manejarCambio}
                      />

                    </div>


                    {/* PRIMER APELLIDO */}

                    <div className="col-md-6">

                      <label className="form-label fw-bold">
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
                        onChange={manejarCambio}
                        required
                      />

                    </div>


                    {/* SEGUNDO APELLIDO */}

                    <div className="col-md-6">

                      <label className="form-label fw-bold">
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
                        onChange={manejarCambio}
                      />

                    </div>


                    {/* DIRECCIÓN */}

                    <div className="col-12">

                      <label className="form-label fw-bold">
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
                          onChange={manejarCambio}
                          required
                        />

                      </div>

                    </div>


                    {/* CORREO */}

                    <div className="col-md-7">

                      <label className="form-label fw-bold">
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
                          onChange={manejarCambio}
                          required
                        />

                      </div>

                    </div>


                    {/* TELÉFONO */}

                    <div className="col-md-5">

                      <label className="form-label fw-bold">
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
                          placeholder="300 000 0000"
                          value={
                            formulario.telefono
                          }
                          onChange={manejarCambio}
                          required
                        />

                      </div>

                    </div>


                    {/* CONTRASEÑA */}

                    <div className="col-md-6">

                      <label className="form-label fw-bold">
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
                          onChange={manejarCambio}
                          minLength="6"
                          required
                        />

                      </div>

                    </div>


                    {/* CONFIRMAR */}

                    <div className="col-md-6">

                      <label className="form-label fw-bold">
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
                          placeholder="Repite la contraseña"
                          value={
                            formulario.confirmarPassword
                          }
                          onChange={manejarCambio}
                          minLength="6"
                          required
                        />

                      </div>

                    </div>


                    {/* BOTÓN */}

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


                {/* VOLVER AL LOGIN */}

                <div className="text-center mt-4">

                  <p className="text-secondary mb-2">
                    ¿Ya tienes una cuenta?
                  </p>

                  <button
                    type="button"
                    className="btn btn-outline-primary fw-bold"
                    onClick={irLogin}
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
