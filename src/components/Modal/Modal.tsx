import styles from "./Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
  close: () => void;
}

const Modal = ({ children, close }: ModalProps) => {
  return (
    <div className={styles.overlay} onClick={close}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
