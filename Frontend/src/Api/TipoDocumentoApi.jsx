import axios from "axios";

const API_URL = "http://localhost:8080/tipos-documento/activos";

export const obtenerTiposDocumento = async () => {
    const respuesta = await axios.get(API_URL);

    return respuesta.data;
};