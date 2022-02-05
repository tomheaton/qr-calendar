const setTheme = (theme: string): void => {
    if (theme === "light") {
        document.body.classList.remove("dark");
        return;
    }
    document.body.classList.add("dark");
}

const getTheme = (): string => {
    if (typeof window !== "undefined") {
        const theme = localStorage.getItem("theme")
        if (theme) {
            return theme;
        }
    }
    return "light";
}

const saveTheme = (theme: string): void => {
    if (typeof window !== "undefined") {
        localStorage.setItem("theme", theme);
    }
}

const toggleTheme = (): void => {
    if (typeof window !== "undefined") {
        const current_theme = localStorage.getItem("theme") || "light";
        saveTheme(current_theme == "light" ? "dark" : "light");
        setTheme(getTheme());
    }
    return;
}

export { setTheme, getTheme, saveTheme, toggleTheme };