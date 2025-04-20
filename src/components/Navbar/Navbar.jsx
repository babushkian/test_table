import { Link, Outlet } from "react-router";
import styles from './Navbar.module.css'

export const Navbar = () => {
    return (
        <>
        <nav >
            <ul className={styles.navbar}>
                <li>
                    <Link className={styles.navlink} to="/">Главный экран</Link>
                </li>
                <li>
                    <Link  className={styles.navlink} to="/login">Логин</Link>
                </li>
            </ul>
        </nav>
        <Outlet/>
        </>
    );
};


