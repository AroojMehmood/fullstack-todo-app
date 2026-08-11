// Reusable component — error message + optional retry button
const ErrorMessage = ({ message, onRetry }) => {
  if (!message) return null;

  return (
    <div className="error-box" role="alert">
      <span>⚠ {message}</span>
      {onRetry && (
        <button type="button" className="error-retry-btn" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;