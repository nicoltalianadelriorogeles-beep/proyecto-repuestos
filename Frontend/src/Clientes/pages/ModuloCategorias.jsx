function ModuloCategorias() {
  return (
    <main className="cliente-page">

      <section className="cliente-section">

        <div className="container py-5">

          {/* ENCABEZADO */}
          <div className="section-heading">

            <span className="cliente-label">
              CATEGORÍAS
            </span>

            <h2>
              Repuestos por categoría
            </h2>

            <p>
              Selecciona el tipo de electrodoméstico.
            </p>

          </div>


          {/* CATEGORÍAS */}
          <div className="row g-4">

            {/* LAVADORAS */}
            <div className="col-md-6">

              <div className="cliente-category-large">

                <div className="cliente-category-icon blue">

                  <i className="fa-solid fa-soap"></i>

                </div>

                <div>

                  <h3>
                    Lavadoras
                  </h3>

                  <p>
                    Bombas, correas, motores,
                    filtros y electroválvulas.
                  </p>

                  <button
                    type="button"
                    className="btn btn-outline-primary"
                  >
                    Ver repuestos

                    <i className="fa-solid fa-arrow-right ms-2"></i>
                  </button>

                </div>

              </div>

            </div>


            {/* ASPIRADORAS */}
            <div className="col-md-6">

              <div className="cliente-category-large orange">

                <div className="cliente-category-icon orange">

                  <i className="fa-solid fa-broom"></i>

                </div>

                <div>

                  <h3>
                    Aspiradoras
                  </h3>

                  <p>
                    Filtros, mangueras,
                    motores y accesorios.
                  </p>

                  <button
                    type="button"
                    className="btn btn-outline-warning"
                  >
                    Ver repuestos

                    <i className="fa-solid fa-arrow-right ms-2"></i>
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default ModuloCategorias;