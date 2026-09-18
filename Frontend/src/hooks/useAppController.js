import { useEffect, useState } from "react";
import productosIniciales from "../data/productos";

const usuarioAdministrador = {
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
  rol: "ADMIN"
};

// Reutilizable para cualquier colección persistida en localStorage.
const leerLocal = (clave, valorInicial) => {
  const guardado = localStorage.getItem(clave);
  return guardado ? JSON.parse(guardado) : valorInicial;
};

export function useAppController() {
  const [productos, setProductos] = useState(() => leerLocal("productos", productosIniciales));
  const [usuarios, setUsuarios] = useState(() => leerLocal("usuarios", [usuarioAdministrador]));
  const [usuarioActual, setUsuarioActual] = useState(() => leerLocal("usuarioActual", null));
  const [pedidos, setPedidos] = useState(() => leerLocal("pedidos", []));
  const [pagina, setPagina] = useState("home");
  const [seccionHome, setSeccionHome] = useState("inicio");
  const [seccionCliente, setSeccionCliente] = useState("inicio");
  const [seccionAdmin, setSeccionAdmin] = useState("productos");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [tipoModal, setTipoModal] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [loginForm, setLoginForm] = useState({ correo: "", password: "" });
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
    telefono: ""
  });
  const [carrito, setCarrito] = useState([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);

  // Persistencia centralizada: las vistas solo reciben datos y acciones.
  useEffect(() => localStorage.setItem("productos", JSON.stringify(productos)), [productos]);
  useEffect(() => localStorage.setItem("usuarios", JSON.stringify(usuarios)), [usuarios]);
  useEffect(() => localStorage.setItem("pedidos", JSON.stringify(pedidos)), [pedidos]);
  useEffect(() => {
    if (usuarioActual) localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));
    else localStorage.removeItem("usuarioActual");
  }, [usuarioActual]);

  const abrirModal = (tipo) => {
    setTipoModal(tipo);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setTipoModal("");
    setModalAbierto(false);
  };

  const registrarUsuario = () => {
    const camposObligatorios = [
      registroForm.tipoDocumento,
      registroForm.numeroDocumento,
      registroForm.primerNombre,
      registroForm.primerApellido,
      registroForm.direccion,
      registroForm.correo,
      registroForm.password,
      registroForm.telefono
    ];

    if (camposObligatorios.some((campo) => !campo.trim())) return alert("Completa todos los campos obligatorios.");
    if (registroForm.password !== registroForm.confirmarPassword) return alert("Las contraseñas no coinciden.");
    if (registroForm.password.length < 6) return alert("La contraseña debe tener mínimo 6 caracteres.");
    if (usuarios.some((usuario) => usuario.correo.toLowerCase() === registroForm.correo.toLowerCase())) return alert("Este correo ya está registrado.");
    if (usuarios.some((usuario) => usuario.numeroDocumento === registroForm.numeroDocumento)) return alert("Este número de documento ya está registrado.");

    setUsuarios((actuales) => [...actuales, {
      ...registroForm,
      id: Date.now(),
      rol: "CLIENTE"
    }]);
    setRegistroForm({ tipoDocumento: "", numeroDocumento: "", primerNombre: "", segundoNombre: "", primerApellido: "", segundoApellido: "", direccion: "", correo: "", password: "", confirmarPassword: "", telefono: "" });
    alert("Registro exitoso. Ahora puedes iniciar sesión.");
    setPagina("login");
  };

  const iniciarSesion = () => {
    if (!loginForm.correo.trim() || !loginForm.password.trim()) return alert("Ingresa tu correo y contraseña.");
    const usuario = usuarios.find((item) => item.correo.toLowerCase() === loginForm.correo.toLowerCase() && item.password === loginForm.password);
    if (!usuario) return alert("Correo o contraseña incorrectos.");

    setUsuarioActual(usuario);
    setLoginForm({ correo: "", password: "" });
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
    const indice = usuarios.findIndex((usuario) => usuario.correo.toLowerCase() === correo.trim().toLowerCase());
    if (indice === -1) return false;

    const passwordTemporal = `Recupera${Date.now().toString().slice(-4)}`;
    setUsuarios((actuales) => actuales.map((usuario, posicion) => posicion === indice ? { ...usuario, password: passwordTemporal } : usuario));
    alert(`Simulación de correo enviada a ${correo}. Tu contraseña temporal es: ${passwordTemporal}`);
    return true;
  };

  const cerrarSesion = () => {
    setUsuarioActual(null);
    setPagina("home");
    setSeccionHome("inicio");
    setSeccionCliente("inicio");
    setSeccionAdmin("productos");
    setBusqueda("");
    setCarrito([]);
    setCarritoAbierto(false);
    cerrarModal();
  };

  const cambiarSeccionCliente = (seccion) => {
    setSeccionCliente(seccion);
    setPagina("cliente");
  };

  const cambiarSeccionAdmin = (seccion) => {
    setSeccionAdmin(seccion);
    setPagina("admin");
  };

  // Acciones de dominio reutilizables por Admin y futuras vistas.
  const agregarProducto = (nuevoProducto) => setProductos((actuales) => [...actuales, nuevoProducto]);
  const editarProducto = (productoActualizado) => setProductos((actuales) => actuales.map((producto) => producto.id === productoActualizado.id ? productoActualizado : producto));
  const eliminarProducto = (id) => {
    setProductos((actuales) => actuales.filter((producto) => producto.id !== id));
    setCarrito((actual) => actual.filter((producto) => producto.id !== id));
  };
  const agregarUsuario = (nuevoUsuario) => setUsuarios((actuales) => [...actuales, nuevoUsuario]);
  const editarUsuario = (usuarioActualizado) => {
    setUsuarios((actuales) => actuales.map((usuario) => usuario.id === usuarioActualizado.id ? usuarioActualizado : usuario));
    if (usuarioActual?.id === usuarioActualizado.id) setUsuarioActual(usuarioActualizado);
  };
  const eliminarUsuario = (id) => {
    if (usuarioActual?.id === id) return alert("No puedes eliminar tu propia cuenta.");
    setUsuarios((actuales) => actuales.filter((usuario) => usuario.id !== id));
  };

  const agregarAlCarrito = (producto) => {
    if (usuarioActual?.rol !== "CLIENTE") return alert("Debes iniciar sesión como cliente para comprar.");
    setCarrito((actual) => {
      const existe = actual.find((item) => item.id === producto.id);
      return existe
        ? actual.map((item) => item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item)
        : [...actual, { ...producto, cantidad: 1 }];
    });
  };

  const aumentarCantidad = (id) => setCarrito((actual) => actual.map((producto) => producto.id === id ? { ...producto, cantidad: producto.cantidad + 1 } : producto));
  const disminuirCantidad = (id) => setCarrito((actual) => actual.map((producto) => producto.id === id ? { ...producto, cantidad: producto.cantidad - 1 } : producto).filter((producto) => producto.cantidad > 0));
  const eliminarDelCarrito = (id) => setCarrito((actual) => actual.filter((producto) => producto.id !== id));
  const vaciarCarrito = () => setCarrito([]);

  const finalizarCompra = () => {
    if (!carrito.length) return alert("El carrito está vacío.");
    const total = carrito.reduce((suma, producto) => suma + Number(producto.precio) * producto.cantidad, 0);
    setPedidos((actuales) => [...actuales, {
      id: Date.now(),
      usuarioId: usuarioActual.id,
      cliente: `${usuarioActual.primerNombre} ${usuarioActual.primerApellido}`,
      productos: carrito,
      total,
      estado: "PENDIENTE",
      fecha: new Date().toLocaleString()
    }]);
    setCarrito([]);
    setCarritoAbierto(false);
    alert("Pedido realizado correctamente. El administrador lo verá como pendiente.");
  };

  const cambiarEstadoPedido = (id, estado) => setPedidos((actuales) => actuales.map((pedido) => pedido.id === id ? { ...pedido, estado } : pedido));
  const cantidadCarrito = carrito.reduce((total, producto) => total + producto.cantidad, 0);

  return {
    productos, usuarios, usuarioActual, pedidos, pagina, seccionHome, seccionCliente, seccionAdmin,
    modalAbierto, tipoModal, busqueda, loginForm, registroForm, carrito, carritoAbierto, cantidadCarrito,
    setPagina, setSeccionHome, setLoginForm, setRegistroForm, setBusqueda, setCarritoAbierto,
    abrirModal, cerrarModal, registrarUsuario, iniciarSesion, recuperarPassword, cerrarSesion,
    cambiarSeccionCliente, cambiarSeccionAdmin, agregarProducto, editarProducto, eliminarProducto,
    agregarUsuario, editarUsuario, eliminarUsuario, agregarAlCarrito, aumentarCantidad,
    disminuirCantidad, eliminarDelCarrito, vaciarCarrito, finalizarCompra, cambiarEstadoPedido
  };
}
