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
  eliminarUsuario,
  pedidos = [],
  cambiarEstadoPedido,
  seccion = "productos"
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

  const guardarProducto = (e) => {
    e.preventDefault();
    if (!formulario.nombre.trim() || !formulario.descripcion.trim() || !formulario.precio.trim()) {
      alert("Completa todos los campos.");
      return;
    }

    const precio = Number(formulario.precio.replace(/\./g, "").replace(/[^\d]/g, ""));
    if (!precio) {
      alert("Ingresa un precio válido.");
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

    if (editando !== null) {
      editarProducto({ ...producto, id: editando });
      alert("Repuesto actualizado correctamente.");
    } else {
      agregarProducto({ ...producto, id: Date.now() });
      alert("Repuesto creado correctamente.");
    }
    limpiarFormulario();
  };

  const cargarProducto = (producto) => {
    setFormulario({
      nombre: producto.nombre || "",
      categoria: producto.categoria || "Lavadoras",
      descripcion: producto.descripcion || "",
      precio: String(producto.precio || "").replace(/\./g, "").replace(/[^\d]/g, ""),
      icon: producto.icon || "fa-gears",
      estado: producto.estado || ""
    });
    setEditando(producto.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const eliminar = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este repuesto?")) {
      eliminarProducto(id);
      alert("Repuesto eliminado correctamente.");
    }
  };

  const totalVentas = pedidos.reduce(
    (total, pedido) => total + Number(pedido.total || 0),
    0
  );

  const pedidosPendientes = pedidos.filter(
    (pedido) => pedido.estado === "PENDIENTE"
  );

  const mostrarPedidos = (estado) => {
    const pedidosFiltrados = pedidos.filter(
      (pedido) => pedido.estado === estado
    );
    const pendientes = estado === "PENDIENTE";

    return (
      <>
        <div className="admin-section-title">
          <span className="admin-label">VENTAS</span>
          <h2>{pendientes ? "Pedidos pendientes" : "Pedidos completados"}</h2>
          <p>
            {pendientes
              ? "Confirma y procesa los pedidos que aún están en espera."
              : "Consulta el historial de pedidos procesados."}
          </p>
        </div>

        {pedidosFiltrados.length === 0 ? (
          <div className="admin-card admin-empty-state text-center">
            <i className={`fa-solid ${pendientes ? "fa-clock" : "fa-circle-check"}`}></i>
            <h5>{pendientes ? "No hay pedidos pendientes" : "No hay pedidos completados"}</h5>
            <p className="text-secondary mb-0">
              {pendientes
                ? "Los nuevos pedidos aparecerán aquí."
                : "Los pedidos finalizados aparecerán aquí."}
            </p>
          </div>
        ) : (
          <div className="orders-grid">
            {pedidosFiltrados.map((pedido) => (
              <div className="order-card" key={pedido.id}>
                <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap">
                  <div>
                    <h3>Pedido #{pedido.id}</h3>
                    <p><strong>Cliente:</strong> {pedido.cliente}</p>
                    <p><strong>Fecha:</strong> {pedido.fecha}</p>
                  </div>
                  <span className={`order-status ${pendientes ? "pending" : "completed"}`}>
                    {pedido.estado}
                  </span>
                </div>

                <div className="order-products">
                  <strong>Productos:</strong>
                  <ul className="mb-0 mt-2">
                    {pedido.productos?.map((producto) => (
                      <li key={producto.id}>{producto.nombre} x {producto.cantidad}</li>
                    ))}
                  </ul>
                </div>

                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                  <strong className="order-total">
                    Total: ${Number(pedido.total).toLocaleString("es-CO")}
                  </strong>
                  {pendientes ? (
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => cambiarEstadoPedido(pedido.id, "COMPLETADO")}
                    >
                      <i className="fa-solid fa-check me-2"></i>
                      Marcar completado
                    </button>
                  ) : (
                    <span className="text-success fw-bold">
                      <i className="fa-solid fa-circle-check me-2"></i>
                      Venta completada
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  const mostrarProductos = () => (
    <>
      <div className="admin-section-title">
        <span className="admin-label">CATÁLOGO</span>
        <h2>Gestionar productos</h2>
        <p>Agrega, modifica o elimina repuestos.</p>
      </div>

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
              <div className="col-md-6">
                <label className="form-label">Nombre</label>

                <input
                  type="text"
                  name="nombre"
                  className="form-control"
                  value={formulario.nombre}
                  onChange={manejarCambio}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Categoría</label>

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

              <div className="col-12">
                <label className="form-label">
                  Descripción
                </label>

                <textarea
                  name="descripcion"
                  className="form-control"
                  rows="3"
                  value={formulario.descripcion}
                  onChange={manejarCambio}
                  required
                ></textarea>
              </div>

              <div className="col-md-4">
                <label className="form-label">Precio</label>

                <input
                  type="number"
                  name="precio"
                  className="form-control"
                  min="0"
                  value={formulario.precio}
                  onChange={manejarCambio}
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Icono</label>

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

              <div className="col-md-4">
                <label className="form-label">Estado</label>

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
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.id}</td>

                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <div className="admin-product-icon">
                        <i
                          className={`fa-solid ${producto.icon}`}
                        ></i>
                      </div>

                      <strong>{producto.nombre}</strong>
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
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        onClick={() =>
                          cargarProducto(producto)
                        }
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>

                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() =>
                          eliminar(producto.id)
                        }
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </>
  );

  const mostrarUsuarios = () => (
    <>
      <div className="admin-section-title">
        <span className="admin-label">USUARIOS</span>
        <h2>Gestionar usuarios</h2>
        <p>
          Administra los usuarios registrados en el sistema.
        </p>
      </div>

      <UserCrud
        usuarios={usuarios}
        usuarioActual={usuarioActual}
        agregarUsuario={agregarUsuario}
        editarUsuario={editarUsuario}
        eliminarUsuario={eliminarUsuario}
      />
    </>
  );

  return (
    <main className="admin-page py-5">
      <div className="container">
        <div className="admin-header mb-4">
          <div>
            <span className="admin-label">
              PANEL ADMINISTRATIVO
            </span>

            <h1 className="admin-title">
              Administración
            </h1>

            <p className="admin-description">
              Bienvenido,{" "}
              <strong>
                {usuarioActual?.primerNombre}
              </strong>
              . Gestiona tu tienda desde este panel.
            </p>
          </div>

          <div className="admin-account-card">
            <div className="admin-account-icon">
              <i className="fa-solid fa-user-shield"></i>
            </div>

            <div>
              <small>Sesión iniciada</small>

              <strong>
                {usuarioActual?.primerNombre}
              </strong>
            </div>
          </div>
        </div>

        <div className="admin-summary mb-5">
          <div className="summary-card">
            <i className="fa-solid fa-boxes-stacked"></i>
            <h3>Repuestos</h3>
            <strong>{productos.length}</strong>
          </div>

          <div className="summary-card">
            <i className="fa-solid fa-users"></i>
            <h3>Usuarios</h3>
            <strong>{usuarios.length}</strong>
          </div>

          <div className="summary-card">
            <i className="fa-solid fa-clock"></i>
            <h3>Pedidos pendientes</h3>
            <strong>{pedidosPendientes.length}</strong>
          </div>

          <div className="summary-card">
            <i className="fa-solid fa-chart-line"></i>
            <h3>Total ventas</h3>
            <strong>
              ${totalVentas.toLocaleString("es-CO")}
            </strong>
          </div>
        </div>

        {seccion === "usuarios"
          ? mostrarUsuarios()
          : seccion === "pendientes"
            ? mostrarPedidos("PENDIENTE")
            : seccion === "completados"
              ? mostrarPedidos("COMPLETADO")
              : mostrarProductos()}
      </div>
    </main>
  );
}

export default Admin;