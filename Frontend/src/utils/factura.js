export const crearFacturaHtml = (pedido) => `
  <html>
    <head>
      <title>Factura ${pedido.id}</title>
      <link rel="stylesheet" href="/factura.css" />
    </head>
    <body>
      <header class="invoice-brand">
        <h1>Producciones Angel</h1>
        <p>Repuestos para electrodomésticos</p>
      </header>
      <section class="invoice-meta">
        <strong>Factura #${pedido.id}</strong>
        <span>Cliente: ${pedido.cliente}</span>
        <span>Fecha: ${pedido.fecha}</span>
      </section>
      <table>
        <thead>
          <tr><th>Producto</th><th>Cantidad</th></tr>
        </thead>
        <tbody>
          ${pedido.productos?.map((producto) => `
            <tr><td>${producto.nombre}</td><td>${producto.cantidad}</td></tr>
          `).join("") || ""}
        </tbody>
      </table>
      <p class="invoice-total">Total: $${Number(pedido.total).toLocaleString("es-CO")}</p>
    </body>
  </html>
`;
