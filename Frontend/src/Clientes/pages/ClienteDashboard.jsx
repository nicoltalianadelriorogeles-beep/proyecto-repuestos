function ClienteDashboard() {
return ( <main className="cliente-page">

```
  {/* =================================
      DASHBOARD DEL CLIENTE
  ================================= */}

  <section className="cliente-section cliente-home">

    <div className="container py-5">

      <div className="row align-items-center g-5">

        {/* =================================
            INFORMACIÓN DE BIENVENIDA
        ================================= */}

        <div className="col-lg-7">

          <span className="cliente-label">
            ÁREA DEL CLIENTE
          </span>

          <h1 className="cliente-title">
            Hola, <span>Cliente</span>
          </h1>

          <p className="cliente-subtitle">
            Bienvenido a tu espacio de Producciones Angel.
          </p>

          <p className="text-secondary">
            Desde aquí puedes consultar nuestros repuestos,
            revisar las categorías y administrar tu información.
          </p>

          <div className="d-flex gap-3 mt-4 flex-wrap">

            <button
              type="button"
              className="btn btn-warning fw-bold"
            >
              <i className="fa-solid fa-box-open me-2"></i>
              Ver repuestos
            </button>

            <button
              type="button"
              className="btn btn-outline-primary"
            >
              <i className="fa-solid fa-user me-2"></i>
              Mi perfil
            </button>

          </div>

        </div>


        {/* =================================
            TARJETA DEL DASHBOARD
        ================================= */}

        <div className="col-lg-5">

          <div className="cliente-hero-card">

            <div className="cliente-big-icon">

              <i className="fa-solid fa-house-user"></i>

            </div>

            <h4>
              Tu espacio personal
            </h4>

            <p>
              Consulta productos y administra tus datos
              desde un solo lugar.
            </p>

          </div>

        </div>

      </div>

    </div>

  </section>

</main>

);
}



export default ClienteDashboard;


