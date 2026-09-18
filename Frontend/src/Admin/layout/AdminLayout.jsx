import { Outlet, useNavigate } from "react-router-dom";
import AdminHeader from "../components/HeaderAdmin";

function AdminLayout({ usuarioActual = null, cerrarSesion }) {
  const navigate = useNavigate();

  const salir = cerrarSesion || (() => navigate("/"));

  const cambiarSeccionAdmin = (seccion) => {
    navigate(`/admin/${seccion}`);
  };

  return (
    <div className="admin-layout">

      <AdminHeader
        usuarioActual={usuarioActual}
        cambiarSeccionAdmin={cambiarSeccionAdmin}
        cerrarSesion={salir}
      />

      <main className="admin-main">
        <Outlet />
      </main>

    </div>
  );
}

export default AdminLayout;