import { Link, useLocation } from "react-router-dom";
import logoProduccionesAngel from "../../assets/logo_producciones_angel.png";

const opciones = [
  { ruta: "/", texto: "Inicio", icono: "fa-house" },
  { ruta: "/login", texto: "Ingresar", icono: "fa-right-to-bracket" },
  { ruta: "/registro", texto: "Registrarse", icono: "fa-user-plus" }
];

function HeaderHome() {
  const location = useLocation();

  return (
    <>
      <header className="main-header home-main-header">
        <div className="container header-container">
          <Link className="header-logo-button" to="/">
            <span className="header-logo-mark">
              <img className="header-logo-image" src={logoProduccionesAngel} alt="Producciones Angel" />
            </span>
            <span className="header-logo-text">
              <h4>Producciones <span>Angel</span></h4>
              <small>REPUESTOS PARA ELECTRODOMÉSTICOS</small>
            </span>
          </Link>
        </div>
      </header>

      <nav className="main-nav home-nav">
        <div className="container nav-container">
          <div className="nav-links">
            {opciones.map((opcion) => (
              <Link
                key={opcion.ruta}
                className={`nav-link ${location.pathname === opcion.ruta ? "active" : ""}`}
                to={opcion.ruta}
              >
                <i className={`fa-solid ${opcion.icono}`}></i>
                {opcion.texto}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}

export default HeaderHome;
