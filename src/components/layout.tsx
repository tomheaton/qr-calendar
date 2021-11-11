import Footer from "./footer";

const Layout = ({children}: { children: any }) => {

    const toggleTheme = () => {
        console.log("toggle theme");
    }

    return (
        <>
            {/*<Navbar />*/}
            <main>{children}</main>
            <Footer toggleTheme={toggleTheme}/>
        </>
    )
}

export default Layout;