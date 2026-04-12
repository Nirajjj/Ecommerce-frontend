import useAuthStore from "@/store/useAuthStore";
import styles from "./Login.module.css";
import { useState } from "react";
interface LoginFormProps {
  close: () => void;
}

const Login = ({ close }: LoginFormProps) => {
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    if (!email || !password) return;
    await login(email, password);

    close();
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        className={styles.input}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
        required
      />
      <input
        placeholder="Password"
        type="password"
        className={styles.input}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
        required
      />

      <button className={styles.button} onClick={handleLogin}>
        {isLoading ? <div className={styles.spinner}></div> : "Login"}
      </button>
    </div>
  );
};

export default Login;
