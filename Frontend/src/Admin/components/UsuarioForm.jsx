import "../styles/FormularioUsuario.css";

function UserForm({
    formulario,
    editando,
    manejarCambio,
    guardarUsuario,
    limpiarFormulario,
    tiposDocumento = []
}) {

    return (
        <form onSubmit={guardarUsuario}>

            <div className="row">

                {/* TIPO DE DOCUMENTO */}
                <div className="col-md-6 mb-3">

                    <label htmlFor="tipoDocumento" className="form-label">
                        Tipo de documento
                    </label>

                    <select
                        id="tipoDocumento"
                        name="tipoDocumento"
                        className="form-select"
                        value={formulario.tipoDocumento}
                        onChange={manejarCambio}
                        required
                    >

                        <option value="">
                            Selecciona un tipo de documento
                        </option>

                        {tiposDocumento.map((tipo) => (

                            <option
                                key={tipo.idTdoc}
                                value={tipo.idTdoc}
                            >
                                {tipo.sigla} - {tipo.descTdoc}
                            </option>

                        ))}

                    </select>

                </div>


                {/* NÚMERO DE DOCUMENTO */}
                <div className="col-md-6 mb-3">

                    <label
                        htmlFor="numeroDocumento"
                        className="form-label"
                    >
                        Número de documento
                    </label>

                    <input
                        type="text"
                        id="numeroDocumento"
                        name="numeroDocumento"
                        className="form-control"
                        value={formulario.numeroDocumento}
                        onChange={manejarCambio}
                        maxLength="20"
                        required
                    />

                </div>


                {/* PRIMER NOMBRE */}
                <div className="col-md-6 mb-3">

                    <label
                        htmlFor="primerNombre"
                        className="form-label"
                    >
                        Primer nombre
                    </label>

                    <input
                        type="text"
                        id="primerNombre"
                        name="primerNombre"
                        className="form-control"
                        value={formulario.primerNombre}
                        onChange={manejarCambio}
                        maxLength="25"
                        required
                    />

                </div>


                {/* SEGUNDO NOMBRE */}
                <div className="col-md-6 mb-3">

                    <label
                        htmlFor="segundoNombre"
                        className="form-label"
                    >
                        Segundo nombre
                    </label>

                    <input
                        type="text"
                        id="segundoNombre"
                        name="segundoNombre"
                        className="form-control"
                        value={formulario.segundoNombre}
                        onChange={manejarCambio}
                        maxLength="25"
                    />

                </div>


                {/* PRIMER APELLIDO */}
                <div className="col-md-6 mb-3">

                    <label
                        htmlFor="primerApellido"
                        className="form-label"
                    >
                        Primer apellido
                    </label>

                    <input
                        type="text"
                        id="primerApellido"
                        name="primerApellido"
                        className="form-control"
                        value={formulario.primerApellido}
                        onChange={manejarCambio}
                        maxLength="25"
                        required
                    />

                </div>


                {/* SEGUNDO APELLIDO */}
                <div className="col-md-6 mb-3">

                    <label
                        htmlFor="segundoApellido"
                        className="form-label"
                    >
                        Segundo apellido
                    </label>

                    <input
                        type="text"
                        id="segundoApellido"
                        name="segundoApellido"
                        className="form-control"
                        value={formulario.segundoApellido}
                        onChange={manejarCambio}
                        maxLength="25"
                    />

                </div>


                {/* DIRECCIÓN */}
                <div className="col-md-6 mb-3">

                    <label
                        htmlFor="direccion"
                        className="form-label"
                    >
                        Dirección
                    </label>

                    <input
                        type="text"
                        id="direccion"
                        name="direccion"
                        className="form-control"
                        value={formulario.direccion}
                        onChange={manejarCambio}
                        maxLength="45"
                        required
                    />

                </div>


                {/* CORREO */}
                <div className="col-md-6 mb-3">

                    <label
                        htmlFor="correo"
                        className="form-label"
                    >
                        Correo
                    </label>

                    <input
                        type="email"
                        id="correo"
                        name="correo"
                        className="form-control"
                        value={formulario.correo}
                        onChange={manejarCambio}
                        maxLength="45"
                        required
                    />

                </div>


                {/* TELÉFONO */}
                <div className="col-md-6 mb-3">

                    <label
                        htmlFor="telefono"
                        className="form-label"
                    >
                        Teléfono
                    </label>

                    <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        className="form-control"
                        value={formulario.telefono}
                        onChange={manejarCambio}
                        required
                    />

                </div>


                {/* ESTADO */}
                <div className="col-md-6 mb-3">

                    <label
                        htmlFor="estado"
                        className="form-label"
                    >
                        Estado
                    </label>

                    <select
                        id="estado"
                        name="estado"
                        className="form-select"
                        value={formulario.estado}
                        onChange={manejarCambio}
                        required
                    >

                        <option value="">
                            Selecciona
                        </option>

                        <option value="1">
                            Activo
                        </option>

                        <option value="0">
                            Inactivo
                        </option>

                    </select>

                </div>


                {/* CONTRASEÑA */}
                <div className="col-md-6 mb-3">

                    <label
                        htmlFor="password"
                        className="form-label"
                    >
                        Contraseña
                    </label>

                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        value={formulario.password}
                        onChange={manejarCambio}
                        required={!editando}
                    />

                    {editando && (
                        <small className="text-muted">
                            Dejar vacío para conservar la contraseña actual.
                        </small>
                    )}

                </div>

            </div>


            {/* BOTONES */}

            <div className="d-flex gap-2">

                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    {editando
                        ? "Actualizar usuario"
                        : "Crear usuario"}
                </button>

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={limpiarFormulario}
                >
                    Limpiar
                </button>

            </div>

        </form>
    );
}

export default UserForm;