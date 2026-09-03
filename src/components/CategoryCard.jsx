
function CategoryCard({
  icon,
  nombre,
  descripcion,
  onClick
}) {
  return (
    <div className="col-md-6">
      <div
        className="card category-card h-100"
        onClick={onClick}
        style={{ cursor: "pointer" }}
      >

        <div className="card-body d-flex align-items-center p-4">

          <div className="category-icon">
            <i className={`fa-solid ${icon}`}></i>
          </div>

          <div className="ms-4">
            <h3 className="fw-bold text-primary">
              {nombre}
            </h3>

            <p className="text-secondary mb-0">
              {descripcion}
            </p>
          </div>

          <i className="fa-solid fa-chevron-right ms-auto text-warning"></i>

        </div>

      </div>
    </div>
  );
}

export default CategoryCard;
