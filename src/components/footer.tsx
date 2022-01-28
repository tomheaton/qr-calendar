import React, {useState} from "react";
import {getTheme, toggleTheme} from "@utils/theme";

const Footer: React.FC = () => {

    const [icon, setIcon] = useState<string>("bi-moon-fill");

    const handleToggleTheme = () => {
        toggleTheme();
        setIcon(getTheme() === "light" ? "bi-moon-fill" : "bi-sun-fill");
    }

    return (
        <footer className={"w-full h-[100px] border-t-2 border-[#405cf5] flex items-center justify-evenly"}>
            <div>
                <a target="_blank" href="https://www.tomheaton.dev" rel="noopener noreferrer">
                    Tom Heaton
                </a>
            </div>
            <div onClick={handleToggleTheme} className={"text-xl cursor-pointer p-[12px]"}>
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