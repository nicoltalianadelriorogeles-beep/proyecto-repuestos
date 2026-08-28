
function ProductCard({
  icon,
  categoria,
  nombre,
  descripcion,
  precio,
  estado,
  producto,
  agregarAlCarrito
}) {
  return (
    <div className="col-md-6 col-lg-3">

      <div className="card product-card h-100 border-0 shadow-sm">

        {/* IMAGEN */}
        <div className="product-image bg-primary-subtle">

          <i
            className={`fa-solid ${icon} text-primary fa-3x`}
          ></i>

          {estado && (
            <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-3">
              {estado}
            </span>
          )}

          <button
            className="btn btn-light position-absolute top-0 end-0 m-3 rounded-circle"
            title="Ver producto"
          >
            <i className="fa-solid fa-eye text-primary"></i>
          </button>

        </div>

        {/* INFORMACIÓN */}
        <div className="card-body d-flex flex-column">

          <small className="text-warning fw-bold text-uppercase">
            {categoria}
          </small>

          <h5 className="fw-bold text-primary mt-1">
            {nombre}
          </h5>

          <p className="text-secondary small flex-grow-1">
            {descripcion}
          </p>

          <div className="d-flex justify-content-between align-items-center mt-3">

            <div>
              <small className="text-secondary d-block">
                Precio
              </small>

              <strong className="text-primary fs-5">
                ${precio}
              </strong>
            </div>

            <button
              className="btn btn-warning"
              onClick={() => agregarAlCarrito(producto)}
              title="Agregar al carrito"
            >
              <i className="fa-solid fa-cart-plus me-1"></i>
              Agregar
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;
