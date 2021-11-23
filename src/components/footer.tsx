import styles from "../styles/Footer.module.css";
import useDarkMode from "../utils/useDarkMode";
import {useState} from "react";

const Footer = () => {

    const [darkMode, setDarkMode] = useDarkMode();
    const [icon, setIcon] = useState<string>("bi-sun-fill");

    const handleThemeChange = () => {
        setDarkMode(darkMode == "dark" ? "light" : "dark");
        setIcon(darkMode == "dark" ? "bi-moon-fill" : "bi-sun-fill");
        console.log("handling theme change: ", darkMode);
    }

    return (
        <footer className={styles.footer}>
            <a target="_blank" href="https://www.tomheaton.dev" rel="noopener noreferrer">
                Tom Heaton
            </a>
            <button onClick={handleThemeChange}>
                <i className={`bi ${icon} ${styles.themeButton}`} aria-label="Theme Toggle"/>
            </button>
            <a target="_blank" href="https://www.github.com/tomheaton/qr-calendar" rel="noopener noreferrer">
                View Source
            </a>
        </footer>
    );
}

export default Footer;