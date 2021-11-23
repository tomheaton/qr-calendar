import Footer from "./footer";
import {getTheme, toggleTheme} from "../utils/theme";

const Layout = ({children, darkMode, setDarkMode}: { children: any, darkMode: any, setDarkMode: any }) => {

    return (
        <>
            {/*<Navbar />*/}
            <main>{children}</main>
            <Footer darkMode={darkMode} setDarkMode={setDarkMode}/>
        </>
    )
}

export default Layout;