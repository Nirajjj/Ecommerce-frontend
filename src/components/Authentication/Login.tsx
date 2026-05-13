import useAuthStore from "@/store/useAuthStore";
import styles from "./Login.module.css";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface LoginFormProps {
  close: () => void;
  roles: string[];
  navigateTo: string;
}

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .trim()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const signupSchema = loginSchema.extend({
  name: z.string().trim().min(1, "Name is required"),
});

type LoginValues = z.infer<typeof loginSchema>;
type SignupValues = z.infer<typeof signupSchema>;
type AuthFormValues = {
  name?: string;
  email: string;
  password: string;
};

const Login = ({ close, roles, navigateTo }: LoginFormProps) => {
  const login = useAuthStore((state) => state.login);
  const registerUser = useAuthStore((state) => state.register);
  const isLoading = useAuthStore((state) => state.isLoading);

  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const schema = useMemo(
    () => (isLogin ? loginSchema : signupSchema),
    [isLogin],
  );

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldUnregister: true,
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    clearErrors();
    reset({ name: "", email: "", password: "" });
  }, [isLogin, clearErrors, reset]);

  const onSubmit = async (data: AuthFormValues) => {
    try {
      if (isLogin) {
        const payload: LoginValues = {
          email: data.email,
          password: data.password,
        };
        await login(payload.email, payload.password);
      } else {
        const payload: SignupValues = {
          name: data.name ?? "",
          email: data.email,
          password: data.password,
        };
        await registerUser(
          payload.name,
          payload.email,
          payload.password,
          roles,
        );
      }

      navigate(navigateTo);
      close();
    } catch {
      setError("root", {
        type: "server",
        message: "Invalid email or password",
      });
    }
  };

  const handleAuthOption = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.imageContainer}>
        <img
          src="https://res.cloudinary.com/dbozdghfi/image/upload/v1778572607/ChatGPT_Image_May_12_2026_12_37_07_PM_atgtgi.png"
          alt="Shopping products"
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
                {...register("name")}
              />
              {errors.name && (
                <span className={styles.errorText}>{errors.name.message}</span>
              )}
            </div>
          )}

          <div className={styles.inputGroup}>
            <input
              type="email"
              placeholder="Email"
              className={styles.input}
              autoComplete="email"
              {...register("email")}
            />
            {errors.email && (
              <span className={styles.errorText}>{errors.email.message}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Password"
              className={styles.input}
              autoComplete={isLogin ? "current-password" : "new-password"}
              {...register("password")}
            />
            {errors.password && (
              <span className={styles.errorText}>
                {errors.password.message}
              </span>
            )}
          </div>

          {errors.root?.message && (
            <div className={styles.errorText}>{errors.root.message}</div>
          )}

          <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading ? (
              <div className={styles.spinner} />
            ) : isLogin ? (
              "Login"
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className={styles.authOption}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={handleAuthOption}>
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
