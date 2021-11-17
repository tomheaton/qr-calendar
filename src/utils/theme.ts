const setTheme = (theme: "light" | "dark"): void => {
    document.body.dataset.theme = theme;
}

const getTheme = (): string => {
    return localStorage.getItem("theme") || "light";
}

const saveTheme = (theme: "light" | "dark"): void => {
    localStorage.setItem("theme", theme);
}

const toggleTheme = (): void => {
    const current_theme = localStorage.getItem("theme") || "light";
    saveTheme(current_theme == "light" ? "dark" : "light");
    // @ts-ignore
    setTheme(getTheme());
    return;
}

export { setTheme, getTheme, saveTheme, toggleTheme };
