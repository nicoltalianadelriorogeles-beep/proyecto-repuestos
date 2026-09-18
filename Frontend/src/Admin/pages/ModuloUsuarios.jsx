import UserCrud from "../components/UsuarioCrud";

function Usuarios({
  usuarios = [],
  usuarioActual,
  agregarUsuario,
  editarUsuario,
  eliminarUsuario
}) {
  return (
    <div className="container py-5">

      <UserCrud
        usuarios={usuarios}
        usuarioActual={usuarioActual}
        agregarUsuario={agregarUsuario}
        editarUsuario={editarUsuario}
        eliminarUsuario={eliminarUsuario}
      />

    </div>
  );
}

export default Usuarios;