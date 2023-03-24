export const setTheme = (theme: string): void => {
  let colorScheme = document.querySelector('meta[name="color-scheme"]');
  // @ts-ignore
  colorScheme.content = theme;

  if (theme === "light") {
    document.body.classList.remove("dark");
    return;
  }
  document.body.classList.add("dark");
};

export const getTheme = (): string => {
  if (typeof window !== "undefined") {
    const theme = localStorage.getItem("theme");
    if (theme) {
      return theme;
    }
  }
  return "light";
};

export const saveTheme = (theme: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("theme", theme);
  }
};

export const toggleTheme = (): void => {
  if (typeof window !== "undefined") {
    const current_theme = localStorage.getItem("theme") || "light";
    saveTheme(current_theme == "light" ? "dark" : "light");
    setTheme(getTheme());
  }
  return;
};
