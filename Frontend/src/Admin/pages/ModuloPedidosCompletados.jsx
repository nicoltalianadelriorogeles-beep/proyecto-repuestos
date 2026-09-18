
function PedidosCompletados({
  pedidos = []
}) {
  // Filtrar solamente los pedidos que ya fueron completados
  const pedidosCompletados = pedidos.filter(
    (pedido) => pedido.estado === "COMPLETADO"
  );

  return (
    <section className="pedidos-completados pedidos-module">

      {/* Título de la sección */}
      <div className="admin-section-title">
        <span className="admin-label">
          VENTAS
        </span>

        <h2>
          Pedidos completados
        </h2>

        <p>
          Consulta el historial de pedidos que ya fueron procesados.
        </p>
      </div>

      {/* Cuando no existen pedidos */}
      {pedidosCompletados.length === 0 ? (

        <div className="admin-card admin-empty-state text-center">

          <i className="fa-solid fa-circle-check"></i>

          <h5>
            No hay pedidos completados
          </h5>

          <p className="text-secondary mb-0">
            Los pedidos finalizados aparecerán aquí.
          </p>

        </div>

      ) : (

        /* Lista de pedidos completados */
        <div className="orders-grid">

          {pedidosCompletados.map((pedido) => (

            <div
              className="order-card order-card-completed"
              key={pedido.id}
            >

              {/* Información principal */}
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

                {/* Estado */}
                <span className="order-status completed">
                  {pedido.estado}
                </span>

              </div>

              {/* Productos del pedido */}
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

              {/* Total y estado final */}
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">

                <strong className="order-total">

                  Total: $
                  {Number(
                    pedido.total || 0
                  ).toLocaleString("es-CO")}

                </strong>

                <span className="text-success fw-bold">

                  <i className="fa-solid fa-circle-check me-2"></i>

                  Venta completada

                </span>

              </div>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}

export default PedidosCompletados;
