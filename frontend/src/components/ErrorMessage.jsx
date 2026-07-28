// Reusable component — kahin bhi error dikhani ho, isko message prop de kar use karo.

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="error-box" role="alert">
      ⚠ {message}
    </div>
  );
};

export default ErrorMessage;
