import { useEffect, useState } from "react";
import "./App.css";

import Header from "./partials/Header";
import Home from "./pages/Home";
import Cliente from "./pages/Cliente";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Cart from "./components/Cart";
import InfoModal from "./components/InfoModal";

import productosIniciales from "./data/productos";

function App() {
  // PRODUCTOS
  const [productos, setProductos] = useState(() => {
    const guardados = localStorage.getItem("productos");
    return guardados ? JSON.parse(guardados) : productosIniciales;
  });

  // USUARIOS
  const [usuarios, setUsuarios] = useState(() => {
    const guardados = localStorage.getItem("usuarios");

    if (guardados) {
      return JSON.parse(guardados);
    }

    return [
      {
        id: 1,
        tipoDocumento: "CC",
        numeroDocumento: "0000000000",
        primerNombre: "Administrador",
        segundoNombre: "",
        primerApellido: "Sistema",
        segundoApellido: "",
        direccion: "Producciones Angel",
        correo: "admin@produccionesangel.com",
        password: "admin123",
        telefono: "3000000000",
        rol: "ADMIN",
      },
    ];
  });

  // USUARIO ACTUAL
  const [usuarioActual, setUsuarioActual] = useState(() => {
    const guardado = localStorage.getItem("usuarioActual");
    return guardado ? JSON.parse(guardado) : null;
  });

  // NAVEGACIÓN
  const [pagina, setPagina] = useState("home");
  const [seccionHome, setSeccionHome] = useState("inicio");
  const [seccionCliente, setSeccionCliente] = useState("inicio");
  const [seccionAdmin, setSeccionAdmin] = useState("productos");

  // MODAL
  const [modalAbierto, setModalAbierto] = useState(false);
  const [tipoModal, setTipoModal] = useState("");

  // BÚSQUEDA
  const [busqueda, setBusqueda] = useState("");

  // LOGIN
  const [loginForm, setLoginForm] = useState({
    correo: "",
    password: "",
  });

  // REGISTRO
  const [registroForm, setRegistroForm] = useState({
    tipoDocumento: "",
    numeroDocumento: "",
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    direccion: "",
    correo: "",
    password: "",
    confirmarPassword: "",
    telefono: "",
  });

  // CARRITO
  const [carrito, setCarrito] = useState([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);

  // PEDIDOS
  const [pedidos, setPedidos] = useState(() => {
    const guardados = localStorage.getItem("pedidos");
    return guardados ? JSON.parse(guardados) : [];
  });

  // GUARDAR PRODUCTOS
  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);

  // GUARDAR USUARIOS
  useEffect(() => {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }, [usuarios]);

  // GUARDAR USUARIO ACTUAL
  useEffect(() => {
    if (usuarioActual) {
      localStorage.setItem(
        "usuarioActual",
        JSON.stringify(usuarioActual)
      );
    } else {
      localStorage.removeItem("usuarioActual");
    }
  }, [usuarioActual]);

  // GUARDAR PEDIDOS
  useEffect(() => {
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
  }, [pedidos]);

  // MODAL
  const abrirModal = (tipo) => {
    setTipoModal(tipo);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setTipoModal("");
  };

  // REGISTRO
  const registrarUsuario = () => {
    const campos = [
      registroForm.tipoDocumento,
      registroForm.numeroDocumento,
      registroForm.primerNombre,
      registroForm.primerApellido,
      registroForm.direccion,
      registroForm.correo,
      registroForm.password,
      registroForm.telefono,
    ];

    if (campos.some((campo) => !campo.trim())) {
      alert("Completa todos los campos obligatorios.");
      return;
    }

    if (
      registroForm.password !==
      registroForm.confirmarPassword
    ) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    if (registroForm.password.length < 6) {
      alert("La contraseña debe tener mínimo 6 caracteres.");
      return;
    }

    const correoExiste = usuarios.some(
      (usuario) =>
        usuario.correo.toLowerCase() ===
        registroForm.correo.toLowerCase()
    );

    if (correoExiste) {
      alert("Este correo ya está registrado.");
      return;
    }

    const documentoExiste = usuarios.some(
      (usuario) =>
        usuario.numeroDocumento ===
        registroForm.numeroDocumento
    );

    if (documentoExiste) {
      alert(
        "Este número de documento ya está registrado."
      );
      return;
    }

    const nuevoUsuario = {
      id: Date.now(),
      tipoDocumento: registroForm.tipoDocumento,
      numeroDocumento: registroForm.numeroDocumento,
      primerNombre: registroForm.primerNombre,
      segundoNombre: registroForm.segundoNombre,
      primerApellido: registroForm.primerApellido,
      segundoApellido: registroForm.segundoApellido,
      direccion: registroForm.direccion,
      correo: registroForm.correo,
      password: registroForm.password,
      telefono: registroForm.telefono,
      rol: "CLIENTE",
    };

    setUsuarios((actuales) => [
      ...actuales,
      nuevoUsuario,
    ]);

    setRegistroForm({
      tipoDocumento: "",
      numeroDocumento: "",
      primerNombre: "",
      segundoNombre: "",
      primerApellido: "",
      segundoApellido: "",
      direccion: "",
      correo: "",
      password: "",
      confirmarPassword: "",
      telefono: "",
    });

    alert(
      "Registro exitoso. Ahora puedes iniciar sesión."
    );

    setPagina("login");
  };

  // LOGIN
  const iniciarSesion = () => {
    if (
      !loginForm.correo.trim() ||
      !loginForm.password.trim()
    ) {
      alert("Ingresa tu correo y contraseña.");
      return;
    }

    const usuario = usuarios.find(
      (item) =>
        item.correo.toLowerCase() ===
          loginForm.correo.toLowerCase() &&
        item.password === loginForm.password
    );

    if (!usuario) {
      alert("Correo o contraseña incorrectos.");
      return;
    }

    setUsuarioActual(usuario);

    setLoginForm({
      correo: "",
      password: "",
    });

    setCarritoAbierto(false);

    if (usuario.rol === "ADMIN") {
      setSeccionAdmin("productos");
      setPagina("admin");
    } else {
      setSeccionCliente("inicio");
      setPagina("cliente");
    }
  };

  const recuperarPassword = (correo) => {
    const indice = usuarios.findIndex(
      (usuario) => usuario.correo.toLowerCase() === correo.trim().toLowerCase()
    );

    if (indice === -1) {
      return false;
    }

    const passwordTemporal = `Recupera${Date.now().toString().slice(-4)}`;
    setUsuarios((actuales) => actuales.map((usuario, posicion) => (
      posicion === indice
        ? { ...usuario, password: passwordTemporal }
        : usuario
    )));

    alert(`Simulación de correo enviada a ${correo}. Tu contraseña temporal es: ${passwordTemporal}`);
    return true;
  };

  // CERRAR SESIÓN
  const cerrarSesion = () => {
    setUsuarioActual(null);
    setPagina("home");
    setSeccionCliente("inicio");
    setSeccionAdmin("productos");
    setBusqueda("");
    setCarrito([]);
    setCarritoAbierto(false);
    cerrarModal();
  };

  // SECCIÓN CLIENTE
  const cambiarSeccionCliente = (seccion) => {
    setSeccionCliente(seccion);
    setPagina("cliente");
  };

  // SECCIÓN ADMIN
  const cambiarSeccionAdmin = (seccion) => {
    setSeccionAdmin(seccion);
    setPagina("admin");
  };

  // PRODUCTOS
  const agregarProducto = (nuevoProducto) => {
    setProductos((actuales) => [
      ...actuales,
      nuevoProducto,
    ]);
  };

  const editarProducto = (productoActualizado) => {
    setProductos((actuales) =>
      actuales.map((producto) =>
        producto.id === productoActualizado.id
          ? productoActualizado
          : producto
      )
    );
  };

  const eliminarProducto = (id) => {
    setProductos((actuales) =>
      actuales.filter((producto) => producto.id !== id)
    );

    setCarrito((actual) =>
      actual.filter((producto) => producto.id !== id)
    );
  };

  // USUARIOS
  const agregarUsuario = (nuevoUsuario) => {
    setUsuarios((actuales) => [
      ...actuales,
      nuevoUsuario,
    ]);
  };

  const editarUsuario = (usuarioActualizado) => {
    setUsuarios((actuales) =>
      actuales.map((usuario) =>
        usuario.id === usuarioActualizado.id
          ? usuarioActualizado
          : usuario
      )
    );

    if (usuarioActual?.id === usuarioActualizado.id) {
      setUsuarioActual(usuarioActualizado);
    }
  };

  const eliminarUsuario = (id) => {
    if (usuarioActual?.id === id) {
      alert("No puedes eliminar tu propia cuenta.");
      return;
    }

    setUsuarios((actuales) =>
      actuales.filter((usuario) => usuario.id !== id)
    );
  };

  // CARRITO
  const agregarAlCarrito = (producto) => {
    if (usuarioActual?.rol !== "CLIENTE") {
      alert(
        "Debes iniciar sesión como cliente para comprar."
      );
      return;
    }

    setCarrito((actual) => {
      const existe = actual.find(
        (item) => item.id === producto.id
      );

      if (existe) {
        return actual.map((item) =>
          item.id === producto.id
            ? {
                ...item,
                cantidad: item.cantidad + 1,
              }
            : item
        );
      }

      return [
        ...actual,
        {
          ...producto,
          cantidad: 1,
        },
      ];
    });

    // IMPORTANTE:
    // No abrimos el carrito automáticamente.
  };

  const aumentarCantidad = (id) => {
    setCarrito((actual) =>
      actual.map((producto) =>
        producto.id === id
          ? {
              ...producto,
              cantidad: producto.cantidad + 1,
            }
          : producto
      )
    );
  };

  const disminuirCantidad = (id) => {
    setCarrito((actual) =>
      actual
        .map((producto) =>
          producto.id === id
            ? {
                ...producto,
                cantidad: producto.cantidad - 1,
              }
            : producto
        )
        .filter(
          (producto) => producto.cantidad > 0
        )
    );
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((actual) =>
      actual.filter(
        (producto) => producto.id !== id
      )
    );
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // PEDIDOS
  const finalizarCompra = () => {
    if (!carrito.length) {
      alert("El carrito está vacío.");
      return;
    }

    const total = carrito.reduce(
      (suma, producto) =>
        suma +
        Number(producto.precio) *
          producto.cantidad,
      0
    );

    const nuevoPedido = {
      id: Date.now(),
      usuarioId: usuarioActual.id,
      cliente: `${usuarioActual.primerNombre} ${usuarioActual.primerApellido}`,
      productos: carrito,
      total,
      estado: "PENDIENTE",
      fecha: new Date().toLocaleString(),
    };

    setPedidos((actuales) => [
      ...actuales,
      nuevoPedido,
    ]);

    setCarrito([]);
    setCarritoAbierto(false);

    alert(
      "Pedido realizado correctamente. El administrador lo verá como pendiente."
    );
  };

  const cambiarEstadoPedido = (id, estado) => {
    setPedidos((actuales) =>
      actuales.map((pedido) =>
        pedido.id === id
          ? {
              ...pedido,
              estado,
            }
          : pedido
      )
    );
  };

  const cantidadCarrito = carrito.reduce(
    (total, producto) =>
      total + producto.cantidad,
    0
  );

  return (
    <>
      <Header
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        cantidadCarrito={cantidadCarrito}
        abrirCarrito={() => {
          if (usuarioActual?.rol === "CLIENTE") {
            setCarritoAbierto(true);
          }
        }}
        usuarioActual={usuarioActual}
        cambiarPagina={setPagina}
        cambiarSeccionHome={(seccion) => {
          setSeccionHome(seccion);
          setPagina("home");
        }}
        cambiarSeccionCliente={
          cambiarSeccionCliente
        }
        cambiarSeccionAdmin={
          cambiarSeccionAdmin
        }
        seccionCliente={seccionCliente}
        seccionAdmin={seccionAdmin}
        cerrarSesion={cerrarSesion}
        abrirModal={abrirModal}
      />

      {pagina === "home" && (
        <Home
          busqueda={busqueda}
          productos={productos}
          verProducto={() => abrirModal("repuestos")}
          agregarAlCarrito={agregarAlCarrito}
          seccion={seccionHome}
          cambiarSeccion={setSeccionHome}
        />
      )}

      {pagina === "login" && (
        <Login
          formulario={loginForm}
          setFormulario={setLoginForm}
          iniciarSesion={iniciarSesion}
          irRegistro={() =>
            setPagina("registro")
          }
          recuperarPassword={recuperarPassword}
        />
      )}

      {pagina === "registro" && (
        <Registro
          formulario={registroForm}
          setFormulario={setRegistroForm}
          registrarUsuario={registrarUsuario}
          irLogin={() =>
            setPagina("login")
          }
        />
      )}

      {pagina === "cliente" &&
        usuarioActual?.rol === "CLIENTE" && (
          <Cliente
            usuarioActual={usuarioActual}
            productos={productos}
            busqueda={busqueda}
            seccion={seccionCliente}
            cambiarSeccion={
              cambiarSeccionCliente
            }
            agregarAlCarrito={
              agregarAlCarrito
            }
            cerrarSesion={cerrarSesion}
          />
        )}

      {pagina === "admin" &&
        usuarioActual?.rol === "ADMIN" && (
          <Admin
            productos={productos}
            agregarProducto={agregarProducto}
            editarProducto={editarProducto}
            eliminarProducto={eliminarProducto}
            usuarios={usuarios}
            usuarioActual={usuarioActual}
            agregarUsuario={agregarUsuario}
            editarUsuario={editarUsuario}
            eliminarUsuario={eliminarUsuario}
            pedidos={pedidos}
            cambiarEstadoPedido={
              cambiarEstadoPedido
            }
            seccion={seccionAdmin}
          />
        )}

      {/* CARRITO
          SOLO SE RENDERIZA CUANDO ESTÁ ABIERTO */}
      {usuarioActual?.rol === "CLIENTE" &&
        carritoAbierto && (
          <Cart
            carrito={carrito}
            abierto={carritoAbierto}
            cerrarCarrito={() =>
              setCarritoAbierto(false)
            }
            aumentarCantidad={
              aumentarCantidad
            }
            disminuirCantidad={
              disminuirCantidad
            }
            eliminarProducto={
              eliminarDelCarrito
            }
            vaciarCarrito={
              vaciarCarrito
            }
            finalizarCompra={
              finalizarCompra
            }
          />
        )}

      <InfoModal
        abierto={modalAbierto}
        cerrar={cerrarModal}
        tipo={tipoModal}
        usuarioActual={usuarioActual}
        productos={productos}
      />
    </>
  );
}

export default App;