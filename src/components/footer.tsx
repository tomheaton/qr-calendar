import styles from "../styles/Footer.module.css";
import {toggleTheme as toggleThemeOld, getTheme} from "../utils/theme";

const Footer = ({toggleTheme, currentTheme}: {toggleTheme: any, currentTheme: string}) => {

    // let icon = currentTheme === "dark" ? "bi-moon-fill" : "bi-sun-fill";
    let icon = getTheme() === "dark" ? "bi-moon-fill" : "bi-sun-fill";

    const handleThemeToggle = () => {
        toggleThemeOld()
        icon = getTheme() === "dark" ? "bi-moon-fill" : "bi-sun-fill";
    }

    return (
        <footer className={styles.footer}>
            <a target="_blank" href="https://www.tomheaton.dev" rel="noopener noreferrer">
                Tom Heaton
            </a>
            {/*<button onClick={toggleTheme}>*/}
            <button onClick={handleThemeToggle}>
                <i className={`bi ${icon} ${styles.themeButton}`} aria-label="Theme Toggle"/>
            </button>
            <a target="_blank" href="https://www.github.com/tomheaton/qr-calendar" rel="noopener noreferrer">
                View Source
            </a>
        </footer>
    );
}

export default Footer;