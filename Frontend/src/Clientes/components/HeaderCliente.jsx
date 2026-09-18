import { useNavigate, useLocation } from "react-router-dom";
import logoProduccionesAngel from "../../assets/logo_producciones_angel.png";

function HeaderCliente({ usuarioActual }) {
  const navigate = useNavigate();
  const location = useLocation();
  const nombre = usuarioActual?.primerNombre || "Cliente";

  const opciones = [
    { ruta: "/cliente/inicio", icono: "fa-house", texto: "Inicio" },
    { ruta: "/cliente/catalogo", icono: "fa-box-open", texto: "Repuestos" },
    { ruta: "/cliente/categorias", icono: "fa-layer-group", texto: "Categorías" },
    { ruta: "/cliente/perfil", icono: "fa-user", texto: "Mi perfil" },
    { ruta: "/cliente/carrito", icono: "fa-cart-shopping", texto: "Carrito" }
  ];

  return (
    <>
      <header className="main-header cliente-main-header">
        <div className="container header-container">
          <button type="button" className="header-logo-button" onClick={() => navigate("/cliente/inicio")}>
            <span className="header-logo-mark">
              <img className="header-logo-image" src={logoProduccionesAngel} alt="Producciones Angel" />
            </span>
            <div className="header-logo-text">
              <h4>Producciones <span>Angel</span></h4>
              <small>ÁREA DEL CLIENTE</small>
            </div>
          </button>

          <div className="header-actions">
            <span className="client-user-name btn-header">
              <i className="fa-solid fa-user"></i>
              {nombre}
            </span>
            <button type="button" className="btn-header logout" onClick={() => navigate("/")}>
              <i className="fa-solid fa-right-from-bracket"></i>
              Salir
            </button>
          </div>
        </div>
      </header>

      <nav className="main-nav cliente-nav">
        <div className="container nav-container">
          <div className="nav-links">
            {opciones.map((opcion) => (
              <button
                key={opcion.ruta}
                type="button"
                className={`nav-link ${location.pathname === opcion.ruta ? "active" : ""}`}
                onClick={() => navigate(opcion.ruta)}
              >
                <i className={`fa-solid ${opcion.icono}`}></i>
                {opcion.texto}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}

export default HeaderCliente;
