import Footer from "./footer";
import {toggleTheme, getTheme} from "../utils/theme";

const Layout = ({children}: { children: any }) => {

    // TODO: move this to _app.tsx

/*    let currentTheme: string = "light";

    const toggleTheme = () => {
        console.log("toggle theme");
        currentTheme = currentTheme === "light" ? "dark" : "light";
        console.log("theme is " + currentTheme);
    }*/

    return (
        <>
            {/*<Navbar />*/}
            <main>{children}</main>
            <Footer toggleTheme={toggleTheme} currentTheme={getTheme}/>
        </>
    )
}

export default Layout;