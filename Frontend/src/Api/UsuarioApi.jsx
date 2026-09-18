import axios from "axios";

const API_URL = "http://localhost:8080/usuarios";

export const obtenerUsuarios = async () => {
    const respuesta = await axios.get(API_URL);
    return respuesta.data;
};

export const obtenerUsuario = async (id) => {
    const respuesta = await axios.get(`${API_URL}/${id}`);
    return respuesta.data;
};

export const crearUsuario = async (usuario) => {

    console.log("🚀 POST ENVIANDO A:", API_URL);
    console.log("📦 OBJETO ENVIADO:", usuario);

    try {

        const respuesta = await axios.post(
            API_URL,
            usuario,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        console.log("✅ RESPUESTA POST:", respuesta.data);

        return respuesta.data;

    } catch (error) {

        console.error("❌ ERROR AL HACER POST");

        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Respuesta Spring:", error.response.data);
        } else if (error.request) {
            console.error("No hubo respuesta del servidor:", error.request);
        } else {
            console.error("Error:", error.message);
        }

        throw error;
    }
};

export const actualizarUsuario = async (id, usuario) => {

    const respuesta = await axios.put(
        `${API_URL}/${id}`,
        usuario
    );

    return respuesta.data;
};

export const eliminarUsuario = async (id) => {

    await axios.delete(`${API_URL}/${id}`);
};