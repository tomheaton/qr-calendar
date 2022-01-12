const setTheme = (theme: "light" | "dark"): void => {
    document.body.dataset.theme = theme;
    let colorScheme = document.querySelector('meta[name="color-scheme"]');
    // @ts-ignore
    colorScheme.content = theme;
}

const getTheme = (): string => {
    if (typeof window !== "undefined") {
        let theme = localStorage.getItem("theme")
        if (theme) {
            return theme;
        }
    }
    return "light";
}

const saveTheme = (theme: "light" | "dark"): void => {
    if (typeof window !== "undefined") {
        localStorage.setItem("theme", theme);
    }
}

const toggleTheme = (): void => {
    if (typeof window !== "undefined") {
        const current_theme = localStorage.getItem("theme") || "light";
        saveTheme(current_theme == "light" ? "dark" : "light");
        // @ts-ignore
        setTheme(getTheme());
    }
    return;
}

export { setTheme, getTheme, saveTheme, toggleTheme };