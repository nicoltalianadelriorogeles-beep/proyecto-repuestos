import { useState } from "react";

function UserCrud({
  usuarios,
  usuarioActual,
  agregarUsuario,
  editarUsuario,
  eliminarUsuario
}) {

  const formularioInicial = {
    tipoDocumento: "",
    numeroDocumento: "",
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    direccion: "",
    correo: "",
    password: "",
    telefono: "",
    rol: "CLIENTE"
  };


  const [formulario, setFormulario] =
    useState(formularioInicial);


  const [editando, setEditando] =
    useState(null);


  const manejarCambio = (e) => {

    setFormulario({
      ...formulario,
      [e.target.name]:
        e.target.value
    });

  };


  const limpiarFormulario = () => {

    setFormulario(
      formularioInicial
    );

    setEditando(null);

  };


  const guardarUsuario = (e) => {

    e.preventDefault();


    if (
      !formulario.tipoDocumento ||
      !formulario.numeroDocumento ||
      !formulario.primerNombre ||
      !formulario.primerApellido ||
      !formulario.direccion ||
      !formulario.correo ||
      !formulario.telefono
    ) {

      alert(
        "Completa los campos obligatorios."
      );

      return;

    }


    if (
      !editando &&
      !formulario.password
    ) {

      alert(
        "La contraseña es obligatoria."
      );

      return;

    }


    if (
      formulario.password &&
      formulario.password.length < 6
    ) {

      alert(
        "La contraseña debe tener mínimo 6 caracteres."
      );

      return;

    }


    const correoExiste =
      usuarios.some(
        (usuario) =>
          usuario.correo.toLowerCase() ===
            formulario.correo.toLowerCase() &&
          usuario.id !== editando
      );


    if (correoExiste) {

      alert(
        "Ese correo ya está registrado."
      );

      return;

    }


    const documentoExiste =
      usuarios.some(
        (usuario) =>
          usuario.numeroDocumento ===
            formulario.numeroDocumento &&
          usuario.id !== editando
      );


    if (documentoExiste) {

      alert(
        "Ese documento ya está registrado."
      );

      return;

    }


    if (editando) {

      const usuarioAnterior =
        usuarios.find(
          (usuario) =>
            usuario.id === editando
        );


      editarUsuario({

        ...usuarioAnterior,

        ...formulario,

        password:
          formulario.password ||
          usuarioAnterior.password

      });


      alert(
        "Usuario actualizado correctamente."
      );

    } else {

      agregarUsuario({

        ...formulario,

        id: Date.now()

      });


      alert(
        "Usuario creado correctamente."
      );

    }


    limpiarFormulario();

  };


  const cargarUsuario = (
    usuario
  ) => {

    setFormulario({

      tipoDocumento:
        usuario.tipoDocumento || "",

      numeroDocumento:
        usuario.numeroDocumento || "",

      primerNombre:
        usuario.primerNombre || "",

      segundoNombre:
        usuario.segundoNombre || "",

      primerApellido:
        usuario.primerApellido || "",

      segundoApellido:
        usuario.segundoApellido || "",

      direccion:
        usuario.direccion || "",

      correo:
        usuario.correo || "",

      password: "",

      telefono:
        usuario.telefono || "",

      rol:
        usuario.rol || "CLIENTE"

    });


    setEditando(
      usuario.id
    );


    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };


  const eliminar = (
    id
  ) => {

    if (
      id === usuarioActual.id
    ) {

      alert(
        "No puedes eliminar tu propia cuenta."
      );

      return;

    }


    const confirmar =
      window.confirm(
        "¿Seguro que deseas eliminar este usuario?"
      );


    if (confirmar) {

      eliminarUsuario(id);

    }

  };


  return (
    <section className="user-crud-section">
      {/* FORMULARIO */}

      <div className="card admin-card mb-4">

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

            </div>

          </div>

        </div>


        <div className="card-body p-4">

          <form
            onSubmit={
              guardarUsuario
            }
          >

            <div className="row g-3">


              <div className="col-md-4">

                <label className="form-label">
                  Tipo de documento
                </label>


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


              <div className="col-md-8">

                <label className="form-label">
                  Número de documento
                </label>


                <input
                  type="text"
                  name="numeroDocumento"
                  className="form-control"
                  value={
                    formulario.numeroDocumento
                  }
                  onChange={
                    manejarCambio
                  }
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
                  value={
                    formulario.primerNombre
                  }
                  onChange={
                    manejarCambio
                  }
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
                  value={
                    formulario.segundoNombre
                  }
                  onChange={
                    manejarCambio
                  }
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
                  value={
                    formulario.primerApellido
                  }
                  onChange={
                    manejarCambio
                  }
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
                  value={
                    formulario.segundoApellido
                  }
                  onChange={
                    manejarCambio
                  }
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
                  value={
                    formulario.direccion
                  }
                  onChange={
                    manejarCambio
                  }
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
                  value={
                    formulario.correo
                  }
                  onChange={
                    manejarCambio
                  }
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
                  value={
                    formulario.telefono
                  }
                  onChange={
                    manejarCambio
                  }
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
                  value={
                    formulario.password
                  }
                  onChange={
                    manejarCambio
                  }
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
                  value={
                    formulario.rol
                  }
                  onChange={
                    manejarCambio
                  }
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


                {editando && (

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={
                      limpiarFormulario
                    }
                  >

                    Cancelar

                  </button>

                )}

              </div>

            </div>

          </form>

        </div>

      </div>


      {/* TABLA */}

      <div className="card admin-card">

        <div className="card-header bg-white">

          <h5 className="text-primary fw-bold mb-0">

            <i className="fa-solid fa-users me-2"></i>

            Usuarios registrados

          </h5>

        </div>


        <div className="table-responsive">

          <table className="table table-hover align-middle mb-0">

            <thead className="table-primary">

              <tr>

                <th>Usuario</th>
                <th>Documento</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Rol</th>
                <th>Acciones</th>

              </tr>

            </thead>


            <tbody>

              {usuarios.map(
                (usuario) => (

                  <tr
                    key={
                      usuario.id
                    }
                  >

                    <td>

                      <div className="d-flex align-items-center gap-2">

                        <div className="admin-user-icon">

                          <i className="fa-solid fa-user"></i>

                        </div>


                        <strong>

                          {usuario.primerNombre}{" "}
                          {usuario.primerApellido}

                        </strong>

                      </div>

                    </td>


                    <td>

                      {usuario.tipoDocumento}{" "}
                      {usuario.numeroDocumento}

                    </td>


                    <td>
                      {usuario.correo}
                    </td>


                    <td>
                      {usuario.telefono}
                    </td>


                    <td>

                      {usuario.rol === "ADMIN" ? (

                        <span className="badge bg-primary">

                          <i className="fa-solid fa-user-shield me-1"></i>

                          ADMIN

                        </span>

                      ) : (

                        <span className="badge bg-warning text-dark">

                          <i className="fa-solid fa-user me-1"></i>

                          CLIENTE

                        </span>

                      )}

                    </td>


                    <td>

                      <div className="d-flex gap-2">

                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={() =>
                            cargarUsuario(
                              usuario
                            )
                          }
                        >

                          <i className="fa-solid fa-pen"></i>

                        </button>


                        {usuario.id !==
                          usuarioActual.id && (

                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() =>
                              eliminar(
                                usuario.id
                              )
                            }
                          >

                            <i className="fa-solid fa-trash"></i>

                          </button>

                        )}

                      </div>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </section>
  );
}

export default UserCrud;