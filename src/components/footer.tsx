import { getTheme, setTheme, toggleTheme } from "@/utils/theme";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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
  };

  return (
    <footer
      className={
        "flex h-[100px] w-full flex-wrap-reverse items-center justify-evenly border-t-2 border-[#405cf5] pt-[20px] md:pt-0"
      }
    >
      <div className={"w-1/2 md:w-1/3"}>
        <a target={"_blank"} href={"https://tomheaton.dev"} rel={"author noopener noreferrer"}>
          Tom Heaton &copy; {new Date().getFullYear()}
        </a>
      </div>
      <div className={"w-1/2 cursor-pointer p-[12px] text-xl md:w-1/3"} onClick={handleToggleTheme}>
        <i className={`bi ${icon}`} aria-label={"Theme Toggle"} />
      </div>
      <div className={"flex w-full items-center justify-evenly md:w-1/3"}>
        <a
          target={"_blank"}
          href={"https://github.com/tomheaton/qr-calendar"}
          rel={"noopener noreferrer"}
        >
          View Source
          <i className={`bi bi-code-slash pl-2`} aria-label={"View Source"} />
        </a>
        <br />
        <Link href={"/options"} className={"cursor-pointer"}>
          Options
          <i className={`bi bi-gear-fill pl-2`} aria-label={"Options"} />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
