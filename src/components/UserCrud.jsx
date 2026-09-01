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
      [e.target.name]: e.target.value
    });

  };


  const limpiarFormulario = () => {

    setFormulario(formularioInicial);
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

      alert("Completa todos los campos obligatorios.");

      return;
    }


    if (!editando && !formulario.password) {

      alert("La contraseña es obligatoria.");

      return;
    }


    if (
      formulario.password &&
      formulario.password.length < 6
    ) {

      alert("La contraseña debe tener mínimo 6 caracteres.");

      return;
    }


    const correoExiste = usuarios.some(
      (usuario) =>
        usuario.correo.toLowerCase() ===
          formulario.correo.toLowerCase() &&
        usuario.id !== editando
    );


    if (correoExiste) {

      alert("Ese correo ya está registrado.");

      return;
    }


    const documentoExiste = usuarios.some(
      (usuario) =>
        usuario.numeroDocumento ===
          formulario.numeroDocumento &&
        usuario.id !== editando
    );


    if (documentoExiste) {

      alert(
        "Ese número de documento ya está registrado."
      );

      return;
    }


    if (editando) {

      const usuarioAnterior = usuarios.find(
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


  const cargarUsuario = (usuario) => {

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


    setEditando(usuario.id);


    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };


  const eliminar = (id) => {

    if (id === usuarioActual.id) {

      alert(
        "No puedes eliminar tu propia cuenta."
      );

      return;
    }


    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar este usuario?"
    );


    if (confirmar) {

      eliminarUsuario(id);

    }

  };


  return (
    <section className="mt-5">

      {/* TITULO */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <span className="text-warning fw-bold">
            ADMINISTRACIÓN
          </span>

          <h2 className="text-primary fw-bold">
            Gestión de usuarios
          </h2>

          <p className="text-secondary mb-0">
            Administra clientes y administradores.
          </p>

        </div>


        <div className="bg-warning text-dark rounded-3 p-3 text-center">

          <i className="fa-solid fa-users fa-2x"></i>

          <div className="fs-4 fw-bold">
            {usuarios.length}
          </div>

          <small>
            Usuarios
          </small>

        </div>

      </div>


      {/* FORMULARIO */}

      <div className="card border-0 shadow-sm mb-5">

        <div className="card-header bg-primary text-white">

          <h5 className="mb-0 py-2">

            <i
              className={`fa-solid ${
                editando
                  ? "fa-user-pen"
                  : "fa-user-plus"
              } me-2`}
            ></i>

            {editando
              ? "Editar usuario"
              : "Registrar usuario"}

          </h5>

        </div>


        <div className="card-body p-4">

          <form onSubmit={guardarUsuario}>

            <div className="row g-3">

              {/* TIPO DOCUMENTO */}

              <div className="col-md-4">

                <label className="form-label fw-bold">
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


              {/* NUMERO */}

              <div className="col-md-8">

                <label className="form-label fw-bold">
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


              {/* PRIMER NOMBRE */}

              <div className="col-md-6">

                <label className="form-label fw-bold">
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


              {/* SEGUNDO NOMBRE */}

              <div className="col-md-6">

                <label className="form-label fw-bold">
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


              {/* PRIMER APELLIDO */}

              <div className="col-md-6">

                <label className="form-label fw-bold">
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


              {/* SEGUNDO APELLIDO */}

              <div className="col-md-6">

                <label className="form-label fw-bold">
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


              {/* DIRECCIÓN */}

              <div className="col-12">

                <label className="form-label fw-bold">
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


              {/* CORREO */}

              <div className="col-md-6">

                <label className="form-label fw-bold">
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


              {/* TELEFONO */}

              <div className="col-md-6">

                <label className="form-label fw-bold">
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


              {/* CONTRASEÑA */}

              <div className="col-md-6">

                <label className="form-label fw-bold">
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

                {editando && (
                  <small className="text-secondary">
                    Deja vacío para conservar la contraseña actual.
                  </small>
                )}

              </div>


              {/* ROL */}

              <div className="col-md-6">

                <label className="form-label fw-bold">
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


              {/* BOTONES */}

              <div className="col-12 d-flex gap-2 mt-3">

                <button
                  type="submit"
                  className="btn btn-warning fw-bold"
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
                    className="btn btn-secondary"
                    onClick={limpiarFormulario}
                  >
                    <i className="fa-solid fa-xmark me-2"></i>
                    Cancelar
                  </button>

                )}

              </div>

            </div>

          </form>

        </div>

      </div>


      {/* TABLA */}

      <div className="card border-0 shadow-sm">

        <div className="card-header bg-white">

          <h5 className="text-primary fw-bold mb-0 py-2">

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

              {usuarios.map((usuario) => (

                <tr key={usuario.id}>

                  <td>

                    <div className="d-flex align-items-center gap-2">

                      <div className="admin-user-icon">

                        <i className="fa-solid fa-user"></i>

                      </div>

                      <strong>

                        {usuario.primerNombre}{" "}
                        {usuario.segundoNombre}{" "}
                        {usuario.primerApellido}{" "}
                        {usuario.segundoApellido}

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
                        className="btn btn-sm btn-outline-primary"
                        onClick={() =>
                          cargarUsuario(usuario)
                        }
                        title="Editar"
                      >

                        <i className="fa-solid fa-pen"></i>

                      </button>


                      {usuario.id !== usuarioActual.id && (

                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() =>
                            eliminar(usuario.id)
                          }
                          title="Eliminar"
                        >

                          <i className="fa-solid fa-trash"></i>

                        </button>

                      )}

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </section>
  );
}

export default UserCrud;