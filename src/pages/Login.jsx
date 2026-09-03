import { useState } from "react";

function Login({ formulario, setFormulario, iniciarSesion, irRegistro, recuperarPassword }) {
  const [modoRecuperacion, setModoRecuperacion] = useState(false);
  const [correoRecuperacion, setCorreoRecuperacion] = useState("");

  const manejarCambio = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    iniciarSesion();
  };

  const solicitarRecuperacion = (e) => {
    e.preventDefault();
    recuperarPassword(correoRecuperacion);
  };

  return (
    <main className="auth-page">
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-md-7 col-lg-5">
            <div className="card auth-card border-0">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <div className="auth-icon">
                    <i className={`fa-solid ${modoRecuperacion ? "fa-lock-open" : "fa-right-to-bracket"}`}></i>
                  </div>
                  <h2 className="fw-bold text-primary">
                    {modoRecuperacion ? "Recuperar contraseña" : "Iniciar sesión"}
                  </h2>
                  <p className="text-secondary">
                    {modoRecuperacion ? "Escribe tu correo registrado para recuperar el acceso." : "Ingresa a Producciones Angel."}
                  </p>
                </div>

                {modoRecuperacion ? (
                  <form onSubmit={solicitarRecuperacion}>
                    <label className="form-label fw-bold">Correo electrónico</label>
                    <input type="email" className="form-control mb-3" value={correoRecuperacion} onChange={(e) => setCorreoRecuperacion(e.target.value)} placeholder="correo@ejemplo.com" required />
                    <button type="submit" className="btn btn-primary w-100">
                      <i className="fa-solid fa-paper-plane me-2"></i>Enviar recuperación
                    </button>
                    <button type="button" className="btn btn-link w-100 mt-2" onClick={() => setModoRecuperacion(false)}>
                      Volver a iniciar sesión
                    </button>
                  </form>
                ) : (
                  <form onSubmit={manejarSubmit}>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Correo electrónico</label>
                      <input type="email" name="correo" className="form-control" value={formulario.correo} onChange={manejarCambio} required />
                    </div>
                    <div className="mb-2">
                      <label className="form-label fw-bold">Contraseña</label>
                      <input type="password" name="password" className="form-control" value={formulario.password} onChange={manejarCambio} required />
                    </div>
                    <button type="button" className="auth-recovery-link" onClick={() => setModoRecuperacion(true)}>
                      <i className="fa-solid fa-lock-open me-2"></i>¿Olvidaste tu contraseña?
                    </button>
                    <button type="submit" className="btn btn-primary w-100 mt-3">
                      <i className="fa-solid fa-right-to-bracket me-2"></i>Iniciar sesión
                    </button>
                  </form>
                )}

                <div className="text-center mt-4">
                  <p className="text-secondary">¿No tienes una cuenta?</p>
                  <button type="button" className="btn btn-outline-warning" onClick={irRegistro}>Crear cuenta</button>
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
