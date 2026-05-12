import useAuthStore from "@/store/useAuthStore";
import styles from "./Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface LoginFormProps {
  close: () => void;
  roles: string[];
  navigateTo: string;
}
const getAuthSchema = (isLogin: boolean) =>
  z.object({
    name: isLogin
      ? z.string().optional()
      : z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

type AuthFormValues = z.infer<ReturnType<typeof getAuthSchema>>;
const Login = ({ close, roles, navigateTo }: LoginFormProps) => {
  const login = useAuthStore((state) => state.login);
  const register = useAuthStore((state) => state.register);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const isLoading = useAuthStore((state) => state.isLoading);
  const {
    register: registerField,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(getAuthSchema(isLogin)),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const onSubmit = async (data: AuthFormValues) => {
    if (!data.email || !data.password) return;
    if (isLogin) {
      await login(data.email, data.password);
    } else {
      await register(data.name as string, data.email, data.password, roles);
    }
    navigate(navigateTo);

    close();
  };
  const handleAuthOption = () => {
    setIsLogin(!isLogin);
    reset();
  };
  return (
    <div className={styles.loginContainer}>
      <div className={styles.imageContainer}>
        <img
          src="https://res.cloudinary.com/dbozdghfi/image/upload/v1778572607/ChatGPT_Image_May_12_2026_12_37_07_PM_atgtgi.png"
          alt=""
        />
      </div>

      <div className={styles.formContainer}>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {!isLogin && (
            <div className={styles.inputGroup}>
              <input
                placeholder="Name"
                className={styles.input}
                // onChange={(e) => {
                //   setName(e.target.value);
                // }}
                // value={name}
                {...registerField("name")}
                required
              />
              {errors.name && (
                <span className={styles.errorText}>{errors.name.message}</span>
              )}
            </div>
          )}
          <div className={styles.inputGroup}>
            <input
              placeholder="Email"
              className={styles.input}
              // onChange={(e) => {
              //   setEmail(e.target.value);
              // }}
              // value={email}
              {...registerField("email")}
              required
            />
            {errors.email && (
              <span className={styles.errorText}>{errors.email.message}</span>
            )}
          </div>
          <div className={styles.inputGroup}>
            <input
              placeholder="Password"
              type="password"
              className={styles.input}
              // onChange={(e) => {
              //   setPassword(e.target.value);
              // }}
              // value={password}
              {...registerField("password")}
              required
            />
            {errors.password && (
              <span className={styles.errorText}>
                {errors.password.message}
              </span>
            )}
          </div>
          <button type="submit" className={styles.button}>
            {isLoading ? (
              <div className={styles.spinner}></div>
            ) : isLogin ? (
              "Login"
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <p className={styles.authOption}>
          Don't have an account?{" "}
          <span onClick={handleAuthOption}>
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
