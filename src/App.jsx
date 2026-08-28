
import { useEffect, useState } from "react";

import "./App.css";

import Header from "./partials/Header";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Cart from "./components/Cart";

import productosIniciales from "./data/productos";

function App() {

  // =================================
  // PRODUCTOS
  // =================================

  const [productos, setProductos] = useState(() => {
    const guardados = localStorage.getItem("productos");

    return guardados
      ? JSON.parse(guardados)
      : productosIniciales;
  });


  // =================================
  // USUARIOS
  // =================================

  const [usuarios, setUsuarios] = useState(() => {

    const guardados = localStorage.getItem("usuarios");

    if (guardados) {
      return JSON.parse(guardados);
    }

    // Usuario administrador inicial
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


  // =================================
  // USUARIO ACTUAL
  // =================================

  const [usuarioActual, setUsuarioActual] = useState(() => {

    const guardado =
      localStorage.getItem("usuarioActual");

    return guardado
      ? JSON.parse(guardado)
      : null;
  });


  // =================================
  // NAVEGACIÓN
  // =================================

  const [pagina, setPagina] = useState("home");


  // =================================
  // BÚSQUEDA
  // =================================

  const [busqueda, setBusqueda] = useState("");


  // =================================
  // LOGIN
  // =================================

  const [loginForm, setLoginForm] = useState({
    correo: "",
    password: ""
  });


  // =================================
  // REGISTRO
  // =================================

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


  // =================================
  // CARRITO
  // =================================

  const [carrito, setCarrito] = useState([]);

  const [carritoAbierto, setCarritoAbierto] =
    useState(false);


  // =================================
  // GUARDAR PRODUCTOS
  // =================================

  useEffect(() => {

    localStorage.setItem(
      "productos",
      JSON.stringify(productos)
    );

  }, [productos]);


  // =================================
  // GUARDAR USUARIOS
  // =================================

  useEffect(() => {

    localStorage.setItem(
      "usuarios",
      JSON.stringify(usuarios)
    );

  }, [usuarios]);


  // =================================
  // GUARDAR SESIÓN
  // =================================

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


  // =================================
  // REGISTRAR USUARIO
  // =================================

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

    const hayCampoVacio =
      camposObligatorios.some(
        (campo) => !campo.trim()
      );

    if (hayCampoVacio) {

      alert(
        "Completa todos los campos obligatorios."
      );

      return;
    }


    // Confirmar contraseña

    if (
      registroForm.password !==
      registroForm.confirmarPassword
    ) {

      alert(
        "Las contraseñas no coinciden."
      );

      return;
    }


    // Validar correo

    const correoExiste = usuarios.some(
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


    // Validar documento

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


    // Crear usuario

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

      rol: "CLIENTE"
    };


    setUsuarios(
      (usuariosActuales) => [
        ...usuariosActuales,
        nuevoUsuario
      ]
    );


    alert(
      "¡Registro exitoso! Ahora puedes iniciar sesión."
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


    setPagina("login");
  };


  // =================================
  // INICIAR SESIÓN
  // =================================

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


    const usuario = usuarios.find(
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

      setPagina("home");
    }
  };


  // =================================
  // CERRAR SESIÓN
  // =================================

  const cerrarSesion = () => {

    setUsuarioActual(null);

    setPagina("home");

    setBusqueda("");

    setCarrito([]);

  };


  // =================================
  // CRUD - CREAR
  // =================================

  const agregarProducto = (nuevoProducto) => {

    setProductos(
      (productosActuales) => [
        ...productosActuales,
        nuevoProducto
      ]
    );

  };


  // =================================
  // CRUD - EDITAR
  // =================================

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


  // =================================
  // CRUD - ELIMINAR
  // =================================

  const eliminarProducto = (id) => {

    setProductos(
      (productosActuales) =>
        productosActuales.filter(
          (producto) =>
            producto.id !== id
        )
    );


    // También quitar del carrito

    setCarrito(
      (carritoActual) =>
        carritoActual.filter(
          (producto) =>
            producto.id !== id
        )
    );

  };


  // =================================
  // CARRITO - AGREGAR
  // =================================

  const agregarAlCarrito = (producto) => {

    setCarrito(
      (carritoActual) => {

        const productoExistente =
          carritoActual.find(
            (item) =>
              item.id === producto.id
          );


        if (productoExistente) {

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


  // =================================
  // CARRITO - AUMENTAR
  // =================================

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


  // =================================
  // CARRITO - DISMINUIR
  // =================================

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


  // =================================
  // CARRITO - ELIMINAR
  // =================================

  const eliminarDelCarrito = (id) => {

    setCarrito(
      (carritoActual) =>
        carritoActual.filter(
          (producto) =>
            producto.id !== id
        )
    );

  };


  // =================================
  // CARRITO - VACIAR
  // =================================

  const vaciarCarrito = () => {

    setCarrito([]);

  };


  // =================================
  // CANTIDAD DEL CARRITO
  // =================================

  const cantidadCarrito =
    carrito.reduce(
      (total, producto) =>
        total + producto.cantidad,
      0
    );


  // =================================
  // VISTA
  // =================================

  return (
    <>
      <Header
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        cantidadCarrito={cantidadCarrito}
        abrirCarrito={() =>
          setCarritoAbierto(true)
        }
        usuarioActual={usuarioActual}
        cambiarPagina={setPagina}
        cerrarSesion={cerrarSesion}
      />


      {pagina === "home" && (
        <Home
          busqueda={busqueda}
          productos={productos}
          agregarAlCarrito={
            agregarAlCarrito
          }
        />
      )}


      {pagina === "login" && (
        <Login
          formulario={loginForm}
          setFormulario={setLoginForm}
          iniciarSesion={
            iniciarSesion
          }
          irRegistro={() =>
            setPagina("registro")
          }
        />
      )}


      {pagina === "registro" && (
        <Registro
          formulario={registroForm}
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


      {pagina === "admin" &&
        usuarioActual?.rol === "ADMIN" && (
          <Admin
            productos={productos}
            agregarProducto={
              agregarProducto
            }
            editarProducto={
              editarProducto
            }
            eliminarProducto={
              eliminarProducto
            }
          />
        )}


      {pagina === "admin" &&
        usuarioActual?.rol !== "ADMIN" && (

          <main className="py-5">

            <div className="container text-center">

              <i className="fa-solid fa-lock fa-4x text-danger mb-3"></i>

              <h2 className="text-primary">
                Acceso restringido
              </h2>

              <p className="text-secondary">
                Solo los administradores
                pueden acceder.
              </p>

              <button
                className="btn btn-primary"
                onClick={() =>
                  setPagina("home")
                }
              >
                Volver al inicio
              </button>

            </div>

          </main>

        )}


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
      />

    </>
  );
}

export default App;
