// components/global/FormError/FormError.tsx
const FormError = ({ message }: { message?: string }) => {
  if (!message) return null;
  return <span className="text-red-500 text-sm mt-1">{message}</span>;
};

export default FormError;
