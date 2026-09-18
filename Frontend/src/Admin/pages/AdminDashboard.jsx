function AdminDashboard({
  productos = [],
  usuarios = [],
  pedidos = [],
  usuarioActual
}) {

  const pedidosPendientes = pedidos.filter(
    (pedido) => pedido.estado === "PENDIENTE"
  );

  const totalVentas = pedidos.reduce(
    (total, pedido) => total + Number(pedido.total || 0),
    0
  );

  return (
    <div className="container admin-dashboard-shell">

      <header className="admin-dashboard-header">

        <span className="admin-label">
          PANEL ADMINISTRATIVO
        </span>

        <h1 className="admin-title">Administrador</h1>

        <p className="admin-description">
          Bienvenido,{" "}
          <strong>
            {usuarioActual?.primerNombre || "Administrador"}
          </strong>
          . Desde aquí puedes controlar tu tienda.
        </p>

      </header>

      <div className="admin-summary">

        <div className="summary-card">

          <i className="fa-solid fa-boxes-stacked"></i>

          <h3>Repuestos</h3>

          <strong>
            {productos.length}
          </strong>

        </div>

        <div className="summary-card">

          <i className="fa-solid fa-users"></i>

          <h3>Usuarios</h3>

          <strong>
            {usuarios.length}
          </strong>

        </div>

        <div className="summary-card">

          <i className="fa-solid fa-clock"></i>

          <h3>Pedidos pendientes</h3>

          <strong>
            {pedidosPendientes.length}
          </strong>

        </div>

        <div className="summary-card">

          <i className="fa-solid fa-chart-line"></i>

          <h3>Total ventas</h3>

          <strong>
            ${totalVentas.toLocaleString("es-CO")}
          </strong>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;