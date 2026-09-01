function Login({
  formulario,
  setFormulario,
  iniciarSesion,
  irRegistro
}) {

  const manejarCambio = (e) => {

    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });

  };


  const manejarSubmit = (e) => {

    e.preventDefault();

    iniciarSesion();

  };


  return (
    <main className="auth-page">

      <div className="container">

        <div className="row justify-content-center align-items-center min-vh-100">

          <div className="col-md-7 col-lg-5">

            <div className="card border-0 shadow-lg auth-card">

              <div className="card-body p-4 p-md-5">

                <div className="text-center mb-4">

                  <div className="auth-icon">
                    <i className="fa-solid fa-right-to-bracket"></i>
                  </div>

                  <h2 className="fw-bold text-primary">
                    Iniciar sesión
                  </h2>

                  <p className="text-secondary">
                    Ingresa a Producciones Angel
                  </p>

                </div>


                <form onSubmit={manejarSubmit}>

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
                        value={formulario.correo}
                        onChange={manejarCambio}
                        required
                      />

                    </div>

                  </div>


                  <div className="mb-4">

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
                        placeholder="********"
                        value={formulario.password}
                        onChange={manejarCambio}
                        required
                      />

                    </div>

                  </div>


                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2 fw-bold"
                  >

                    <i className="fa-solid fa-right-to-bracket me-2"></i>

                    Iniciar sesión

                  </button>

                </form>


                <div className="text-center mt-4">

                  <p className="text-secondary mb-2">
                    ¿No tienes una cuenta?
                  </p>

                  <button
                    type="button"
                    className="btn btn-outline-warning fw-bold"
                    onClick={irRegistro}
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