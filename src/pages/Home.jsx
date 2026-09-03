import { useState } from "react";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";

function Home({
  busqueda,
  productos,
  verProducto,
  agregarAlCarrito,
  seccion = "inicio",
  cambiarSeccion
}) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

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

  /* ================================
     BÚSQUEDA
  ================================= */

  const textoBusqueda = (busqueda || "")
    .trim()
    .toLowerCase();

  const productosFiltrados = productos.filter((producto) => {

    const texto = `
      ${producto.nombre}
      ${producto.categoria}
      ${producto.descripcion}
    `.toLowerCase();

    const coincideCategoria = categoriaSeleccionada && !textoBusqueda
      ? producto.categoria === categoriaSeleccionada
      : true;

    return texto.includes(textoBusqueda) && coincideCategoria;
  });

  return (
    <main className={`home-view home-view-${seccion}`}>

      {/* =================================
          HERO
      ================================= */}

      <section id="inicio" className="hero">

        <div className="container">

          <div className="row align-items-center g-5">

            <div className="col-lg-6">

              <span className="badge mb-3">
                REPUESTOS PARA ELECTRODOMÉSTICOS
              </span>

              <h1>
                Repuestos para tu
                <span className="text-warning">
                  {" "}hogar
                </span>
              </h1>

              <p className="lead">
                Encuentra repuestos y accesorios
                para lavadoras y aspiradoras.
              </p>

              <div className="d-flex gap-3 mt-4 flex-wrap">

                <a
                  href="#productos"
                  className="btn btn-warning fw-bold"
                  onClick={(e) => {
                    e.preventDefault();
                    cambiarSeccion("productos");
                  }}
                >
                  <i className="fa-solid fa-box-open me-2"></i>
                  Ver repuestos
                </a>

                <a
                  href="#categorias"
                  className="btn btn-outline-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    cambiarSeccion("categorias");
                  }}
                >
                  Categorías
                </a>

              </div>

            </div>

            <div className="col-lg-6">

              <div className="hero-icon">

                <i className="fa-solid fa-screwdriver-wrench"></i>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =================================
          CATEGORÍAS
      ================================= */}

      <section
        id="categorias"
        className="py-5"
      >

        <div className="container">

          <div className="text-center mb-5">

            <span className="cliente-label">
              CATEGORÍAS
            </span>

            <h2 className="fw-bold text-primary mt-2">
              Repuestos por electrodoméstico
            </h2>

            <p className="text-secondary">
              Encuentra rápidamente lo que necesitas.
            </p>

          </div>

          <div className="row g-4">

            {categorias.map((categoria) => (

              <CategoryCard
                key={categoria.nombre}
                icon={categoria.icon}
                nombre={categoria.nombre}
                descripcion={categoria.descripcion}
                onClick={() => {
                  setCategoriaSeleccionada(categoria.nombre);
                  cambiarSeccion("productos");
                }}
              />

            ))}

          </div>

        </div>

      </section>


      {/* =================================
          PRODUCTOS
      ================================= */}

      <section
        id="productos"
        className="py-5"
      >

        <div className="container">

          <div className="d-flex justify-content-between align-items-end mb-4 flex-wrap gap-2">

            <div>

              <span className="cliente-label">
                CATÁLOGO
              </span>

                  <h2 className="fw-bold text-primary mt-2 mb-0">

                {categoriaSeleccionada
                  ? `Repuestos para ${categoriaSeleccionada}`
                  : textoBusqueda
                  ? `Resultados para "${busqueda}"`
                  : "Repuestos destacados"}

              </h2>

            </div>

            {textoBusqueda && (

              <span className="badge bg-primary">
                {productosFiltrados.length} resultado(s)
              </span>

            )}

          </div>


          {/* PRODUCTOS */}

          {productosFiltrados.length > 0 ? (

            <div className="row g-4">

              {productosFiltrados.map((producto) => (

                <ProductCard
                  key={producto.id}
                  producto={producto}
                  icon={producto.icon}
                  categoria={producto.categoria}
                  nombre={producto.nombre}
                  descripcion={producto.descripcion}
                  precio={producto.precio}
                  estado={producto.estado}
                  verProducto={verProducto}
                  agregarAlCarrito={agregarAlCarrito}
                />

              ))}

            </div>

          ) : (

            <div className="cliente-empty text-center">

              <i className="fa-solid fa-box-open fa-4x text-secondary mb-3"></i>

              <h4 className="text-primary fw-bold">
                No encontramos ese repuesto
              </h4>

              <p className="text-secondary">
                Prueba con bomba, motor, filtro,
                correa o manguera.
              </p>

            </div>

          )}

        </div>

      </section>


      {/* =================================
          BENEFICIOS
      ================================= */}

      <section className="benefits-section py-5 bg-primary text-white">

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


      {/* =================================
          NOSOTROS
      ================================= */}

      <section
        id="nosotros"
        className="py-5"
      >

        <div className="container">
          <div className="about-layout">
            <div className="about-intro">
              <span className="cliente-label">SOBRE NOSOTROS</span>
              <h2 className="fw-bold text-primary mt-2">
                Repuestos que mantienen tu hogar en marcha
              </h2>
              <p className="about-text">
                En Producciones Angel conectamos experiencia técnica,
                repuestos confiables y atención cercana para que reparar
                tus electrodomésticos sea una decisión sencilla.
              </p>
              <div className="about-highlight">
                <i className="fa-solid fa-circle-check"></i>
                <span>Asesoría para elegir la referencia adecuada</span>
              </div>
            </div>

            <div className="about-grid">
              <article className="about-card">
                <div className="about-card-icon"><i className="fa-solid fa-bullseye"></i></div>
                <h3>Soluciones precisas</h3>
                <p>Catálogo enfocado en lavadoras y aspiradoras de uso doméstico.</p>
              </article>
              <article className="about-card">
                <div className="about-card-icon orange"><i className="fa-solid fa-handshake"></i></div>
                <h3>Atención cercana</h3>
                <p>Te acompañamos antes y después de tu compra.</p>
              </article>
              <article className="about-card about-card-wide">
                <div className="about-card-icon"><i className="fa-solid fa-location-dot"></i></div>
                <div>
                  <h3>Estamos para ayudarte</h3>
                  <p>Envíos a todo Colombia y soporte personalizado para encontrar lo que necesitas.</p>
                </div>
              </article>
            </div>
          </div>

        </div>

      </section>


      {/* =================================
          FOOTER
      ================================= */}

      <footer className="bg-dark text-white">

        <div className="container py-5">

          <div className="row g-4">

            <div className="col-md-6">

              <h4 className="fw-bold">

                Producciones

                <span className="text-warning">
                  {" "}Angel
                </span>

              </h4>

              <p className="text-secondary">
                Repuestos y accesorios para
                electrodomésticos.
              </p>

            </div>


            <div className="col-md-6">

              <h5>
                Contacto
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

        </div>

      </footer>

    </main>
  );
}

export default Home;