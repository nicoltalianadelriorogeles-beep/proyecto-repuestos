
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";

function Home({
  busqueda,
  productos,
  agregarAlCarrito
}) {

  const categorias = [
    {
      icon: "fa-soap",
      nombre: "Lavadoras",
      descripcion:
        "Bombas, correas, motores, filtros y electroválvulas."
    },
    {
      icon: "fa-broom",
      nombre: "Aspiradoras",
      descripcion:
        "Filtros, mangueras, motores, cepillos y accesorios."
    }
  ];


  const textoBusqueda =
    (busqueda || "")
      .trim()
      .toLowerCase();


  const productosFiltrados =
    (productos || []).filter(
      (producto) => {

        const textoProducto = `
          ${producto.nombre}
          ${producto.categoria}
          ${producto.descripcion}
        `.toLowerCase();

        return textoProducto.includes(
          textoBusqueda
        );
      }
    );


  return (
    <>

      {/* HERO */}

      <section
        id="inicio"
        className="hero py-5"
      >

        <div className="container">

          <div className="row align-items-center g-5">

            <div className="col-lg-6">

              <span className="badge bg-warning text-dark mb-3 p-2">
                REPUESTOS PARA ELECTRODOMÉSTICOS
              </span>

              <h1 className="display-4 fw-bold text-primary">

                Repuestos para tu

                <span className="text-warning">
                  {" "}hogar
                </span>

              </h1>

              <p className="lead text-secondary">

                Repuestos y accesorios para
                lavadoras y aspiradoras.

              </p>


              <div className="d-flex gap-3 mt-4">

                <a
                  href="#productos"
                  className="btn btn-warning btn-lg fw-bold"
                >
                  <i className="fa-solid fa-box-open me-2"></i>
                  Ver repuestos
                </a>


                <a
                  href="#categorias"
                  className="btn btn-outline-primary btn-lg"
                >
                  Categorías
                </a>

              </div>

            </div>


            <div className="col-lg-6 text-center">

              <div className="hero-icon">

                <i className="fa-solid fa-screwdriver-wrench"></i>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* CATEGORÍAS */}

      <section
        id="categorias"
        className="py-5 bg-white"
      >

        <div className="container">

          <div className="text-center mb-5">

            <span className="text-warning fw-bold">
              CATEGORÍAS
            </span>

            <h2 className="fw-bold text-primary">
              Repuestos por electrodoméstico
            </h2>

            <p className="text-secondary">
              Encuentra rápidamente lo que necesitas.
            </p>

          </div>


          <div className="row g-4">

            {categorias.map(
              (categoria) => (

                <CategoryCard
                  key={categoria.nombre}
                  icon={categoria.icon}
                  nombre={categoria.nombre}
                  descripcion={
                    categoria.descripcion
                  }
                />

              )
            )}

          </div>

        </div>

      </section>


      {/* PRODUCTOS */}

      <section
        id="productos"
        className="py-5 bg-light"
      >

        <div className="container">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>

              <span className="text-warning fw-bold">
                CATÁLOGO
              </span>

              <h2 className="fw-bold text-primary">

                {textoBusqueda
                  ? `Resultados para "${busqueda}"`
                  : "Repuestos destacados"}

              </h2>

            </div>


            {textoBusqueda && (

              <span className="badge bg-primary fs-6">

                {productosFiltrados.length}
                {" "}resultado(s)

              </span>

            )}

          </div>


          {productosFiltrados.length > 0 ? (

            <div className="row g-4">

              {productosFiltrados.map(
                (producto) => (

                  <ProductCard
                    key={producto.id}
                    icon={producto.icon}
                    categoria={
                      producto.categoria
                    }
                    nombre={
                      producto.nombre
                    }
                    descripcion={
                      producto.descripcion
                    }
                    precio={
                      producto.precio
                    }
                    estado={
                      producto.estado
                    }
                    producto={producto}
                    agregarAlCarrito={
                      agregarAlCarrito
                    }
                  />

                )
              )}

            </div>

          ) : (

            <div className="text-center py-5">

              <i className="fa-solid fa-box-open fa-4x text-secondary mb-3"></i>

              <h4 className="text-primary">
                No encontramos ese repuesto
              </h4>

              <p className="text-secondary">
                Prueba con: bomba, motor,
                filtro, correa o manguera.
              </p>

            </div>

          )}

        </div>

      </section>


      {/* BENEFICIOS */}

      <section className="py-5 bg-primary text-white">

        <div className="container">

          <div className="row g-4">

            <div className="col-md-4">

              <div className="d-flex align-items-center">

                <i className="fa-solid fa-truck-fast fa-2x text-warning"></i>

                <div className="ms-3">

                  <h5 className="fw-bold">
                    Envíos rápidos
                  </h5>

                  <small>
                    Enviamos a todo Colombia.
                  </small>

                </div>

              </div>

            </div>


            <div className="col-md-4">

              <div className="d-flex align-items-center">

                <i className="fa-solid fa-shield-halved fa-2x text-warning"></i>

                <div className="ms-3">

                  <h5 className="fw-bold">
                    Compra segura
                  </h5>

                  <small>
                    Productos seleccionados.
                  </small>

                </div>

              </div>

            </div>


            <div className="col-md-4">

              <div className="d-flex align-items-center">

                <i className="fa-solid fa-headset fa-2x text-warning"></i>

                <div className="ms-3">

                  <h5 className="fw-bold">
                    Soporte
                  </h5>

                  <small>
                    Atención personalizada.
                  </small>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* NOSOTROS */}

      <section
        id="nosotros"
        className="py-5"
      >

        <div className="container text-center">

          <span className="text-warning fw-bold">
            SOBRE NOSOTROS
          </span>

          <h2 className="fw-bold text-primary mt-2">
            Producciones Angel
          </h2>

          <p className="text-secondary mx-auto about-text">

            Somos una tienda especializada en
            repuestos para lavadoras y aspiradoras,
            ofreciendo soluciones para el
            mantenimiento de electrodomésticos.

          </p>

        </div>

      </section>


      {/* FOOTER */}

      <footer
        id="contacto"
        className="bg-dark text-white pt-5"
      >

        <div className="container">

          <div className="row g-4 pb-4">


            <div className="col-md-5">

              <h4 className="fw-bold">

                Producciones{" "}

                <span className="text-warning">
                  Angel
                </span>

              </h4>

              <p className="text-secondary">
                Repuestos y accesorios para
                electrodomésticos.
              </p>

            </div>


            <div className="col-md-3">

              <h5>
                Enlaces
              </h5>

              <a
                href="#inicio"
                className="footer-link"
              >
                Inicio
              </a>

              <a
                href="#productos"
                className="footer-link"
              >
                Productos
              </a>

              <a
                href="#categorias"
                className="footer-link"
              >
                Categorías
              </a>

            </div>


            <div className="col-md-4">

              <h5>
                Contáctanos
              </h5>

              <p>
                <i className="fa-solid fa-phone text-warning me-2"></i>
                300 000 0000
              </p>

              <p>
                <i className="fa-solid fa-envelope text-warning me-2"></i>
                contacto@produccionesangel.com
              </p>

            </div>

          </div>


          <div className="border-top border-secondary py-3 text-center small">

            © 2026 Producciones Angel —
            Todos los derechos reservados.

          </div>

        </div>

      </footer>

    </>
  );
}

export default Home;
