import { FiAlertTriangle } from "react-icons/fi";
import styles from "./errorState.module.css";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

const ErrorState = ({
  title = "Something went wrong",
  message = "We couldn't load this content.",
  onRetry,
}: ErrorStateProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <FiAlertTriangle />
      </div>

      <h2 className={styles.title}>{title}</h2>

      <p className={styles.message}>{message}</p>

      {onRetry && (
        <button className={styles.retryBtn} onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
