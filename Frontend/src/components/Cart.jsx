function Cart({
  carrito,
  abierto,
  cerrarCarrito,
  aumentarCantidad,
  disminuirCantidad,
  eliminarProducto,
  vaciarCarrito,
  finalizarCompra,
}) {
  if (!abierto) {
    return null;
  }

  const convertirPrecio = (precio) => {
    if (typeof precio === "number") {
      return precio;
    }

    return (
      Number(
        String(precio)
          .replace(/\./g, "")
          .replace(/[^\d]/g, "")
      ) || 0
    );
  };

  const formatearPrecio = (valor) =>
    new Intl.NumberFormat("es-CO").format(valor);

  const cantidadProductos = carrito.reduce(
    (total, producto) =>
      total + producto.cantidad,
    0
  );

  const total = carrito.reduce(
    (suma, producto) =>
      suma +
      convertirPrecio(producto.precio) *
        producto.cantidad,
    0
  );

  return (
    <>
      {/* FONDO */}
      <div
        className="cart-overlay"
        onClick={cerrarCarrito}
      ></div>

      {/* CARRITO */}
      <aside className="cart-sidebar cart-open">

        {/* HEADER */}
        <div className="cart-header">
          <div>
            <h4 className="mb-1">
              <i className="fa-solid fa-cart-shopping me-2"></i>
              Mi carrito
            </h4>

            <small>
              {cantidadProductos} producto(s)
            </small>
          </div>

          <button
            type="button"
            className="cart-close"
            onClick={cerrarCarrito}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* CARRITO VACÍO */}
        {carrito.length === 0 ? (
          <div className="cart-empty">
            <i className="fa-solid fa-cart-shopping fa-4x mb-3"></i>

            <h5>
              Tu carrito está vacío
            </h5>

            <p>
              Agrega repuestos para comenzar.
            </p>

            <button
              type="button"
              className="btn btn-warning"
              onClick={cerrarCarrito}
            >
              Ver productos
            </button>
          </div>
        ) : (
          <>
            {/* PRODUCTOS */}
            <div className="cart-body">
              {carrito.map((producto) => {
                const precio = convertirPrecio(
                  producto.precio
                );

                return (
                  <div
                    className="cart-item"
                    key={producto.id}
                  >
                    <div className="cart-item-image">
                      <div className="cart-item-icon">
                        <i
                          className={`fa-solid ${producto.icon}`}
                        ></i>
                      </div>
                    </div>

                    <div>
                      <h4>
                        {producto.nombre}
                      </h4>

                      <span className="cart-item-price">
                        ${formatearPrecio(precio)}
                      </span>

                      <div className="cart-quantity">
                        <button
                          type="button"
                          onClick={() =>
                            disminuirCantidad(
                              producto.id
                            )
                          }
                        >
                          <i className="fa-solid fa-minus"></i>
                        </button>

                        <strong>
                          {producto.cantidad}
                        </strong>

                        <button
                          type="button"
                          onClick={() =>
                            aumentarCantidad(
                              producto.id
                            )
                          }
                        >
                          <i className="fa-solid fa-plus"></i>
                        </button>

                        <button
                          type="button"
                          className="cart-delete"
                          onClick={() =>
                            eliminarProducto(
                              producto.id
                            )
                          }
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>

                    <strong className="cart-item-total">
                      $
                      {formatearPrecio(
                        precio *
                          producto.cantidad
                      )}
                    </strong>
                  </div>
                );
              })}
            </div>

            {/* FOOTER */}
            <div className="cart-footer">
              <div className="cart-total">
                <span>Total</span>

                <strong>
                  ${formatearPrecio(total)}
                </strong>
              </div>

              <button
                type="button"
                className="cart-confirm-button"
                onClick={finalizarCompra}
              >
                <i className="fa-solid fa-check me-2"></i>
                Confirmar pedido
              </button>

              <button
                type="button"
                className="btn btn-outline-danger w-100 mt-2"
                onClick={vaciarCarrito}
              >
                <i className="fa-solid fa-trash me-2"></i>
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export default Cart;