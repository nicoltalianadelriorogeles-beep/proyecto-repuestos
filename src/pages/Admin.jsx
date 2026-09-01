import { useState } from "react";
import UserCrud from "../components/UserCrud";

function Admin({
  productos,
  agregarProducto,
  editarProducto,
  eliminarProducto,
  usuarios,
  usuarioActual,
  agregarUsuario,
  editarUsuario,
  eliminarUsuario
}) {

  const formularioInicial = {
    nombre: "",
    categoria: "Lavadoras",
    descripcion: "",
    precio: "",
    icon: "fa-gears",
    estado: ""
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


  const guardarProducto = (e) => {

    e.preventDefault();


    if (
      !formulario.nombre.trim() ||
      !formulario.descripcion.trim() ||
      !formulario.precio.trim()
    ) {

      alert(
        "Completa todos los campos."
      );

      return;

    }


    const precio = Number(
      formulario.precio
        .replace(/\./g, "")
        .replace(/[^\d]/g, "")
    );


    if (!precio) {

      alert(
        "Ingresa un precio válido."
      );

      return;

    }


    const productoFinal = {

      nombre:
        formulario.nombre.trim(),

      categoria:
        formulario.categoria,

      descripcion:
        formulario.descripcion.trim(),

      precio:
        precio.toLocaleString("es-CO"),

      icon:
        formulario.icon,

      estado:
        formulario.estado

    };


    if (editando !== null) {

      editarProducto({
        ...productoFinal,
        id: editando
      });

      alert(
        "Repuesto actualizado correctamente."
      );

    } else {

      agregarProducto({
        ...productoFinal,
        id: Date.now()
      });

      alert(
        "Repuesto creado correctamente."
      );

    }


    limpiarFormulario();

  };


  const cargarProducto = (
    producto
  ) => {

    setFormulario({

      nombre:
        producto.nombre || "",

      categoria:
        producto.categoria ||
        "Lavadoras",

      descripcion:
        producto.descripcion || "",

      precio:
        String(
          producto.precio || ""
        ).replace(/\./g, ""),

      icon:
        producto.icon ||
        "fa-gears",

      estado:
        producto.estado || ""

    });


    setEditando(
      producto.id
    );


    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };


  const eliminar = (id) => {

    const confirmar =
      window.confirm(
        "¿Seguro que deseas eliminar este repuesto?"
      );


    if (confirmar) {

      eliminarProducto(id);

      alert(
        "Repuesto eliminado correctamente."
      );

    }

  };


  return (
    <main className="admin-page py-5">

      <div className="container">


        {/* CABECERA */}

        <div className="admin-header mb-5">

          <div>

            <span className="admin-label">
              PANEL ADMINISTRATIVO
            </span>


            <h1 className="admin-title">
              Administración
            </h1>


            <p className="admin-description">

              Gestiona los repuestos y usuarios
              de Producciones Angel.

            </p>

          </div>


          <div className="admin-account-card">

            <div className="admin-account-icon">

              <i className="fa-solid fa-user-shield"></i>

            </div>


            <div>

              <small>
                Sesión iniciada
              </small>


              <strong>

                {usuarioActual?.primerNombre}

              </strong>

            </div>

          </div>

        </div>


        {/* RESUMEN */}

        <div className="row g-4 mb-5">


          <div className="col-md-4">

            <div className="admin-summary-card">

              <div className="admin-summary-icon blue">

                <i className="fa-solid fa-boxes-stacked"></i>

              </div>


              <div>

                <small>
                  Repuestos
                </small>


                <h3>
                  {productos.length}
                </h3>

              </div>

            </div>

          </div>


          <div className="col-md-4">

            <div className="admin-summary-card">

              <div className="admin-summary-icon orange">

                <i className="fa-solid fa-users"></i>

              </div>


              <div>

                <small>
                  Usuarios
                </small>


                <h3>
                  {usuarios.length}
                </h3>

              </div>

            </div>

          </div>


          <div className="col-md-4">

            <div className="admin-summary-card">

              <div className="admin-summary-icon green">

                <i className="fa-solid fa-shield-halved"></i>

              </div>


              <div>

                <small>
                  Rol
                </small>


                <h3>
                  ADMIN
                </h3>

              </div>

            </div>

          </div>

        </div>


        {/* GESTIÓN REPUESTOS */}

        <div className="admin-section-title">

          <span className="admin-label">
            CATÁLOGO
          </span>


          <h2>
            Gestión de repuestos
          </h2>


          <p>
            Agrega, modifica o elimina repuestos.
          </p>

        </div>


        {/* FORMULARIO */}

        <div className="card admin-card mb-4">

          <div className="card-header admin-card-header">

            <div className="d-flex align-items-center">

              <div className="admin-header-icon">

                <i
                  className={`fa-solid ${
                    editando !== null
                      ? "fa-pen-to-square"
                      : "fa-plus"
                  }`}
                ></i>

              </div>


              <div>

                <h5 className="mb-0">

                  {editando !== null
                    ? "Editar repuesto"
                    : "Agregar repuesto"}

                </h5>

              </div>

            </div>

          </div>


          <div className="card-body p-4">

            <form
              onSubmit={
                guardarProducto
              }
            >

              <div className="row g-4">


                <div className="col-md-6">

                  <label className="form-label">
                    Nombre
                  </label>


                  <input
                    type="text"
                    name="nombre"
                    className="form-control"
                    value={
                      formulario.nombre
                    }
                    onChange={
                      manejarCambio
                    }
                    required
                  />

                </div>


                <div className="col-md-6">

                  <label className="form-label">
                    Categoría
                  </label>


                  <select
                    name="categoria"
                    className="form-select"
                    value={
                      formulario.categoria
                    }
                    onChange={
                      manejarCambio
                    }
                  >

                    <option value="Lavadoras">
                      Lavadoras
                    </option>


                    <option value="Aspiradoras">
                      Aspiradoras
                    </option>

                  </select>

                </div>


                <div className="col-12">

                  <label className="form-label">
                    Descripción
                  </label>


                  <textarea
                    name="descripcion"
                    className="form-control"
                    rows="4"
                    value={
                      formulario.descripcion
                    }
                    onChange={
                      manejarCambio
                    }
                    required
                  ></textarea>

                </div>


                <div className="col-md-4">

                  <label className="form-label">
                    Precio
                  </label>


                  <input
                    type="number"
                    name="precio"
                    className="form-control"
                    min="0"
                    value={
                      formulario.precio
                    }
                    onChange={
                      manejarCambio
                    }
                    required
                  />

                </div>


                <div className="col-md-4">

                  <label className="form-label">
                    Icono
                  </label>


                  <select
                    name="icon"
                    className="form-select"
                    value={
                      formulario.icon
                    }
                    onChange={
                      manejarCambio
                    }
                  >

                    <option value="fa-gears">
                      Engranajes
                    </option>

                    <option value="fa-droplet">
                      Agua
                    </option>

                    <option value="fa-filter">
                      Filtro
                    </option>

                    <option value="fa-fan">
                      Ventilador
                    </option>

                    <option value="fa-wind">
                      Aire
                    </option>

                    <option value="fa-broom">
                      Cepillo
                    </option>

                    <option value="fa-arrows-rotate">
                      Rotación
                    </option>

                  </select>

                </div>


                <div className="col-md-4">

                  <label className="form-label">
                    Estado
                  </label>


                  <select
                    name="estado"
                    className="form-select"
                    value={
                      formulario.estado
                    }
                    onChange={
                      manejarCambio
                    }
                  >

                    <option value="">
                      Sin etiqueta
                    </option>

                    <option value="NUEVO">
                      NUEVO
                    </option>

                    <option value="OFERTA">
                      OFERTA
                    </option>

                    <option value="POPULAR">
                      POPULAR
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
                        editando !== null
                          ? "fa-floppy-disk"
                          : "fa-plus"
                      } me-2`}
                    ></i>


                    {editando !== null
                      ? "Guardar cambios"
                      : "Agregar repuesto"}

                  </button>


                  {editando !== null && (

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

              <i className="fa-solid fa-boxes-stacked me-2"></i>

              Repuestos registrados

            </h5>

          </div>


          <div className="table-responsive">

            <table className="table table-hover align-middle mb-0">

              <thead className="table-primary">

                <tr>

                  <th>ID</th>
                  <th>Producto</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Estado</th>
                  <th>Acciones</th>

                </tr>

              </thead>


              <tbody>

                {productos.map(
                  (producto) => (

                    <tr key={
                      producto.id
                    }>

                      <td>
                        {producto.id}
                      </td>


                      <td>

                        <div className="d-flex align-items-center gap-2">

                          <div className="admin-product-icon">

                            <i
                              className={`fa-solid ${producto.icon}`}
                            ></i>

                          </div>


                          <strong>
                            {producto.nombre}
                          </strong>

                        </div>

                      </td>


                      <td>
                        <span className="badge bg-light text-primary border">

                          {producto.categoria}

                        </span>
                      </td>


                      <td>

                        <strong className="text-primary">

                          ${producto.precio}

                        </strong>

                      </td>


                      <td>

                        {producto.estado ? (

                          <span className="badge bg-warning text-dark">

                            {producto.estado}

                          </span>

                        ) : "—"}

                      </td>


                      <td>

                        <div className="d-flex gap-2">

                          <button
                            type="button"
                            className="btn btn-sm btn-outline-primary"
                            onClick={() =>
                              cargarProducto(
                                producto
                              )
                            }
                          >

                            <i className="fa-solid fa-pen"></i>

                          </button>


                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() =>
                              eliminar(
                                producto.id
                              )
                            }
                          >

                            <i className="fa-solid fa-trash"></i>

                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </div>


        {/* CRUD USUARIOS */}

        <UserCrud
          usuarios={usuarios}
          usuarioActual={usuarioActual}
          agregarUsuario={
            agregarUsuario
          }
          editarUsuario={
            editarUsuario
          }
          eliminarUsuario={
            eliminarUsuario
          }
        />

      </div>

    </main>
  );
}

export default Admin;