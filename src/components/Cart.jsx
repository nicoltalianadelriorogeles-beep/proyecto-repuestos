function Cart({
  carrito,
  abierto,
  cerrarCarrito,
  aumentarCantidad,
  disminuirCantidad,
  eliminarProducto,
  vaciarCarrito
}) {

  const convertirPrecio = (precio) => {

    if (
      typeof precio === "number"
    ) {
      return precio;
    }

    return Number(
      String(precio)
        .replace(/\./g, "")
        .replace(",", ".")
        .replace(/[^\d.]/g, "")
    ) || 0;
  };


  const formatearPrecio = (valor) => {

    return new Intl.NumberFormat(
      "es-CO"
    ).format(valor);

  };


  const total = carrito.reduce(
    (suma, producto) =>
      suma +
      convertirPrecio(
        producto.precio
      ) *
        producto.cantidad,
    0
  );


  return (
    <>
      {abierto && (

        <div
          className="cart-overlay"
          onClick={cerrarCarrito}
        ></div>

      )}


      <aside
        className={`cart-panel ${
          abierto
            ? "cart-open"
            : ""
        }`}
      >


        {/* HEADER */}

        <div className="cart-header">

          <div>

            <h4 className="fw-bold text-primary mb-1">

              <i className="fa-solid fa-cart-shopping me-2"></i>

              Mi carrito

            </h4>


            <small className="text-secondary">

              {carrito.length} producto(s)

            </small>

          </div>


          <button
            type="button"
            className="btn btn-light"
            onClick={cerrarCarrito}
          >

            <i className="fa-solid fa-xmark"></i>

          </button>

        </div>


        {/* VACÍO */}

        {carrito.length === 0 ? (

          <div className="cart-empty text-center">

            <i className="fa-solid fa-cart-shopping fa-4x text-secondary mb-3"></i>


            <h5 className="text-primary fw-bold">

              Tu carrito está vacío

            </h5>


            <p className="text-secondary">

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

            <div className="cart-products">

              {carrito.map(
                (producto) => {

                  const precio =
                    convertirPrecio(
                      producto.precio
                    );


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

                          $
                          {formatearPrecio(
                            precio
                          )}

                        </small>


                        <div className="d-flex align-items-center gap-2 mt-2">


                          <button
                            type="button"
                            className="btn btn-sm btn-outline-primary"
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
                            className="btn btn-sm btn-outline-primary"
                            onClick={() =>
                              aumentarCantidad(
                                producto.id
                              )
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
                            precio *
                            producto.cantidad
                          )}

                        </strong>


                        <button
                          type="button"
                          className="btn btn-sm btn-link text-danger d-block ms-auto"
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

                  );

                }
              )}

            </div>


            {/* FOOTER */}

            <div className="cart-footer">

              <div className="d-flex justify-content-between align-items-center mb-3">

                <span className="fw-bold">
                  Total
                </span>


                <strong className="text-primary fs-4">

                  $
                  {formatearPrecio(
                    total
                  )}

                </strong>

              </div>


              <button
                type="button"
                className="btn btn-warning w-100 fw-bold"
              >

                <i className="fa-solid fa-credit-card me-2"></i>

                Proceder al pago

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