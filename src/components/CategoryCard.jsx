function CategoryCard({ icon, nombre, descripcion }) {
  return (
    <div className="col-md-6">
      <div className="card category-card h-100 border-0 shadow-sm">

        <div className="card-body d-flex align-items-center p-4">

          <div className="category-icon bg-primary text-white">
            <i className={`fa-solid ${icon}`}></i>
          </div>

          <div className="ms-4">
            <h3 className="text-primary fw-bold">
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