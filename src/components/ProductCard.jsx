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

      <div className="card product-card h-100">


        <div className="product-image">

          <i
            className={`fa-solid ${icon}`}
          ></i>


          {estado && (

            <span className="badge bg-warning text-dark">

              {estado}

            </span>

          )}


          <button
            type="button"
            className="btn btn-light"
          >

            <i className="fa-solid fa-eye text-primary"></i>

          </button>

        </div>


        <div className="card-body d-flex flex-column">

          <small className="text-warning fw-bold">

            {categoria}

          </small>


          <h5 className="fw-bold text-primary">

            {nombre}

          </h5>


          <p className="text-secondary small flex-grow-1">

            {descripcion}

          </p>


          <div className="d-flex justify-content-between align-items-center mt-3">


            <strong className="text-primary fs-5">

              ${precio}

            </strong>


            <button
              type="button"
              className="btn btn-warning"
              onClick={() =>
                agregarAlCarrito(
                  producto
                )
              }
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