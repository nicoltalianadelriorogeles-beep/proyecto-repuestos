
function PedidosPendientes({
  pedidos = [],
  cambiarEstadoPedido
}) {
  // Filtrar únicamente los pedidos pendientes
  const pedidosPendientes = pedidos.filter(
    (pedido) => pedido.estado === "PENDIENTE"
  );

  return (
    <section className="pedidos-pendientes pedidos-module">

      {/* ENCABEZADO DE LA SECCIÓN */}
      <div className="admin-section-title">

        <span className="admin-label">
          VENTAS
        </span>

        <h2>
          Pedidos pendientes
        </h2>

        <p>
          Confirma y procesa los pedidos que aún están en espera.
        </p>

      </div>

      {/* SIN PEDIDOS */}
      {pedidosPendientes.length === 0 ? (

        <div className="admin-card admin-empty-state text-center">

          <i className="fa-solid fa-clock"></i>

          <h5>
            No hay pedidos pendientes
          </h5>

          <p className="text-secondary mb-0">
            Los nuevos pedidos aparecerán aquí.
          </p>

        </div>

      ) : (

        /* LISTA DE PEDIDOS */
        <div className="orders-grid">

          {pedidosPendientes.map((pedido) => (

            <div
              className="order-card order-card-pending"
              key={pedido.id}
            >

              {/* INFORMACIÓN PRINCIPAL */}
              <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap">

                <div>

                  <h3>
                    Pedido #{pedido.id}
                  </h3>

                  <p>
                    <strong>
                      Cliente:
                    </strong>{" "}
                    {pedido.cliente}
                  </p>

                  <p>
                    <strong>
                      Fecha:
                    </strong>{" "}
                    {pedido.fecha}
                  </p>

                </div>

                {/* ESTADO */}
                <span className="order-status pending">
                  {pedido.estado}
                </span>

              </div>

              {/* PRODUCTOS DEL PEDIDO */}
              <div className="order-products">

                <strong>
                  Productos:
                </strong>

                {pedido.productos &&
                pedido.productos.length > 0 ? (

                  <ul className="mb-0 mt-2">

                    {pedido.productos.map((producto) => (

                      <li key={producto.id}>

                        {producto.nombre} x{" "}
                        {producto.cantidad}

                      </li>

                    ))}

                  </ul>

                ) : (

                  <p className="text-secondary mt-2 mb-0">
                    No hay productos registrados.
                  </p>

                )}

              </div>

              {/* TOTAL Y ACCIÓN */}
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">

                <strong className="order-total">

                  Total: $

                  {Number(
                    pedido.total || 0
                  ).toLocaleString("es-CO")}

                </strong>

                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() =>
                    cambiarEstadoPedido(
                      pedido.id,
                      "COMPLETADO"
                    )
                  }
                >

                  <i className="fa-solid fa-check me-2"></i>

                  Marcar completado

                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}

export default PedidosPendientes;