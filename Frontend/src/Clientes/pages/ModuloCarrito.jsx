function ModuloCarrito() {
  return (
    <main className="cliente-page">

      {/* =================================
          CARRITO
      ================================= */}
      <section className="cliente-section">

        <div className="container py-5">

          <div className="section-heading">

            <span className="cliente-label">
              COMPRA
            </span>

            <h2>
              Mi carrito
            </h2>

            <p>
              Revisa los productos seleccionados.
            </p>

          </div>


          <div className="cliente-content text-center">

            <i className="fa-solid fa-cart-shopping fa-4x text-primary mb-3"></i>

            <h3 className="fw-bold text-primary">
              Tu carrito está disponible
            </h3>

            <p className="text-secondary">
              Usa el botón del carrito en la parte superior
              para revisar tus productos y confirmar tu pedido.
            </p>

            <button
              type="button"
              className="btn btn-warning fw-bold"
            >
              <i className="fa-solid fa-cart-shopping me-2"></i>
              Abrir carrito
            </button>

          </div>

        </div>

      </section>

    </main>
  );
}



export default ModuloCarrito;