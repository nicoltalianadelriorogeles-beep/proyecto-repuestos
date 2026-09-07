
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import "./App.css";

// Layout
import AdminLayout from "./Admin/layout/AdminLayout";

// Páginas del administrador
import AdminDashboard from "./Admin/pages/AdminDashboard";
import Productos from "./Admin/pages/ModuloProductos";
import Usuarios from "./Admin/pages/ModuloUsuarios";
import PedidosPendientes from "./Admin/pages/ModuloPedidosPendientes";
import PedidosCompletados from "./Admin/pages/ModuloPedidosCompletados";
import Pqr from "./Admin/pages/ModuloPqr";
import Facturas from "./Admin/pages/ModuloFacturas";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* =====================================
            PANEL PRINCIPAL DEL ADMINISTRADOR
            ===================================== */}
        <Route
          path="/admin"
          element={
            <AdminLayout />
          }
        >

          {/* Dashboard */}
          <Route
            index
            element={
              <AdminDashboard />
            }
          />

          {/* Gestión de productos */}
          <Route
            path="productos"
            element={
              <Productos />
            }
          />

          {/* Gestión de usuarios */}
          <Route
            path="usuarios"
            element={
              <Usuarios />
            }
          />

          {/* Pedidos pendientes */}
          <Route
            path="pendientes"
            element={
              <PedidosPendientes />
            }
          />

          {/* Pedidos completados */}
          <Route
            path="completados"
            element={
              <PedidosCompletados />
            }
          />

          {/* PQR y reclamos */}
          <Route
            path="pqr"
            element={
              <Pqr />
            }
          />

          {/* Facturas */}
          <Route
            path="facturas"
            element={
              <Facturas />
            }
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;
