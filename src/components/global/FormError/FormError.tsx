// components/global/FormError/FormError.tsx
import style from "./formError.module.css";
const FormError = ({ message }: { message?: string }) => {
  if (!message) return null;
  return <span className={style.error}>{message}</span>;
};

export default FormError;
