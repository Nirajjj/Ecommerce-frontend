import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import styles from "./ErrorPage.module.css";

export default function ErrorPage() {
  const error = useRouteError();

  let title = "Something went wrong";
  let message = "An unexpected error occurred.";

  if (isRouteErrorResponse(error)) {
    title = `${error.status} Error`;

    if (error.status === 404) {
      message = "The page you are looking for does not exist.";
    } else {
      message = error.statusText || message;
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.code}>⚠️ {title}</h1>

      <p className={styles.message}>{message}</p>

      <Link to="/" className={styles.button}>
        ⬅ Back to Home
      </Link>
    </div>
  );
}
