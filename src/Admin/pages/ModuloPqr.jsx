
import { useState } from "react";

function ModuloPqr() {

  const [pqr, setPqr] = useState([]);

  const enviarPqr = (e) => {
    e.preventDefault();

    const datos = new FormData(e.currentTarget);

    const nuevaPqr = {
      id: Date.now(),
      asunto: datos.get("asunto"),
      detalle: datos.get("detalle")
    };

    setPqr((actuales) => [
      ...actuales,
      nuevaPqr
    ]);

    e.currentTarget.reset();
  };

  return (
    <section className="pqr-page admin-document-module">

      {/* =====================================
          ENCABEZADO
          ===================================== */}
      <div className="admin-section-title">

        <span className="admin-label">
          ATENCIÓN
        </span>

        <h2>
          PQR y reclamos
        </h2>

        <p>
          Registra y consulta peticiones, quejas y reclamos.
        </p>

      </div>


      {/* =====================================
          CONTENIDO DE PQR
          ===================================== */}
      <div className="pqr-layout">


        {/* =================================
            FORMULARIO
            ================================= */}
        <form
          className="admin-card pqr-form pqr-form-card"
          onSubmit={enviarPqr}
        >

          <h5>
            <i className="fa-solid fa-headset me-2"></i>
            Registrar PQR
          </h5>


          {/* Asunto */}
          <label
            className="form-label"
            htmlFor="asunto"
          >
            Asunto
          </label>

          <input
            id="asunto"
            name="asunto"
            type="text"
            className="form-control mb-3"
            placeholder="Ingresa el asunto de la PQR"
            required
          />


          {/* Detalle */}
          <label
            className="form-label"
            htmlFor="detalle"
          >
            Detalle
          </label>

          <textarea
            id="detalle"
            name="detalle"
            className="form-control mb-3"
            rows="5"
            placeholder="Describe la petición, queja o reclamo..."
            required
          ></textarea>


          {/* Botón */}
          <button
            className="btn btn-warning"
            type="submit"
          >
            <i className="fa-solid fa-paper-plane me-2"></i>
            Guardar PQR
          </button>

        </form>


        {/* =================================
            LISTADO DE PQR
            ================================= */}
        <div className="pqr-list">

          {pqr.length === 0 ? (

            <div className="admin-card admin-empty-state text-center">

              <i className="fa-solid fa-inbox"></i>

              <h5>
                No hay PQR registradas
              </h5>

              <p className="text-secondary mb-0">
                Las nuevas PQR aparecerán aquí.
              </p>

            </div>

          ) : (

            pqr.map((item) => (

              <article
                className="pqr-card pqr-request-card"
                key={item.id}
              >

                <span>
                  PQR #{item.id}
                </span>

                <h5>
                  {item.asunto}
                </h5>

                <p>
                  {item.detalle}
                </p>

                <small>
                  Estado: pendiente de atención
                </small>

              </article>

            ))

          )}

        </div>

      </div>

    </section>
  );
}

export default ModuloPqr;
