import styles from "../styles/Footer.module.css";
import useTheme from "../utils/useTheme";
import {useState} from "react";

const Footer = () => {

    const [theme, setTheme] = useTheme();
    const [icon, setIcon] = useState<string>("bi-sun-fill");

    const handleThemeChange = () => {
        setTheme(theme == "dark" ? "light" : "dark");
        setIcon(theme == "dark" ? "bi-moon-fill" : "bi-sun-fill");
        console.log("handling theme change: ", theme);
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