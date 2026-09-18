
function Login() {
  return (
    <main className="auth-page">

      <div className="container">

        <div className="row justify-content-center align-items-center min-vh-100">

          <div className="col-md-7 col-lg-5">

            <div className="card auth-card border-0">

              <div className="card-body p-4 p-md-5">

                {/* =================================
                    TITULO
                ================================= */}

                <div className="text-center mb-4">

                  <div className="auth-icon">
                    <i className="fa-solid fa-right-to-bracket"></i>
                  </div>

                  <h2 className="fw-bold text-primary">
                    Iniciar sesión
                  </h2>

                  <p className="text-secondary">
                    Ingresa a Producciones Angel.
                  </p>

                </div>


                {/* =================================
                    FORMULARIO
                ================================= */}

                <form>

                  {/* CORREO */}

                  <div className="mb-3">

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
                        required
                      />

                    </div>

                  </div>


                  {/* CONTRASEÑA */}

                  <div className="mb-3">

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
                        placeholder="Ingresa tu contraseña"
                        required
                      />

                    </div>

                  </div>


                  {/* RECUPERAR CONTRASEÑA */}

                  <div className="text-end mb-3">

                    <button
                      type="button"
                      className="auth-recovery-link"
                    >

                      <i className="fa-solid fa-lock-open me-2"></i>

                      ¿Olvidaste tu contraseña?

                    </button>

                  </div>


                  {/* BOTON INICIAR SESION */}

                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-3 fw-bold"
                  >

                    <i className="fa-solid fa-right-to-bracket me-2"></i>

                    Iniciar sesión

                  </button>

                </form>


                {/* =================================
                    REGISTRO
                ================================= */}

                <div className="text-center mt-4">

                  <p className="text-secondary mb-2">
                    ¿No tienes una cuenta?
                  </p>

                  <button
                    type="button"
                    className="btn btn-outline-warning fw-bold"
                  >

                    <i className="fa-solid fa-user-plus me-2"></i>

                    Crear cuenta

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

export default Login;
