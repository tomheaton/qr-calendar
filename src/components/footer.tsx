import styles from "../styles/Footer.module.css";
import {useEffect, useState} from "react";

const Footer = ({toggleTheme, currentTheme}: {toggleTheme: any, currentTheme: any}) => {

    return (
        <footer className={styles.footer}>
            <a target="_blank" href="https://www.tomheaton.dev" rel="noopener noreferrer">
                Tom Heaton
            </a>
            <button onClick={toggleTheme}>
                <i className={`bi ${currentTheme == "dark" ? "bi-moon-fill" : "bi-sun-fill"} ${styles.themeButton}`} aria-label="Theme Toggle"/>
            </button>
            <a target="_blank" href="https://www.github.com/tomheaton/qr-calendar" rel="noopener noreferrer">
                View Source
            </a>
        </footer>
    );
}

export default Footer;