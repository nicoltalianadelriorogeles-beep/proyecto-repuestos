
import { useState } from "react";

function Admin({
  productos,
  agregarProducto,
  editarProducto,
  eliminarProducto
}) {

  const [formulario, setFormulario] =
    useState({
      nombre: "",
      categoria: "Lavadoras",
      descripcion: "",
      precio: "",
      icon: "fa-gears",
      estado: ""
    });


  const [editando, setEditando] =
    useState(null);


  const manejarCambio = (e) => {

    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });

  };


  const limpiarFormulario = () => {

    setFormulario({
      nombre: "",
      categoria: "Lavadoras",
      descripcion: "",
      precio: "",
      icon: "fa-gears",
      estado: ""
    });

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
        "Completa nombre, descripción y precio."
      );

      return;
    }


    if (editando) {

      editarProducto({
        ...formulario,
        id: editando
      });

      alert(
        "Repuesto actualizado correctamente."
      );

    } else {

      agregarProducto({
        ...formulario,
        id: Date.now()
      });

      alert(
        "Repuesto agregado correctamente."
      );

    }


    limpiarFormulario();

  };


  const comenzarEdicion = (producto) => {

    setFormulario({
      nombre: producto.nombre,
      categoria: producto.categoria,
      descripcion: producto.descripcion,
      precio: producto.precio,
      icon: producto.icon,
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


    if (confirmar) {

      eliminarProducto(id);

    }

  };


  return (
    <main className="bg-light py-5">

      <div className="container">


        {/* ENCABEZADO */}

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>

            <span className="text-warning fw-bold">
              ADMINISTRACIÓN
            </span>

            <h1 className="fw-bold text-primary">
              Gestión de repuestos
            </h1>

            <p className="text-secondary">
              Administra los productos de
              Producciones Angel.
            </p>

          </div>


          <div className="bg-primary text-white rounded-3 p-3 text-center">

            <i className="fa-solid fa-boxes-stacked fa-2x"></i>

            <div className="fs-4 fw-bold">
              {productos.length}
            </div>

            <small>
              Repuestos
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
                    ? "fa-pen-to-square"
                    : "fa-plus"
                } me-2`}
              ></i>

              {editando
                ? "Editar repuesto"
                : "Agregar repuesto"}

            </h5>

          </div>


          <div className="card-body p-4">

            <form onSubmit={guardarProducto}>

              <div className="row g-3">


                <div className="col-md-6">

                  <label className="form-label fw-bold">
                    Nombre
                  </label>

                  <input
                    type="text"
                    name="nombre"
                    className="form-control"
                    placeholder="Ej: Bomba de desagüe"
                    value={formulario.nombre}
                    onChange={manejarCambio}
                    required
                  />

                </div>


                <div className="col-md-6">

                  <label className="form-label fw-bold">
                    Categoría
                  </label>

                  <select
                    name="categoria"
                    className="form-select"
                    value={
                      formulario.categoria
                    }
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


                <div className="col-12">

                  <label className="form-label fw-bold">
                    Descripción
                  </label>

                  <textarea
                    name="descripcion"
                    className="form-control"
                    rows="3"
                    placeholder="Descripción del repuesto..."
                    value={
                      formulario.descripcion
                    }
                    onChange={manejarCambio}
                    required
                  ></textarea>

                </div>


                <div className="col-md-4">

                  <label className="form-label fw-bold">
                    Precio
                  </label>

                  <div className="input-group">

                    <span className="input-group-text">
                      $
                    </span>

                    <input
                      type="text"
                      name="precio"
                      className="form-control"
                      placeholder="85000"
                      value={
                        formulario.precio
                      }
                      onChange={manejarCambio}
                      required
                    />

                  </div>

                </div>


                <div className="col-md-4">

                  <label className="form-label fw-bold">
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

                    <option value="fa-arrows-rotate">
                      Rotación
                    </option>

                  </select>

                </div>


                <div className="col-md-4">

                  <label className="form-label fw-bold">
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


                <div className="col-12 d-flex gap-2">

                  <button
                    type="submit"
                    className="btn btn-warning fw-bold"
                  >

                    <i
                      className={`fa-solid ${
                        editando
                          ? "fa-floppy-disk"
                          : "fa-plus"
                      } me-2`}
                    ></i>

                    {editando
                      ? "Guardar cambios"
                      : "Agregar repuesto"}

                  </button>


                  {editando && (

                    <button
                      type="button"
                      className="btn btn-secondary"
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

        <div className="card border-0 shadow-sm">

          <div className="card-header bg-white">

            <h5 className="text-primary fw-bold mb-0 py-2">

              <i className="fa-solid fa-list me-2"></i>

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

                    <tr
                      key={producto.id}
                    >

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

                        ) : (

                          <span className="text-secondary">
                            —
                          </span>

                        )}

                      </td>


                      <td>

                        <div className="d-flex gap-2">

                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() =>
                              comenzarEdicion(
                                producto
                              )
                            }
                            title="Editar"
                          >

                            <i className="fa-solid fa-pen"></i>

                          </button>


                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() =>
                              eliminar(
                                producto.id
                              )
                            }
                            title="Eliminar"
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

      </div>

    </main>
  );
}

export default Admin;
