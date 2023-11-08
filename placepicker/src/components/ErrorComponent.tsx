interface ErrorComponentProps {
  title: string;
  message: string;
  onConfirm?: () => void;
}

const ErrorComponent = ({ title, message, onConfirm }: ErrorComponentProps) => {
  return (
    <div className="error">
      <h2>{title}</h2>
      <p>{message}</p>
      {onConfirm && (
        <div id="confirmation-actions">
          <button onClick={onConfirm} className="button">
            Okay
          </button>
        </div>
      )}
    </div>
  );
};

export default ErrorComponent;
