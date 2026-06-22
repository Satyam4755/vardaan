function FormField({ label, id, hint, children }) {
  return (
    <label className="field" htmlFor={id}>
      <span className="field__label">{label}</span>
      {children}
      {hint ? <small className="field__hint">{hint}</small> : null}
    </label>
  );
}

export default FormField;
