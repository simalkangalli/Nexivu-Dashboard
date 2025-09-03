import { authenticate } from "@/app/lib/actions";
import styles from "@/app/ui/login/login.module.css";

const Login = () => {
  return (
    <div className={styles.container}>
      <form action={authenticate} className={styles.form}>
        <h1>Login</h1>
        <input type="text" name="username" placeholder="username" required />
        <input type="password" name="password" placeholder="password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;