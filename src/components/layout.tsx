import Footer from "@components/footer";

const Layout = ({children}: { children: any }) => {

    return (
        <>
            {/*<Navbar />*/}
            <main>{children}</main>
            <Footer />
        </>
    )
}

export default Layout;