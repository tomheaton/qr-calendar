import {Dispatch, SetStateAction, useEffect, useState} from "react";

const useDarkMode = (): [string, Dispatch<SetStateAction<string>>] => {

    const [theme, setTheme] = useState<string>(
        typeof window !== "undefined" ? localStorage.theme : "dark"
    );

    const colorTheme = theme === "dark" ? "light" : "dark";

    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove(colorTheme);
        root.classList.add(theme);

        if (typeof window !== "undefined") {
            localStorage.setItem("theme", theme);
        }
    }, [theme]);

    return [colorTheme, setTheme];
}

export default useDarkMode;