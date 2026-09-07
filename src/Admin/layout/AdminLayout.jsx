import { Outlet, useNavigate } from "react-router-dom";
import AdminHeader from "../components/HeaderAdmin";

function AdminLayout({ usuarioActual, cerrarSesion }) {
  const navigate = useNavigate();

  const cambiarSeccionAdmin = (seccion) => {
    navigate(`/admin/${seccion}`);
  };

  return (
    <div className="admin-layout">

      <AdminHeader
        usuarioActual={usuarioActual}
        cambiarSeccionAdmin={cambiarSeccionAdmin}
        cerrarSesion={cerrarSesion}
      />

      <main className="admin-main">
        <Outlet />
      </main>

    </div>
  );
}

export default AdminLayout;