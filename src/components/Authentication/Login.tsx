import useAuthStore from "@/store/useAuthStore";
import styles from "./Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
interface LoginFormProps {
  close: () => void;
  roles: string[];
  navigateTo: string;
}

const Login = ({ close, roles, navigateTo }: LoginFormProps) => {
  const login = useAuthStore((state) => state.login);
  const register = useAuthStore((state) => state.register);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const isLoading = useAuthStore((state) => state.isLoading);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    if (!email || !password) return;
    if (isLogin) {
      await login(email, password);
    } else {
      await register(name, email, password, roles);
    }
    navigate(navigateTo);

    close();
  };
  const handleAuthOption = () => {
    setIsLogin(!isLogin);
  };
  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      {!isLogin && (
        <input
          placeholder="Name"
          className={styles.input}
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          required
        />
      )}
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

      <button type="button" className={styles.button} onClick={handleLogin}>
        {isLoading ? (
          <div className={styles.spinner}></div>
        ) : isLogin ? (
          "Login"
        ) : (
          "Sign Up"
        )}
      </button>
      <p className={styles.authOption}>
        Don't have an account?{" "}
        <span onClick={handleAuthOption}>{isLogin ? "Sign Up" : "Login"}</span>
      </p>
    </div>
  );
};

export default Login;
