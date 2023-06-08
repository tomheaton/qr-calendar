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
    <footer className="flex h-24 w-full flex-wrap items-center justify-evenly pt-4 md:pt-0">
      <div className="w-full md:w-1/3">
        <a
          target="_blank"
          href="https://tomheaton.dev"
          rel="author noopener noreferrer"
          className="mr-1 hover:text-my-blue"
        >
          Tom Heaton
        </a>
        &copy; {new Date().getFullYear()}
      </div>
      <button
        className="mx-auto hidden cursor-pointer p-2 text-xl transition-all hover:scale-105 hover:text-my-blue active:scale-95 md:block"
        onClick={handleToggleTheme}
      >
        <i className={`bi ${icon}`} aria-label="Theme Toggle" />
      </button>
      <div className="flex w-2/3 items-center justify-evenly md:w-1/3">
        <a
          target="_blank"
          href="https://github.com/tomheaton/qr-calendar"
          rel="noopener noreferrer"
          className="hover:text-my-blue"
        >
          Source
          <i className="bi bi-code-slash pl-2" aria-label="View Source" />
        </a>
        <button
          className="mx-auto cursor-pointer p-2 text-xl transition-all hover:scale-105 hover:text-my-blue active:scale-95 md:hidden"
          onClick={handleToggleTheme}
        >
          <i className={`bi ${icon}`} aria-label="Theme Toggle" />
        </button>
        <Link href="/options" className="cursor-pointer hover:text-my-blue">
          Options
          <i className="bi bi-gear-fill pl-2" aria-label="Options" />
        </Link>
      </div>
    </footer>
  );

  // return (
  //   <footer className="flex h-24 w-full flex-wrap-reverse items-center justify-evenly pt-4 md:pt-0">
  //     <div className="w-1/2 md:w-1/3">
  //       <a
  //         target="_blank"
  //         href="https://tomheaton.dev"
  //         rel="author noopener noreferrer"
  //         className="mr-1 hover:text-my-blue"
  //       >
  //         Tom Heaton
  //       </a>
  //       &copy; {new Date().getFullYear()}
  //     </div>
  //     <div
  //       className="mx-auto cursor-pointer p-2 text-xl transition-all hover:scale-105 active:scale-95"
  //       onClick={handleToggleTheme}
  //     >
  //       <i className={`bi ${icon}`} aria-label="Theme Toggle" />
  //     </div>
  //     <div className="flex w-full items-center justify-evenly md:w-1/3">
  //       <a
  //         target="_blank"
  //         href="https://github.com/tomheaton/qr-calendar"
  //         rel="noopener noreferrer"
  //         className="hover:text-my-blue"
  //       >
  //         View Source
  //         <i className="bi bi-code-slash pl-2" aria-label="View Source" />
  //       </a>
  //       <br />
  //       <Link href="/options" className="cursor-pointer hover:text-my-blue">
  //         Options
  //         <i className="bi bi-gear-fill pl-2" aria-label="Options" />
  //       </Link>
  //     </div>
  //   </footer>
  // );
};

export default Footer;
