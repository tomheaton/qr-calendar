import styles from "../styles/Footer.module.css";

const Footer = ({darkMode, setDarkMode}: {darkMode: any, setDarkMode: any}) => {

    const handleThemeChange = () => {
        console.log("handling theme change");
        setDarkMode(darkMode == "dark" ? "light" : "dark")
    }

    return (
        <footer className={styles.footer}>
            <h2>Theme: {darkMode}</h2>
            <a target="_blank" href="https://www.tomheaton.dev" rel="noopener noreferrer">
                Tom Heaton
            </a>
            <button onClick={handleThemeChange}>
                <i className={`bi ${darkMode == "dark" ? "bi-moon-fill" : "bi-sun-fill"} ${styles.themeButton}`} aria-label="Theme Toggle"/>
            </button>
            <a target="_blank" href="https://www.github.com/tomheaton/qr-calendar" rel="noopener noreferrer">
                View Source
            </a>
        </footer>
    );
}

export default Footer;