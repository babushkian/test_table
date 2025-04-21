import { Link, Outlet } from "react-router";
import styles from "./Navbar.module.css";
import { useAuth } from "../../hooks/use-auth";
export function Navbar() {
  const authorization = useAuth();

  if (!authorization) {
    throw new Error("Ошибка при авторизации");
  }

  const { currentUser } = authorization;

  return (
    <>
      <nav>
        <ul className={styles.navbar}>
          <li>
            <Link className={styles.navlink} to="/">
              Главный экран
            </Link>
          </li>
          <li>
            <Link className={styles.navlink} to="/login">
              Логин
            </Link>
          </li>
          <li className={styles["long-space"]}>
            <div></div>
          </li>
          <li>{currentUser?.username}</li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
