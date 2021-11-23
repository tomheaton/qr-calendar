const setTheme = (theme: "light" | "dark"): void => {
    document.body.dataset.theme = theme;
}

const getTheme = (): string => {
    let theme;
    if (typeof window !== 'undefined') {
        theme = localStorage.getItem("theme")
    }
    return theme || "light";
}

const saveTheme = (theme: "light" | "dark"): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem("theme", theme);
    }
}

const toggleTheme = (): void => {
    let current_theme;

    if (typeof window !== 'undefined') {
        current_theme = localStorage.getItem("theme") || "light";
    }
    saveTheme(current_theme == "light" ? "dark" : "light");
    // @ts-ignore
    setTheme(getTheme());
    return;
}

export { setTheme, getTheme, saveTheme, toggleTheme };
