import Modal from "../Modal/Modal";
import Login from "./Login";

const LoginModal = ({
  showLogin,
  setShowLogin,
  roles,
  navigateTo,
}: {
  showLogin: boolean;
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
  roles: string[];
  navigateTo: string;
}) => {
  return (
    <>
      {showLogin && (
        <Modal close={() => setShowLogin(false)}>
          <Login
            close={() => setShowLogin(false)}
            roles={roles}
            navigateTo={navigateTo}
          />
        </Modal>
      )}
    </>
  );
};

export default LoginModal;
