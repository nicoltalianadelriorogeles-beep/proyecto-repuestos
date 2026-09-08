import { Outlet } from "react-router-dom";
import HeaderCliente from "../components/HeaderCliente";

function ClienteLayout() {
  const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual") || "null");

  return (
    <div className="cliente-layout">
      <HeaderCliente usuarioActual={usuarioActual} />
      <main className="cliente-main">
        <Outlet />
      </main>
    </div>
  );
}

export default ClienteLayout;
