import { useEffect, useState } from "react";

import "./App.css";

import Header from "./partials/Header";

import Home from "./pages/Home";
import Cliente from "./pages/Cliente";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Registro from "./pages/Registro";

import Cart from "./components/Cart";

import productosIniciales from "./data/productos";

function App() {

  /* ==========================================
     PRODUCTOS
  ========================================== */

  const [productos, setProductos] = useState(() => {

    const guardados =
      localStorage.getItem("productos");

    return guardados
      ? JSON.parse(guardados)
      : productosIniciales;

  });


  /* ==========================================
     USUARIOS
  ========================================== */

  const [usuarios, setUsuarios] = useState(() => {

    const guardados =
      localStorage.getItem("usuarios");

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
        rol: "ADMIN"
      }
    ];

  });


  /* ==========================================
     USUARIO ACTUAL
  ========================================== */

  const [usuarioActual, setUsuarioActual] =
    useState(() => {

      const guardado =
        localStorage.getItem("usuarioActual");

      return guardado
        ? JSON.parse(guardado)
        : null;

    });


  /* ==========================================
     PÁGINA GENERAL
  ========================================== */

  const [pagina, setPagina] =
    useState("home");


  /* ==========================================
     SECCIÓN DEL CLIENTE
  ========================================== */

  const [seccionCliente, setSeccionCliente] =
    useState("inicio");


  /* ==========================================
     BÚSQUEDA
  ========================================== */

  const [busqueda, setBusqueda] =
    useState("");


  /* ==========================================
     LOGIN
  ========================================== */

  const [loginForm, setLoginForm] =
    useState({
      correo: "",
      password: ""
    });


  /* ==========================================
     REGISTRO
  ========================================== */

  const [registroForm, setRegistroForm] =
    useState({
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


  /* ==========================================
     CARRITO
  ========================================== */

  const [carrito, setCarrito] =
    useState([]);

  const [carritoAbierto, setCarritoAbierto] =
    useState(false);


  /* ==========================================
     GUARDAR PRODUCTOS
  ========================================== */

  useEffect(() => {

    localStorage.setItem(
      "productos",
      JSON.stringify(productos)
    );

  }, [productos]);


  /* ==========================================
     GUARDAR USUARIOS
  ========================================== */

  useEffect(() => {

    localStorage.setItem(
      "usuarios",
      JSON.stringify(usuarios)
    );

  }, [usuarios]);


  /* ==========================================
     GUARDAR SESIÓN
  ========================================== */

  useEffect(() => {

    if (usuarioActual) {

      localStorage.setItem(
        "usuarioActual",
        JSON.stringify(usuarioActual)
      );

    } else {

      localStorage.removeItem(
        "usuarioActual"
      );

    }

  }, [usuarioActual]);


  /* ==========================================
     REGISTRO
  ========================================== */

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


    const campoVacio =
      camposObligatorios.some(
        (campo) => !campo.trim()
      );


    if (campoVacio) {

      alert(
        "Completa todos los campos obligatorios."
      );

      return;
    }


    if (
      registroForm.password !==
      registroForm.confirmarPassword
    ) {

      alert(
        "Las contraseñas no coinciden."
      );

      return;
    }


    if (
      registroForm.password.length < 6
    ) {

      alert(
        "La contraseña debe tener mínimo 6 caracteres."
      );

      return;
    }


    const correoExiste =
      usuarios.some(
        (usuario) =>
          usuario.correo.toLowerCase() ===
          registroForm.correo.toLowerCase()
      );


    if (correoExiste) {

      alert(
        "Este correo ya está registrado."
      );

      return;
    }


    const documentoExiste =
      usuarios.some(
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
      tipoDocumento:
        registroForm.tipoDocumento,
      numeroDocumento:
        registroForm.numeroDocumento,
      primerNombre:
        registroForm.primerNombre,
      segundoNombre:
        registroForm.segundoNombre,
      primerApellido:
        registroForm.primerApellido,
      segundoApellido:
        registroForm.segundoApellido,
      direccion:
        registroForm.direccion,
      correo:
        registroForm.correo,
      password:
        registroForm.password,
      telefono:
        registroForm.telefono,

      // Todo registro público es CLIENTE
      rol: "CLIENTE"
    };


    setUsuarios(
      (usuariosActuales) => [
        ...usuariosActuales,
        nuevoUsuario
      ]
    );


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
      telefono: ""
    });


    alert(
      "Registro exitoso. Ahora puedes iniciar sesión."
    );


    setPagina("login");

  };


  /* ==========================================
     LOGIN
  ========================================== */

  const iniciarSesion = () => {

    if (
      !loginForm.correo.trim() ||
      !loginForm.password.trim()
    ) {

      alert(
        "Ingresa tu correo y contraseña."
      );

      return;
    }


    const usuario =
      usuarios.find(
        (item) =>
          item.correo.toLowerCase() ===
            loginForm.correo.toLowerCase() &&
          item.password ===
            loginForm.password
      );


    if (!usuario) {

      alert(
        "Correo o contraseña incorrectos."
      );

      return;
    }


    setUsuarioActual(usuario);


    setLoginForm({
      correo: "",
      password: ""
    });


    if (usuario.rol === "ADMIN") {

      setPagina("admin");

    } else {

      setSeccionCliente("inicio");

      setPagina("cliente");

    }

  };


  /* ==========================================
     CERRAR SESIÓN
  ========================================== */

  const cerrarSesion = () => {

    setUsuarioActual(null);

    setPagina("home");

    setSeccionCliente("inicio");

    setBusqueda("");

    setCarrito([]);

    setCarritoAbierto(false);

  };


  /* ==========================================
     CAMBIAR SECCIÓN CLIENTE
  ========================================== */

  const cambiarSeccionCliente = (seccion) => {

    setSeccionCliente(seccion);

    setPagina("cliente");

  };


  /* ==========================================
     CRUD PRODUCTOS
  ========================================== */

  const agregarProducto = (nuevoProducto) => {

    setProductos(
      (productosActuales) => [
        ...productosActuales,
        nuevoProducto
      ]
    );

  };


  const editarProducto = (
    productoActualizado
  ) => {

    setProductos(
      (productosActuales) =>
        productosActuales.map(
          (producto) =>
            producto.id ===
            productoActualizado.id
              ? productoActualizado
              : producto
        )
    );

  };


  const eliminarProducto = (id) => {

    setProductos(
      (productosActuales) =>
        productosActuales.filter(
          (producto) =>
            producto.id !== id
        )
    );


    setCarrito(
      (carritoActual) =>
        carritoActual.filter(
          (producto) =>
            producto.id !== id
        )
    );

  };


  /* ==========================================
     CRUD USUARIOS
  ========================================== */

  const agregarUsuario = (nuevoUsuario) => {

    setUsuarios(
      (usuariosActuales) => [
        ...usuariosActuales,
        nuevoUsuario
      ]
    );

  };


  const editarUsuario = (
    usuarioActualizado
  ) => {

    setUsuarios(
      (usuariosActuales) =>
        usuariosActuales.map(
          (usuario) =>
            usuario.id ===
            usuarioActualizado.id
              ? usuarioActualizado
              : usuario
        )
    );


    if (
      usuarioActual?.id ===
      usuarioActualizado.id
    ) {

      setUsuarioActual(
        usuarioActualizado
      );

    }

  };


  const eliminarUsuario = (id) => {

    if (
      usuarioActual?.id === id
    ) {

      alert(
        "No puedes eliminar tu propia cuenta."
      );

      return;
    }


    setUsuarios(
      (usuariosActuales) =>
        usuariosActuales.filter(
          (usuario) =>
            usuario.id !== id
        )
    );

  };


  /* ==========================================
     CARRITO
  ========================================== */

  const agregarAlCarrito = (producto) => {

    setCarrito(
      (carritoActual) => {

        const existe =
          carritoActual.find(
            (item) =>
              item.id === producto.id
          );


        if (existe) {

          return carritoActual.map(
            (item) =>
              item.id === producto.id
                ? {
                    ...item,
                    cantidad:
                      item.cantidad + 1
                  }
                : item
          );

        }


        return [
          ...carritoActual,
          {
            ...producto,
            cantidad: 1
          }
        ];

      }
    );


    setCarritoAbierto(true);

  };


  const aumentarCantidad = (id) => {

    setCarrito(
      (carritoActual) =>
        carritoActual.map(
          (producto) =>
            producto.id === id
              ? {
                  ...producto,
                  cantidad:
                    producto.cantidad + 1
                }
              : producto
        )
    );

  };


  const disminuirCantidad = (id) => {

    setCarrito(
      (carritoActual) =>
        carritoActual
          .map(
            (producto) =>
              producto.id === id
                ? {
                    ...producto,
                    cantidad:
                      producto.cantidad - 1
                  }
                : producto
          )
          .filter(
            (producto) =>
              producto.cantidad > 0
          )
    );

  };


  const eliminarDelCarrito = (id) => {

    setCarrito(
      (carritoActual) =>
        carritoActual.filter(
          (producto) =>
            producto.id !== id
        )
    );

  };


  const vaciarCarrito = () => {

    setCarrito([]);

  };


  const cantidadCarrito =
    carrito.reduce(
      (total, producto) =>
        total + producto.cantidad,
      0
    );


  return (
    <>
      <Header

        busqueda={busqueda}

        setBusqueda={setBusqueda}

        cantidadCarrito={
          cantidadCarrito
        }

        abrirCarrito={() =>
          setCarritoAbierto(true)
        }

        usuarioActual={
          usuarioActual
        }

        cambiarPagina={
          setPagina
        }

        cambiarSeccionCliente={
          cambiarSeccionCliente
        }

        cerrarSesion={
          cerrarSesion
        }

      />


      {/* ================================
          PÁGINA PÚBLICA
      ================================= */}

      {pagina === "home" && (

        <Home
          busqueda={busqueda}
          productos={productos}
          agregarAlCarrito={
            agregarAlCarrito
          }
        />

      )}


      {/* ================================
          LOGIN
      ================================= */}

      {pagina === "login" && (

        <Login
          formulario={loginForm}
          setFormulario={
            setLoginForm
          }
          iniciarSesion={
            iniciarSesion
          }
          irRegistro={() =>
            setPagina("registro")
          }
        />

      )}


      {/* ================================
          REGISTRO
      ================================= */}

      {pagina === "registro" && (

        <Registro
          formulario={
            registroForm
          }
          setFormulario={
            setRegistroForm
          }
          registrarUsuario={
            registrarUsuario
          }
          irLogin={() =>
            setPagina("login")
          }
        />

      )}


      {/* ================================
          CLIENTE
      ================================= */}

      {pagina === "cliente" &&
        usuarioActual?.rol === "CLIENTE" && (

          <Cliente

            usuarioActual={
              usuarioActual
            }

            productos={
              productos
            }

            busqueda={
              busqueda
            }

            seccion={
              seccionCliente
            }

            cambiarSeccion={
              cambiarSeccionCliente
            }

            agregarAlCarrito={
              agregarAlCarrito
            }

            cerrarSesion={
              cerrarSesion
            }

          />

      )}


      {/* ================================
          ADMIN
      ================================= */}

      {pagina === "admin" &&
        usuarioActual?.rol === "ADMIN" && (

          <Admin

            productos={
              productos
            }

            agregarProducto={
              agregarProducto
            }

            editarProducto={
              editarProducto
            }

            eliminarProducto={
              eliminarProducto
            }

            usuarios={
              usuarios
            }

            usuarioActual={
              usuarioActual
            }

            agregarUsuario={
              agregarUsuario
            }

            editarUsuario={
              editarUsuario
            }

            eliminarUsuario={
              eliminarUsuario
            }

          />

      )}


      {/* ================================
          CARRITO
      ================================= */}

      <Cart

        carrito={
          carrito
        }

        abierto={
          carritoAbierto
        }

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

      />

    </>
  );
}

export default App;