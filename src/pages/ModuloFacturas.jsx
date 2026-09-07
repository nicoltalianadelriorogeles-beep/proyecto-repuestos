
import { crearFacturaHtml } from "../../utils/factura";

function ModuloFacturas({ pedidos = [] }) {

  const descargarFactura = (pedido) => {
    const ventana = window.open("", "_blank");

    if (!ventana) {
      alert("El navegador bloqueó la ventana. Permite las ventanas emergentes.");
      return;
    }

    ventana.document.write(crearFacturaHtml(pedido));
    ventana.document.close();
    ventana.print();
  };

  return (
    <section className="facturas-page">

      {/* Encabezado */}
      <div className="admin-section-title">
        <span className="admin-label">DOCUMENTOS</span>

        <h2>Facturas</h2>

        <p>
          Genera una factura imprimible y guárdala como PDF.
        </p>
      </div>

      {/* Facturas */}
      <div className="invoice-grid">

        {pedidos.length === 0 ? (

          <div className="admin-card admin-empty-state text-center">

            <i className="fa-solid fa-file-invoice"></i>

            <h5>Aún no hay facturas</h5>

            <p className="text-secondary mb-0">
              Las facturas de los pedidos aparecerán aquí.
            </p>

          </div>

        ) : (

          pedidos.map((pedido) => (

            <article
              className="invoice-card"
              key={pedido.id}
            >

              <div>

                <span className="invoice-number">
                  FACTURA #{pedido.id}
                </span>

                <h3>
                  {pedido.cliente}
                </h3>

                <p>
                  {pedido.fecha}
                </p>

              </div>

              <strong>
                $
                {Number(pedido.total || 0).toLocaleString("es-CO")}
              </strong>

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => descargarFactura(pedido)}
              >

                <i className="fa-solid fa-file-pdf me-2"></i>

                Generar PDF

              </button>

            </article>

          ))

        )}

      </div>

    </section>
  );
}

export default ModuloFacturas;
