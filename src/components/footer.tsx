import styles from "../styles/Footer.module.css";
import {useState} from "react";
import {getTheme, toggleTheme} from "../utils/theme";

const Footer = () => {

    const [icon, setIcon] = useState<string>("bi-moon-fill");

    const handleToggleTheme = () => {
        toggleTheme();
        setIcon(getTheme() === "light" ? "bi-moon-fill" : "bi-sun-fill");
    }

    return (
        // <footer className={styles.footer}>
        <footer className={`dev ${styles.footer}`}>
            {/*<div style={{width: "50%"}}>
                <a target="_blank" href="https://www.tomheaton.dev" rel="noopener noreferrer">
                    Tom Heaton
                </a>
            </div>
            <div onClick={handleToggleTheme} className={styles.themeButton}>
                <i className={`bi ${icon}`} aria-label="Theme Toggle"/>
            </div>
            <div style={{width: "50%"}}>
                <a target="_blank" href="https://www.github.com/tomheaton/qr-calendar" rel="noopener noreferrer">
                    View Source
                </a>
            </div>*/}
            <div>
                <a target="_blank" href="https://www.tomheaton.dev" rel="noopener noreferrer">
                    Tom Heaton
                </a>
            </div>
            <div onClick={handleToggleTheme} className={styles.themeButton}>
                <i className={`bi ${icon}`} aria-label="Theme Toggle"/>
            </div>
            <div>
                <a target="_blank" href="https://www.github.com/tomheaton/qr-calendar" rel="noopener noreferrer">
                    View Source
                </a>
            </div>
        </footer>
    );
}

export default Footer;