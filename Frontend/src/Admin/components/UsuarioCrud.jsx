
import { useEffect, useState } from "react";
import UserForm from "./UsuarioForm";

import {
    obtenerUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
} from "../../Api/UsuarioApi";

import {
    obtenerTiposDocumento
} from "../../Api/TipoDocumentoApi";


function UserCrud() {

    // ==========================================
    // FORMULARIO INICIAL
    // ==========================================

    const formularioInicial = {
        tipoDocumento: "",
        numeroDocumento: "",
        primerNombre: "",
        segundoNombre: "",
        primerApellido: "",
        segundoApellido: "",
        direccion: "",
        correo: "",
        password: "",
        telefono: "",
        estado: "1",
        rol: "CLIENTE"
    };


    // ==========================================
    // ESTADOS
    // ==========================================

    const [usuarios, setUsuarios] = useState([]);

    const [formulario, setFormulario] =
        useState(formularioInicial);

    const [editando, setEditando] =
        useState(null);

    const [formularioAbierto, setFormularioAbierto] =
        useState(false);

    const [mensaje, setMensaje] =
        useState(null);

    const [cargando, setCargando] =
        useState(false);

    const [tiposDocumento, setTiposDocumento] =
        useState([]);


    // ==========================================
    // CARGAR DATOS
    // ==========================================

    useEffect(() => {
        cargarUsuarios();
        cargarTiposDocumento();
    }, []);


    // ==========================================
    // CARGAR USUARIOS
    // ==========================================

    const cargarUsuarios = async () => {

        try {

            setCargando(true);

            const datos = await obtenerUsuarios();

            console.log("USUARIOS RECIBIDOS:", datos);

            setUsuarios(datos);

        } catch (error) {

            console.error(
                "Error al cargar usuarios:",
                error
            );

            mostrarMensaje(
                "error",
                "No fue posible cargar los usuarios."
            );

        } finally {

            setCargando(false);

        }

    };


    // ==========================================
    // CARGAR TIPOS DE DOCUMENTO
    // ==========================================

    const cargarTiposDocumento = async () => {

        try {

            const datos =
                await obtenerTiposDocumento();

            console.log(
                "TIPOS DE DOCUMENTO:",
                datos
            );

            setTiposDocumento(datos);

        } catch (error) {

            console.error(
                "Error al cargar tipos de documento:",
                error
            );

            mostrarMensaje(
                "error",
                "No fue posible cargar los tipos de documento."
            );

        }

    };


    // ==========================================
    // MANEJAR CAMBIOS
    // ==========================================

    const manejarCambio = (e) => {

        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        });

    };


    // ==========================================
    // MOSTRAR MENSAJE
    // ==========================================

    const mostrarMensaje = (tipo, texto) => {

        setMensaje({
            tipo,
            texto
        });

        setTimeout(() => {
            setMensaje(null);
        }, 4000);

    };


    // ==========================================
    // LIMPIAR FORMULARIO
    // ==========================================

    const limpiarFormulario = () => {

        setFormulario(formularioInicial);

        setEditando(null);

        setFormularioAbierto(false);

    };


    // ==========================================
    // ABRIR FORMULARIO
    // ==========================================

    const abrirFormulario = () => {

        setFormulario(formularioInicial);

        setEditando(null);

        setMensaje(null);

        setFormularioAbierto(true);

    };


    // ==========================================
    // GUARDAR USUARIO
    // CREAR / ACTUALIZAR
    // ==========================================

    const guardarUsuario = async (e) => {

        e.preventDefault();

        setMensaje(null);


        // ==========================================
        // VALIDACIONES
        // ==========================================

        if (
            !formulario.tipoDocumento ||
            !formulario.numeroDocumento ||
            !formulario.primerNombre ||
            !formulario.primerApellido ||
            !formulario.direccion ||
            !formulario.correo ||
            !formulario.telefono
        ) {

            mostrarMensaje(
                "error",
                "Completa todos los campos obligatorios."
            );

            return;
        }


        // ==========================================
        // VALIDAR CONTRASEÑA AL CREAR
        // ==========================================

        if (
            editando === null &&
            !formulario.password
        ) {

            mostrarMensaje(
                "error",
                "La contraseña es obligatoria."
            );

            return;
        }


        if (
            formulario.password &&
            formulario.password.length < 6
        ) {

            mostrarMensaje(
                "error",
                "La contraseña debe tener mínimo 6 caracteres."
            );

            return;
        }


        // ==========================================
        // VALIDAR CORREO
        // ==========================================

        const correoExiste = usuarios.some(
            (usuario) =>
                usuario.correo?.toLowerCase() ===
                formulario.correo.toLowerCase() &&
                usuario.idUsuarios !== editando
        );


        if (correoExiste) {

            mostrarMensaje(
                "error",
                "Ese correo ya está registrado."
            );

            return;
        }


        // ==========================================
        // VALIDAR DOCUMENTO
        // ==========================================

        const documentoExiste = usuarios.some(
            (usuario) =>
                String(usuario.ndocumento) ===
                String(formulario.numeroDocumento) &&
                usuario.idUsuarios !== editando
        );


        if (documentoExiste) {

            mostrarMensaje(
                "error",
                "Ese documento ya está registrado."
            );

            return;
        }


        // ==========================================
        // CREAR OBJETO PARA UsuarioDTO
        // ==========================================

        const usuarioAPI = {

            idUsuarios:
                editando !== null
                    ? editando
                    : null,

            contrasena:
                formulario.password,

            correo:
                formulario.correo,

            direccion:
                formulario.direccion,

            estado:
                Number(formulario.estado),

            imagen:
                null,

            ndocumento:
                formulario.numeroDocumento,

            papellido:
                formulario.primerApellido,

            pnombre:
                formulario.primerNombre,

            sapellido:
                formulario.segundoApellido || null,

            snombre:
                formulario.segundoNombre || null,

            telefono:
                Number(formulario.telefono),

            tipoDocumentoIdTdoc:
                Number(formulario.tipoDocumento)

        };


        // ==========================================
        // MOSTRAR DATOS ANTES DE ENVIAR
        // ==========================================

        console.log(
            "================================"
        );

        console.log(
            "DATOS QUE SE ENVIARÁN A SPRING:"
        );

        console.log(usuarioAPI);

        console.log(
            "================================"
        );


        // ==========================================
        // CREAR / ACTUALIZAR
        // ==========================================

        try {

            if (editando === null) {

                await crearUsuario(usuarioAPI);

                mostrarMensaje(
                    "success",
                    "Usuario creado correctamente."
                );

            } else {

                await actualizarUsuario(
                    editando,
                    usuarioAPI
                );

                mostrarMensaje(
                    "success",
                    "Usuario actualizado correctamente."
                );

            }


            // ==========================================
            // RECARGAR USUARIOS
            // ==========================================

            await cargarUsuarios();


            // ==========================================
            // LIMPIAR
            // ==========================================

            setFormulario(formularioInicial);

            setEditando(null);

            setFormularioAbierto(false);


        } catch (error) {

            console.error(
                "================================"
            );

            console.error(
                "ERROR AL GUARDAR USUARIO:"
            );

            console.error(error);

            console.error(
                "RESPUESTA DEL SERVIDOR:"
            );

            console.error(
                error.response?.data
            );

            console.error(
                "STATUS:"
            );

            console.error(
                error.response?.status
            );

            console.error(
                "================================"
            );


            // ==========================================
            // MENSAJE DEL BACKEND
            // ==========================================

            if (error.response?.data?.message) {

                mostrarMensaje(
                    "error",
                    error.response.data.message
                );

            } else if (error.response?.data) {

                mostrarMensaje(
                    "error",
                    "El servidor rechazó los datos enviados."
                );

            } else {

                mostrarMensaje(
                    "error",
                    "No fue posible conectar con el servidor."
                );

            }

        }

    };


    // ==========================================
    // CARGAR USUARIO PARA EDITAR
    // ==========================================

    const cargarUsuario = (usuario) => {

        setFormulario({

            tipoDocumento:
                usuario.tipoDocumentoIdTdoc?.toString() || "",

            numeroDocumento:
                usuario.ndocumento?.toString() || "",

            primerNombre:
                usuario.pnombre || "",

            segundoNombre:
                usuario.snombre || "",

            primerApellido:
                usuario.papellido || "",

            segundoApellido:
                usuario.sapellido || "",

            direccion:
                usuario.direccion || "",

            correo:
                usuario.correo || "",

            password:
                "",

            telefono:
                usuario.telefono?.toString() || "",

            estado:
                usuario.estado?.toString() || "1",

            rol:
                "CLIENTE"

        });


        setEditando(
            usuario.idUsuarios
        );

        setMensaje(null);

        setFormularioAbierto(true);


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    // ==========================================
    // ELIMINAR USUARIO
    // ==========================================

    const eliminar = async (id) => {

        const confirmar =
            window.confirm(
                "¿Seguro que deseas eliminar este usuario?"
            );


        if (!confirmar) {
            return;
        }


        try {

            await eliminarUsuario(id);

            mostrarMensaje(
                "success",
                "Usuario eliminado correctamente."
            );


            await cargarUsuarios();


        } catch (error) {

            console.error(
                "Error al eliminar usuario:",
                error
            );


            if (error.response?.data?.message) {

                mostrarMensaje(
                    "error",
                    error.response.data.message
                );

            } else {

                mostrarMensaje(
                    "error",
                    "No fue posible eliminar el usuario."
                );

            }

        }

    };


    // ==========================================
    // RENDER
    // ==========================================

    return (

        <section className="user-crud-section">


            {/* ======================================
                ENCABEZADO
            ====================================== */}

            <div>

                <div className="admin-section-title">

                    <span className="admin-label">
                        USUARIOS
                    </span>

                    <h2>
                        Gestionar usuarios
                    </h2>

                    <p>
                        Administra los usuarios registrados
                        en el sistema.
                    </p>

                </div>


                <button
                    type="button"
                    className="btn btn-warning user-new-button"
                    onClick={abrirFormulario}
                >

                    <i className="fa-solid fa-user-plus me-2"></i>

                    Nuevo usuario

                </button>

            </div>


            {/* ======================================
                MENSAJE
            ====================================== */}

            {mensaje && (

                <div
                    className={`admin-feedback ${
                        mensaje.tipo === "success"
                            ? "feedback-success"
                            : "feedback-error"
                    }`}
                >

                    <i
                        className={`fa-solid ${
                            mensaje.tipo === "success"
                                ? "fa-circle-check"
                                : "fa-circle-exclamation"
                        }`}
                    ></i>


                    <span>
                        {mensaje.texto}
                    </span>


                    <button
                        type="button"
                        onClick={() => setMensaje(null)}
                    >

                        <i className="fa-solid fa-xmark"></i>

                    </button>

                </div>

            )}


            {/* ======================================
                FORMULARIO
            ====================================== */}

            <div
                className={`user-form-container ${
                    formularioAbierto
                        ? "user-form-open"
                        : ""
                }`}
            >

                <UserForm
                    formulario={formulario}
                    editando={editando}
                    manejarCambio={manejarCambio}
                    guardarUsuario={guardarUsuario}
                    limpiarFormulario={limpiarFormulario}
                    tiposDocumento={tiposDocumento}
                />

            </div>


            {/* ======================================
                TABLA
            ====================================== */}

            <div className="card admin-card">

                <div className="card-header bg-white">

                    <h5 className="text-primary fw-bold mb-0">

                        <i className="fa-solid fa-users me-2"></i>

                        Usuarios registrados

                    </h5>

                </div>


                <div className="table-responsive">

                    <table className="table table-hover align-middle mb-0">

                        <thead className="table-primary">

                            <tr>

                                <th>
                                    Usuario
                                </th>

                                <th>
                                    Documento
                                </th>

                                <th>
                                    Correo
                                </th>

                                <th>
                                    Teléfono
                                </th>

                                <th>
                                    Estado
                                </th>

                                <th>
                                    Acciones
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {cargando ? (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="text-center py-5"
                                    >

                                        <div
                                            className="spinner-border text-primary"
                                            role="status"
                                        >
                                        </div>

                                        <p className="mt-2 mb-0">
                                            Cargando usuarios...
                                        </p>

                                    </td>

                                </tr>

                            ) : usuarios.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="text-center py-5"
                                    >

                                        <i
                                            className="fa-solid fa-users-slash fs-2 text-secondary"
                                        ></i>


                                        <p className="mt-2 mb-0">

                                            No hay usuarios registrados.

                                        </p>

                                    </td>

                                </tr>

                            ) : (

                                usuarios.map((usuario) => (

                                    <tr
                                        key={usuario.idUsuarios}
                                    >

                                        {/* USUARIO */}

                                        <td>

                                            <div className="d-flex align-items-center gap-2">

                                                <div className="admin-user-icon">

                                                    <i className="fa-solid fa-user"></i>

                                                </div>


                                                <strong>

                                                    {usuario.pnombre}{" "}

                                                    {usuario.papellido}

                                                </strong>

                                            </div>

                                        </td>


                                        {/* DOCUMENTO */}

                                        <td>

                                            {usuario.tipoDocumentoIdTdoc}{" "}

                                            {usuario.ndocumento}

                                        </td>


                                        {/* CORREO */}

                                        <td>

                                            {usuario.correo}

                                        </td>


                                        {/* TELEFONO */}

                                        <td>

                                            {usuario.telefono}

                                        </td>


                                        {/* ESTADO */}

                                        <td>

                                            {usuario.estado === 1 ? (

                                                <span className="badge bg-success">

                                                    <i className="fa-solid fa-circle-check me-1"></i>

                                                    Activo

                                                </span>

                                            ) : (

                                                <span className="badge bg-secondary">

                                                    <i className="fa-solid fa-circle-xmark me-1"></i>

                                                    Inactivo

                                                </span>

                                            )}

                                        </td>


                                        {/* ACCIONES */}

                                        <td>

                                            <div className="d-flex gap-2">

                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-primary"
                                                    onClick={() =>
                                                        cargarUsuario(usuario)
                                                    }
                                                >

                                                    <i className="fa-solid fa-pen"></i>

                                                </button>


                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() =>
                                                        eliminar(
                                                            usuario.idUsuarios
                                                        )
                                                    }
                                                >

                                                    <i className="fa-solid fa-trash"></i>

                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </section>

    );

}


export default UserCrud;
