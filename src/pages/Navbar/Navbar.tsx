import { Link, Outlet } from "react-router";
import styles from "./Navbar.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
export function Navbar() {
  const currentUser = useSelector((state: RootState) => state);
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
          <li>{currentUser?.user?.username}</li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
