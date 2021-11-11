import Footer from "./footer";

const Layout = ({children}: { children: any }) => {

    const toggleDarkMode = () => {
        console.log("toggle theme mode");
    }

    return (
        <>
            {/*<Navbar />*/}
            <main>{children}</main>
            <Footer toggleDarkMode={toggleDarkMode}/>
        </>
    )
}

export default Layout;