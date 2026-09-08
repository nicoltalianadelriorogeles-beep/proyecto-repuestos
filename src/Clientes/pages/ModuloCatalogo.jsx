const productos = [
  { icon: "fa-gears", categoria: "Lavadoras", nombre: "Repuesto para lavadora", descripcion: "Repuesto de calidad para electrodomésticos.", precio: "50.000" },
  { icon: "fa-circle-notch", categoria: "Lavadoras", nombre: "Correa para lavadora", descripcion: "Correa de repuesto para diferentes modelos.", precio: "35.000" },
  { icon: "fa-filter", categoria: "Aspiradoras", nombre: "Filtro para aspiradora", descripcion: "Filtro para mantener el funcionamiento adecuado.", precio: "28.000" },
  { icon: "fa-wind", categoria: "Aspiradoras", nombre: "Manguera para aspiradora", descripcion: "Manguera de repuesto para aspiradoras.", precio: "45.000" }
];

function ModuloCatalogo() {
  return (
    <main className="cliente-page">
      <section className="cliente-section">
        <div className="container py-5">
          <div className="section-heading">
            <span className="cliente-label">CATÁLOGO</span>
            <h2>Nuestros repuestos</h2>
            <p>Encuentra el repuesto que necesitas.</p>
          </div>

          <div className="row g-4">
            {productos.map((producto) => (
              <div className="col-md-6 col-lg-3" key={producto.nombre}>
                <article className="card cliente-product-card h-100">
                  <div className="cliente-product-icon">
                    <i className={`fa-solid ${producto.icon}`}></i>
                    <span className="badge bg-warning text-dark">Disponible</span>
                    <button type="button" className="btn btn-light product-eye" title="Ver detalles del producto">
                      <i className="fa-solid fa-eye text-primary"></i>
                    </button>
                  </div>
                  <div className="card-body d-flex flex-column">
                    <small className="text-warning fw-bold">{producto.categoria}</small>
                    <h5 className="fw-bold text-primary mt-2">{producto.nombre}</h5>
                    <p className="text-secondary small flex-grow-1">{producto.descripcion}</p>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <strong className="text-primary fs-5">${producto.precio}</strong>
                      <button type="button" className="btn btn-warning">
                        <i className="fa-solid fa-cart-plus me-1"></i>Agregar
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default ModuloCatalogo;
