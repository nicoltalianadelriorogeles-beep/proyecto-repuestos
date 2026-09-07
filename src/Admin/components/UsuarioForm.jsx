import "../styles/FormularioUsuario.css";
function UserForm({
  formulario,
  editando,
  manejarCambio,
  guardarUsuario,
  limpiarFormulario
}) {
  return (
    <div className="user-form-wrapper">

      <div className="card admin-card user-form-card">

        <div className="card-header admin-card-header">

          <div className="d-flex align-items-center">

            <div className="admin-header-icon">
              <i
                className={`fa-solid ${
                  editando
                    ? "fa-user-pen"
                    : "fa-user-plus"
                }`}
              ></i>
            </div>

            <div>
              <h5 className="mb-0">
                {editando
                  ? "Editar usuario"
                  : "Registrar usuario"}
              </h5>

              <small className="text-secondary">
                {editando
                  ? "Modifica la información del usuario."
                  : "Completa la información para registrar un usuario."}
              </small>
            </div>

          </div>

        </div>

        <div className="card-body p-4">

          <form onSubmit={guardarUsuario}>

            <div className="row g-3">

              <div className="col-md-4">

                <label className="form-label">
                  Tipo de documento
                </label>

                <select
                  name="tipoDocumento"
                  className="form-select"
                  value={formulario.tipoDocumento}
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

              <div className="col-md-8">

                <label className="form-label">
                  Número de documento
                </label>

                <input
                  type="text"
                  name="numeroDocumento"
                  className="form-control"
                  value={formulario.numeroDocumento}
                  onChange={manejarCambio}
                  required
                />

              </div>

              <div className="col-md-6">

                <label className="form-label">
                  Primer nombre
                </label>

                <input
                  type="text"
                  name="primerNombre"
                  className="form-control"
                  value={formulario.primerNombre}
                  onChange={manejarCambio}
                  required
                />

              </div>

              <div className="col-md-6">

                <label className="form-label">
                  Segundo nombre
                </label>

                <input
                  type="text"
                  name="segundoNombre"
                  className="form-control"
                  value={formulario.segundoNombre}
                  onChange={manejarCambio}
                />

              </div>

              <div className="col-md-6">

                <label className="form-label">
                  Primer apellido
                </label>

                <input
                  type="text"
                  name="primerApellido"
                  className="form-control"
                  value={formulario.primerApellido}
                  onChange={manejarCambio}
                  required
                />

              </div>

              <div className="col-md-6">

                <label className="form-label">
                  Segundo apellido
                </label>

                <input
                  type="text"
                  name="segundoApellido"
                  className="form-control"
                  value={formulario.segundoApellido}
                  onChange={manejarCambio}
                />

              </div>

              <div className="col-12">

                <label className="form-label">
                  Dirección
                </label>

                <input
                  type="text"
                  name="direccion"
                  className="form-control"
                  value={formulario.direccion}
                  onChange={manejarCambio}
                  required
                />

              </div>

              <div className="col-md-6">

                <label className="form-label">
                  Correo electrónico
                </label>

                <input
                  type="email"
                  name="correo"
                  className="form-control"
                  value={formulario.correo}
                  onChange={manejarCambio}
                  required
                />

              </div>

              <div className="col-md-6">

                <label className="form-label">
                  Teléfono
                </label>

                <input
                  type="tel"
                  name="telefono"
                  className="form-control"
                  value={formulario.telefono}
                  onChange={manejarCambio}
                  required
                />

              </div>

              <div className="col-md-6">

                <label className="form-label">
                  Contraseña
                </label>

                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder={
                    editando
                      ? "Dejar vacío para conservar"
                      : "Contraseña"
                  }
                  value={formulario.password}
                  onChange={manejarCambio}
                  minLength="6"
                  required={!editando}
                />

              </div>

              <div className="col-md-6">

                <label className="form-label">
                  Rol
                </label>

                <select
                  name="rol"
                  className="form-select"
                  value={formulario.rol}
                  onChange={manejarCambio}
                >
                  <option value="CLIENTE">
                    Cliente
                  </option>

                  <option value="ADMIN">
                    Administrador
                  </option>
                </select>

              </div>

              <div className="col-12 d-flex gap-2">

                <button
                  type="submit"
                  className="btn btn-warning admin-main-button"
                >
                  <i
                    className={`fa-solid ${
                      editando
                        ? "fa-floppy-disk"
                        : "fa-user-plus"
                    } me-2`}
                  ></i>

                  {editando
                    ? "Guardar cambios"
                    : "Crear usuario"}
                </button>

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={limpiarFormulario}
                >
                  Cancelar
                </button>

              </div>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default UserForm;