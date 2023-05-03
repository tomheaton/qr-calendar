module.exports = {
  darkMode: "class",
  content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#f1eedf",
        "my-blue": "#405cf5",
        "light-blue": "#567099",
        "dark-blue": "#313b4a",
        "alt-blue": "#365169",
        // TODO: rename this colour
        // red: "#c74044",
        "lighter-blue": "#0086f3",
        "dark-gray": "#212529",
        // TODO: rename this colour
        // gray: "#343a40",
        "white-ish": "#e3e3e3",
      },
    },
  },
  plugins: [],
};
