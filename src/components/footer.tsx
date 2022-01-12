import styles from "../styles/Footer.module.css";
import {useState} from "react";
import {getTheme, toggleTheme} from "../utils/theme";

const Footer = () => {

    const [icon, setIcon] = useState<string>("bi-sun-fill");

    const handleToggleTheme = () => {
        toggleTheme();
        setIcon(getTheme() === "dark" ? "bi-sun-fill" : "bi-moon-fill");
    }

    return (
        <footer className={styles.footer}>
            <a target="_blank" href="https://www.tomheaton.dev" rel="noopener noreferrer">
                Tom Heaton
            </a>
            <div onClick={handleToggleTheme} className={styles.themeButton}>
                <i className={`bi ${icon}`} aria-label="Theme Toggle"/>
            </div>
            <a target="_blank" href="https://www.github.com/tomheaton/qr-calendar" rel="noopener noreferrer">
                View Source
            </a>
        </footer>
    );
}

export default Footer;