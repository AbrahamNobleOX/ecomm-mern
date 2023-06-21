export default function CategoryForm({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) {
  return (
    <form className="row g-3" onSubmit={handleSubmit}>
      <div className="col-md-12">
        <label htmlFor="inputCategory4" className="form-label">
          Category Name
        </label>
        <input
          type="text"
          className="form-control"
          id="inputCategory4"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <div className="col-12 d-flex justify-content-end">
        <button type="submit" className="btn btn-primary">
          {buttonText}
        </button>
        {handleDelete && (
          <button onClick={handleDelete} className="btn btn-danger mx-2">
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
