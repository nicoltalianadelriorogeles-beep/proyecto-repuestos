
function Cart({
  carrito,
  abierto,
  cerrarCarrito,
  aumentarCantidad,
  disminuirCantidad,
  eliminarProducto,
  vaciarCarrito
}) {

  const total = carrito.reduce(
    (suma, producto) =>
      suma + Number(producto.precio.replace(".", "")) * producto.cantidad,
    0
  );

  const formatearPrecio = (valor) =>
    new Intl.NumberFormat("es-CO").format(valor);

  return (
    <>
      {/* FONDO OSCURO */}
      {abierto && (
        <div
          className="cart-overlay"
          onClick={cerrarCarrito}
        ></div>
      )}

      {/* CARRITO */}
      <aside className={`cart-panel ${abierto ? "cart-open" : ""}`}>

        <div className="cart-header">

          <div>
            <h4 className="text-primary fw-bold mb-1">
              <i className="fa-solid fa-cart-shopping me-2"></i>
              Mi carrito
            </h4>

            <small className="text-secondary">
              {carrito.length} producto(s)
            </small>
          </div>

          <button
            className="btn btn-light"
            onClick={cerrarCarrito}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

        </div>

        {/* CARRITO VACÍO */}
        {carrito.length === 0 ? (

          <div className="cart-empty text-center">

            <i className="fa-solid fa-cart-shopping fa-4x text-secondary mb-3"></i>

            <h5 className="text-primary">
              Tu carrito está vacío
            </h5>

            <p className="text-secondary">
              Agrega repuestos para comenzar tu compra.
            </p>

            <button
              className="btn btn-warning fw-bold"
              onClick={cerrarCarrito}
            >
              Ver productos
            </button>

          </div>

        ) : (

          <>

            {/* PRODUCTOS */}
            <div className="cart-products">

              {carrito.map((producto) => {

                const precio =
                  Number(producto.precio.replace(".", ""));

                return (
                  <div
                    className="cart-item"
                    key={producto.id}
                  >

                    <div className="cart-item-icon">
                      <i
                        className={`fa-solid ${producto.icon}`}
                      ></i>
                    </div>

                    <div className="cart-item-info">

                      <h6 className="text-primary fw-bold">
                        {producto.nombre}
                      </h6>

                      <small className="text-secondary">
                        ${formatearPrecio(precio)}
                      </small>

                      <div className="d-flex align-items-center mt-2 gap-2">

                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() =>
                            disminuirCantidad(producto.id)
                          }
                        >
                          <i className="fa-solid fa-minus"></i>
                        </button>

                        <span className="fw-bold">
                          {producto.cantidad}
                        </span>

                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() =>
                            aumentarCantidad(producto.id)
                          }
                        >
                          <i className="fa-solid fa-plus"></i>
                        </button>

                      </div>

                    </div>

                    <div className="text-end">

                      <strong className="text-primary">
                        $
                        {formatearPrecio(
                          precio * producto.cantidad
                        )}
                      </strong>

                      <button
                        className="btn btn-sm btn-link text-danger d-block ms-auto"
                        onClick={() =>
                          eliminarProducto(producto.id)
                        }
                        title="Eliminar"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>

                    </div>

                  </div>
                );
              })}

            </div>

            {/* TOTAL */}
            <div className="cart-footer">

              <div className="d-flex justify-content-between mb-3">

                <span className="fw-bold">
                  Total
                </span>

                <strong className="text-primary fs-4">
                  ${formatearPrecio(total)}
                </strong>

              </div>

              <button className="btn btn-warning w-100 fw-bold py-2">
                <i className="fa-solid fa-credit-card me-2"></i>
                Proceder al pago
              </button>

              <button
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
