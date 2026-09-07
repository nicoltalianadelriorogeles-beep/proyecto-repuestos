import { useState } from "react";
import UserForm from "./UsuarioForm";

function UserCrud({
  usuarios = [],
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

  const [formularioAbierto, setFormularioAbierto] =
    useState(false);

  const [mensaje, setMensaje] =
    useState(null);

  const manejarCambio = (e) => {

    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });

  };

  const mostrarMensaje = (tipo, texto) => {

    setMensaje({
      tipo,
      texto
    });

    setTimeout(() => {
      setMensaje(null);
    }, 4000);

  };

  const limpiarFormulario = () => {

    setFormulario(formularioInicial);

    setEditando(null);

    setFormularioAbierto(false);

  };

  const abrirFormulario = () => {

    setMensaje(null);

    setFormularioAbierto(true);

  };

  const guardarUsuario = (e) => {

    e.preventDefault();

    setMensaje(null);

    if (
      !formulario.tipoDocumento ||
      !formulario.numeroDocumento ||
      !formulario.primerNombre ||
      !formulario.primerApellido ||
      !formulario.direccion ||
      !formulario.correo ||
      !formulario.telefono
    ) {

      mostrarMensaje(
        "error",
        "Completa todos los campos obligatorios."
      );

      return;
    }

    if (
      !editando &&
      !formulario.password
    ) {

      mostrarMensaje(
        "error",
        "La contraseña es obligatoria."
      );

      return;
    }

    if (
      formulario.password &&
      formulario.password.length < 6
    ) {

      mostrarMensaje(
        "error",
        "La contraseña debe tener mínimo 6 caracteres."
      );

      return;
    }

    const correoExiste = usuarios.some(
      (usuario) =>
        usuario.correo?.toLowerCase() ===
          formulario.correo.toLowerCase() &&
        usuario.id !== editando
    );

    if (correoExiste) {

      mostrarMensaje(
        "error",
        "Ese correo ya está registrado."
      );

      return;
    }

    const documentoExiste = usuarios.some(
      (usuario) =>
        usuario.numeroDocumento ===
          formulario.numeroDocumento &&
        usuario.id !== editando
    );

    if (documentoExiste) {

      mostrarMensaje(
        "error",
        "Ese documento ya está registrado."
      );

      return;
    }

    try {

      if (editando !== null) {

        const usuarioAnterior =
          usuarios.find(
            (usuario) =>
              usuario.id === editando
          );

        if (!usuarioAnterior) {

          mostrarMensaje(
            "error",
            "No se encontró el usuario que deseas editar."
          );

          return;
        }

        editarUsuario({

          ...usuarioAnterior,

          ...formulario,

          password:
            formulario.password ||
            usuarioAnterior.password

        });

        mostrarMensaje(
          "success",
          "Usuario actualizado correctamente."
        );

      } else {

        agregarUsuario({

          ...formulario,

          id: Date.now()

        });

        mostrarMensaje(
          "success",
          "Usuario creado correctamente."
        );

      }

      setFormulario(formularioInicial);

      setEditando(null);

      setFormularioAbierto(false);

    } catch (error) {

      console.error(error);

      mostrarMensaje(
        "error",
        "Ocurrió un error al guardar el usuario."
      );

    }

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

    setMensaje(null);

    setFormularioAbierto(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };

  const eliminar = (id) => {

    if (
      usuarioActual &&
      id === usuarioActual.id
    ) {

      mostrarMensaje(
        "error",
        "No puedes eliminar tu propia cuenta."
      );

      return;
    }

    const confirmar =
      window.confirm(
        "¿Seguro que deseas eliminar este usuario?"
      );

    if (confirmar) {

      try {

        eliminarUsuario(id);

        mostrarMensaje(
          "success",
          "Usuario eliminado correctamente."
        );

      } catch (error) {

        console.error(error);

        mostrarMensaje(
          "error",
          "No fue posible eliminar el usuario."
        );

      }

    }

  };

  return (

    <section className="user-crud-section">

      <div>

        <div className="admin-section-title">

        <span className="admin-label">
          USUARIOS
        </span>

        <h2>
          Gestionar usuarios
        </h2>

        <p>
          Administra los usuarios registrados en el sistema.
        </p>

      </div>

        <button
          type="button"
          className="btn btn-warning user-new-button"
          onClick={abrirFormulario}
        >

          <i className="fa-solid fa-user-plus me-2"></i>

          Nuevo usuario

        </button>

      </div>

      {/* MENSAJE */}

      {mensaje && (

        <div
          className={`admin-feedback ${
            mensaje.tipo === "success"
              ? "feedback-success"
              : "feedback-error"
          }`}
        >

          <i
            className={`fa-solid ${
              mensaje.tipo === "success"
                ? "fa-circle-check"
                : "fa-circle-exclamation"
            }`}
          ></i>

          <span>
            {mensaje.texto}
          </span>

          <button
            type="button"
            onClick={() => setMensaje(null)}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

        </div>

      )}

      {/* FORMULARIO DESPLEGABLE */}

      <div
        className={`user-form-container ${
          formularioAbierto
            ? "user-form-open"
            : ""
        }`}
      >

        <UserForm
          formulario={formulario}
          editando={editando}
          manejarCambio={manejarCambio}
          guardarUsuario={guardarUsuario}
          limpiarFormulario={limpiarFormulario}
        />

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

              {usuarios.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-5"
                  >

                    <i className="fa-solid fa-users-slash fs-2 text-secondary"></i>

                    <p className="mt-2 mb-0">
                      No hay usuarios registrados.
                    </p>

                  </td>

                </tr>

              ) : (

                usuarios.map((usuario) => (

                  <tr key={usuario.id}>

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
                            cargarUsuario(usuario)
                          }
                        >

                          <i className="fa-solid fa-pen"></i>

                        </button>

                        {(!usuarioActual ||
                          usuario.id !== usuarioActual.id) && (

                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() =>
                              eliminar(usuario.id)
                            }
                          >

                            <i className="fa-solid fa-trash"></i>

                          </button>

                        )}

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </section>

  );
}

export default UserCrud;