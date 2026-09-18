import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import "./App.css";

// =====================================
// PÁGINA PRINCIPAL
// =====================================
import HomeLayout from "./Home/layout/HomeLayout";

// =====================================
// AUTENTICACIÓN
// =====================================
import Login from "./pages/Login";
import Registro from "./pages/Registro";

// =====================================
// ADMINISTRADOR
// =====================================
import Productos from "./Admin/pages/ModuloProductos";
import Usuarios from "./Admin/pages/ModuloUsuarios";
import AdminDashboard from "./Admin/pages/AdminDashboard";
import PedidosPendientes from "./Admin/pages/ModuloPedidosPendientes";
import PedidosCompletados from "./Admin/pages/ModuloPedidosCompletados";
import ModuloPqr from "./Admin/pages/ModuloPqr";
import ModuloFacturas from "./Admin/pages/ModuloFacturas";
import AdminLayout from "./Admin/layout/AdminLayout";

// =====================================
// CLIENTE
// =====================================
import ClienteDashboard from "./Clientes/pages/ClienteDashboard";
import ModuloCatalogo from "./Clientes/pages/ModuloCatalogo";
import ModuloCategorias from "./Clientes/pages/ModuloCategorias";
import ModuloPerfil from "./Clientes/pages/ModuloPerfil";
import ModuloCarrito from "./Clientes/pages/ModuloCarrito";
import ClienteLayout from "./Clientes/layout/ClienteLayout";


function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* =====================================
            PÁGINA PRINCIPAL
        ===================================== */}

        <Route
          path="/"
          element={<HomeLayout />}
        />


        {/* =====================================
            AUTENTICACIÓN
        ===================================== */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/registro"
          element={<Registro />}
        />


        {/* =====================================
            ADMINISTRADOR
        ===================================== */}

        <Route
          path="/admin"
          element={<AdminLayout />}
        >

          <Route
            index
            element={<AdminDashboard />}
          />

          <Route
            path="productos"
            element={<Productos />}
          />

          <Route
            path="usuarios"
            element={<Usuarios />}
          />

          <Route
            path="pendientes"
            element={<PedidosPendientes />}
          />

          <Route
            path="completados"
            element={<PedidosCompletados />}
          />

          <Route
            path="pqr"
            element={<ModuloPqr />}
          />

          <Route
            path="facturas"
            element={<ModuloFacturas />}
          />

        </Route>


        {/* =====================================
            CLIENTE
        ===================================== */}

        <Route
          path="/cliente"
          element={<ClienteLayout />}
        >

          <Route
            index
            element={<ClienteDashboard />}
          />

          <Route
            path="inicio"
            element={<ClienteDashboard />}
          />

          <Route
            path="catalogo"
            element={<ModuloCatalogo />}
          />

          <Route
            path="categorias"
            element={<ModuloCategorias />}
          />

          <Route
            path="perfil"
            element={<ModuloPerfil />}
          />

          <Route
            path="carrito"
            element={<ModuloCarrito />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}


export default App;