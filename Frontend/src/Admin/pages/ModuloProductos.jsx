
import { useState } from "react";

function Productos({
  productos = [],
  agregarProducto,
  editarProducto,
  eliminarProducto
}) {
  const formularioInicial = {
    nombre: "",
    categoria: "Lavadoras",
    descripcion: "",
    precio: "",
    icon: "fa-gears",
    estado: ""
  };

  const [formulario, setFormulario] = useState(formularioInicial);
  const [editando, setEditando] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

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

  const mostrarMensaje = (texto, tipo) => {
    setMensaje(texto);
    setTipoMensaje(tipo);

    setTimeout(() => {
      setMensaje("");
      setTipoMensaje("");
    }, 4000);
  };

  const guardarProducto = (e) => {
    e.preventDefault();

    if (
      !formulario.nombre.trim() ||
      !formulario.descripcion.trim() ||
      !formulario.precio.trim()
    ) {
      mostrarMensaje(
        "Completa todos los campos obligatorios.",
        "error"
      );
      return;
    }

    const precio = Number(
      String(formulario.precio)
        .replace(/\./g, "")
        .replace(/[^\d]/g, "")
    );

    if (!precio || precio <= 0) {
      mostrarMensaje(
        "Ingresa un precio válido.",
        "error"
      );
      return;
    }

    const producto = {
      nombre: formulario.nombre.trim(),
      categoria: formulario.categoria,
      descripcion: formulario.descripcion.trim(),
      precio: precio.toLocaleString("es-CO"),
      icon: formulario.icon,
      estado: formulario.estado
    };

    try {
      if (editando !== null) {
        editarProducto({
          ...producto,
          id: editando
        });

        mostrarMensaje(
          "Repuesto actualizado correctamente.",
          "success"
        );
      } else {
        agregarProducto({
          ...producto,
          id: Date.now()
        });

        mostrarMensaje(
          "Repuesto creado correctamente.",
          "success"
        );
      }

      limpiarFormulario();
    } catch (error) {
      console.error("Error al guardar producto:", error);

      mostrarMensaje(
        "Ocurrió un error al guardar el repuesto.",
        "error"
      );
    }
  };

  const cargarProducto = (producto) => {
    setFormulario({
      nombre: producto.nombre || "",
      categoria: producto.categoria || "Lavadoras",
      descripcion: producto.descripcion || "",
      precio: String(producto.precio || "")
        .replace(/\./g, "")
        .replace(/[^\d]/g, ""),
      icon: producto.icon || "fa-gears",
      estado: producto.estado || ""
    });

    setEditando(producto.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const eliminar = (id) => {
    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar este repuesto?"
    );

    if (!confirmar) {
      return;
    }

    try {
      eliminarProducto(id);

      mostrarMensaje(
        "Repuesto eliminado correctamente.",
        "success"
      );
    } catch (error) {
      console.error("Error al eliminar producto:", error);

      mostrarMensaje(
        "Ocurrió un error al eliminar el repuesto.",
        "error"
      );
    }
  };

  return (
    <section className="productos-admin">

      {/* ENCABEZADO */}
      <div className="admin-section-title">
        <span className="admin-label">
          CATÁLOGO
        </span>

        <h2>
          Gestionar productos
        </h2>

        <p>
          Agrega, modifica o elimina repuestos.
        </p>
      </div>

      {/* MENSAJE */}
      {mensaje && (
        <div
          className={`admin-feedback ${
            tipoMensaje === "success"
              ? "admin-feedback-success"
              : "admin-feedback-error"
          }`}
        >
          <i
            className={`fa-solid ${
              tipoMensaje === "success"
                ? "fa-circle-check"
                : "fa-circle-exclamation"
            }`}
          ></i>

          <span>{mensaje}</span>
        </div>
      )}

      {/* FORMULARIO */}
      <div className="card admin-card mb-4">

        <div className="card-header admin-card-header">

          <h5 className="mb-0">

            <i
              className={`fa-solid ${
                editando !== null
                  ? "fa-pen-to-square"
                  : "fa-plus"
              } me-2`}
            ></i>

            {editando !== null
              ? "Editar repuesto"
              : "Agregar repuesto"}

          </h5>

        </div>

        <div className="card-body p-4">

          <form onSubmit={guardarProducto}>

            <div className="row g-4">

              {/* NOMBRE */}
              <div className="col-md-6">

                <label className="form-label">
                  Nombre
                </label>

                <input
                  type="text"
                  name="nombre"
                  className="form-control"
                  placeholder="Ej: Bomba de agua"
                  value={formulario.nombre}
                  onChange={manejarCambio}
                  required
                />

              </div>

              {/* CATEGORÍA */}
              <div className="col-md-6">

                <label className="form-label">
                  Categoría
                </label>

                <select
                  name="categoria"
                  className="form-select"
                  value={formulario.categoria}
                  onChange={manejarCambio}
                >

                  <option value="Lavadoras">
                    Lavadoras
                  </option>

                  <option value="Aspiradoras">
                    Aspiradoras
                  </option>

                </select>

              </div>

              {/* DESCRIPCIÓN */}
              <div className="col-12">

                <label className="form-label">
                  Descripción
                </label>

                <textarea
                  name="descripcion"
                  className="form-control"
                  rows="3"
                  placeholder="Describe las características del repuesto..."
                  value={formulario.descripcion}
                  onChange={manejarCambio}
                  required
                ></textarea>

              </div>

              {/* PRECIO */}
              <div className="col-md-4">

                <label className="form-label">
                  Precio
                </label>

                <input
                  type="number"
                  name="precio"
                  className="form-control"
                  min="0"
                  placeholder="Ej: 85000"
                  value={formulario.precio}
                  onChange={manejarCambio}
                  required
                />

              </div>

              {/* ICONO */}
              <div className="col-md-4">

                <label className="form-label">
                  Icono
                </label>

                <select
                  name="icon"
                  className="form-select"
                  value={formulario.icon}
                  onChange={manejarCambio}
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

              {/* ESTADO */}
              <div className="col-md-4">

                <label className="form-label">
                  Estado
                </label>

                <select
                  name="estado"
                  className="form-select"
                  value={formulario.estado}
                  onChange={manejarCambio}
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

              {/* BOTONES */}
              <div className="col-12 d-flex gap-2">

                <button
                  type="submit"
                  className="btn btn-warning fw-bold"
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
                    onClick={limpiarFormulario}
                  >
                    Cancelar
                  </button>
                )}

              </div>

            </div>

          </form>

        </div>

      </div>

      {/* TABLA DE PRODUCTOS */}
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

              {productos.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-5 text-secondary"
                  >

                    <i className="fa-solid fa-box-open fa-2x mb-3 d-block"></i>

                    No hay repuestos registrados.

                  </td>

                </tr>

              ) : (

                productos.map((producto) => (

                  <tr key={producto.id}>

                    <td>
                      {producto.id}
                    </td>

                    <td>

                      <div className="d-flex align-items-center gap-2">

                        <div className="admin-product-icon">

                          <i
                            className={`fa-solid ${
                              producto.icon || "fa-gears"
                            }`}
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

                      ) : (
                        "—"
                      )}

                    </td>

                    <td>

                      <div className="d-flex gap-2">

                        {/* EDITAR */}
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={() =>
                            cargarProducto(producto)
                          }
                          title="Editar producto"
                        >

                          <i className="fa-solid fa-pen"></i>

                        </button>

                        {/* ELIMINAR */}
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() =>
                            eliminar(producto.id)
                          }
                          title="Eliminar producto"
                        >

                          <i className="fa-solid fa-trash"></i>

                        </button>

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

export default Productos;
