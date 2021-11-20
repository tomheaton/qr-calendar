import Footer from "./footer";
import {toggleTheme, getTheme} from "../utils/theme";

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