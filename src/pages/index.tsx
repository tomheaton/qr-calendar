import {NextPage} from 'next';
import Head from 'next/head';
import Footer from "@components/footer";
import Link from "next/link";

const Index: NextPage = () => {

    return (
        <div className={"h-screen bg-white text-black dark:bg-[#212529] dark:text-[#e3e3e3] flex flex-col justify-between"}>
            <Head>
                <title>QR Calendar</title>
                <meta name={"description"} content={"Create calendar events and share them via QR Codes."}/>
                <link rel={"icon"} href={"/favicon.ico"}/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <main className={"h-full flex flex-col justify-center items-center"}>
                <h1 className={"text-6xl font-bold text-center"}>
                    QR Calendar
                </h1>
                <br />
                <p className={"text-2xl text-center"}>
                    To begin, click the
                    <code className={"text-2xl font-bold px-2"}>
                        Create
                    </code>
                    button below!
                </p>
                <br />
                <Link href={"/create"}>
                    <button className={"button"}>
                        Create
                    </button>
                </Link>
            </main>
            <Footer />
        </div>
    );
}

export default Index;
