import { useNavigate } from "react-router-dom";
import logoProduccionesAngel from "../../assets/logo_producciones_angel.png";

function AdminHeader({ usuarioActual }) {

  const navigate = useNavigate();

  return (
    <>

      <header className="main-header">

        <div className="container header-container">

          <button
            type="button"
            className="header-logo-button"
            onClick={() => navigate("/admin")}
          >

            <span className="header-logo-mark">

              <img
                className="header-logo-image"
                src={logoProduccionesAngel}
                alt="Producciones Angel"
              />

            </span>

            <div className="header-logo-text">

              <h4>
                Producciones <span>Angel</span>
              </h4>

              <small>PANEL ADMINISTRATIVO</small>

            </div>

          </button>

          <div className=" header-actions">

            <span className="admin-user-name btn-header">

              <i className="fa-solid fa-user-shield"></i>

              {usuarioActual?.primerNombre || "Administrador"}

            </span>

            <button
              type="button"
              className="btn-header logout"
              onClick={() => navigate("/")}
            >

              <i className="fa-solid fa-right-from-bracket"></i>

              Salir

            </button>

          </div>

        </div>

      </header>

      <nav className="main-nav">

        <div className="container nav-container">

          <div className="nav-links">

            <button
              type="button"
              className="nav-link"
              onClick={() => navigate("/admin")}
            >
              <i className="fa-solid fa-chart-line"></i>
              Dashboard
            </button>

            <button
              type="button"
              className="nav-link"
              onClick={() => navigate("/admin/productos")}
            >
              <i className="fa-solid fa-boxes-stacked"></i>
              Gestionar productos
            </button>

            <button
              type="button"
              className="nav-link"
              onClick={() => navigate("/admin/usuarios")}
            >
              <i className="fa-solid fa-users"></i>
              Gestionar usuarios
            </button>

            <button
              type="button"
              className="nav-link"
              onClick={() => navigate("/admin/pendientes")}
            >
              <i className="fa-solid fa-clock"></i>
              Pedidos pendientes
            </button>

            <button
              type="button"
              className="nav-link"
              onClick={() => navigate("/admin/completados")}
            >
              <i className="fa-solid fa-circle-check"></i>
              Pedidos completados
            </button>

            <button
              type="button"
              className="nav-link"
              onClick={() => navigate("/admin/pqr")}
            >
              <i className="fa-solid fa-headset"></i>
              PQR y reclamos
            </button>

            <button
              type="button"
              className="nav-link"
              onClick={() => navigate("/admin/facturas")}
            >
              <i className="fa-solid fa-file-invoice"></i>
              Facturas
            </button>

          </div>

        </div>

      </nav>
    </>
  );
}

export default AdminHeader;