import React, {useEffect, useState} from "react";
import {getTheme, setTheme, toggleTheme} from "@utils/theme";
import Link from "next/link";

const Footer: React.FC = () => {

    const [icon, setIcon] = useState<string>("bi-moon-fill");

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", (e) => {
                setTheme(e.matches ? "light" : "dark");
                setIcon(getTheme() === "light" ? "bi-moon-fill" : "bi-sun-fill");
            });
        }

        const theme = getTheme();
        setTheme(theme);
        setIcon(theme === "light" ? "bi-moon-fill" : "bi-sun-fill");
    }, []);

    const handleToggleTheme = () => {
        toggleTheme();
        setIcon(getTheme() === "light" ? "bi-moon-fill" : "bi-sun-fill");
    }

    return (
        <footer
            className={"w-full h-[100px] border-t-2 border-[#405cf5] flex items-center justify-evenly flex-wrap-reverse md:pt-0 pt-[20px] "}>
            <div className={"w-1/2 md:w-1/3"}>
                <a target="_blank" href="https://www.tomheaton.dev" rel="author noopener noreferrer">
                    Tom Heaton &copy; {new Date().getFullYear()}
                </a>
            </div>
            <div className={"w-1/2 md:w-1/3 text-xl cursor-pointer p-[12px]"} onClick={handleToggleTheme}>
                <i className={`bi ${icon}`} aria-label="Theme Toggle"/>
            </div>
            <div className={"w-full md:w-1/3 flex justify-evenly items-center"}>
                <a target="_blank" href="https://www.github.com/tomheaton/qr-calendar" rel="noopener noreferrer">
                    View Source
                    <i className={`bi bi-code-slash pl-2`} aria-label="Theme Toggle"/>
                </a>
                <br/>
                <Link href={"/options"}>
                    <a className={"cursor-pointer"}>
                        Options
                        <i className={`bi bi-gear-fill pl-2`} aria-label="Theme Toggle"/>
                    </a>
                </Link>
            </div>
        </footer>
    );
}

export default Footer;