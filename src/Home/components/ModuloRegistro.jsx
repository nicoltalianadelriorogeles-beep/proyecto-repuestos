import Registro from "../../pages/Registro";

function ModuloRegistro({ formulario, setFormulario, registrarUsuario, irLogin }) {
  const manejarCambio = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    registrarUsuario();
  };

  return (
    <Registro
      formulario={formulario}
      manejarCambio={manejarCambio}
      manejarSubmit={manejarSubmit}
      irLogin={irLogin}
    />
  );
}

export default ModuloRegistro;
