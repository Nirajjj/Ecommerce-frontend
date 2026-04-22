import Modal from "../Modal/Modal";
import Login from "./Login";

const LoginModal = ({
  setShowLogin,
  roles,
  navigateTo,
}: {
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
  roles: string[];
  navigateTo: string;
}) => {
  return (
    <Modal close={() => setShowLogin(false)}>
      <Login
        close={() => setShowLogin(false)}
        roles={roles}
        navigateTo={navigateTo}
      />
    </Modal>
  );
};

export default LoginModal;
