import Footer from "./footer";
import {getTheme, toggleTheme} from "../utils/theme";

const Layout = ({children}: { children: any }) => {

    return (
        <>
            {/*<Navbar />*/}
            <main>{children}</main>
            <Footer toggleTheme={toggleTheme} currentTheme={getTheme}/>
        </>
    )
}

export default Layout;