import type {NextPage} from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {useRouter} from "next/router";

const Home: NextPage = () => {

    const router = useRouter();

    return (
        <div className={"container"}>
            <Head>
                <title>QR Calendar</title>
                <meta name="description" content="Simple webapp to create calendar events and share then via QR Codes."/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={styles.main}>
                <h1 className={"title"}>
                    QR Calendar
                </h1>
                <p className={"description"}>
                    To begin, click the
                    <code className={styles.code}>Create</code>
                    button below!
                </p>
                <div>
                    <button className={"button-9"} onClick={() => {router.push("/create")}}>
                        Create
                    </button>
                </div>
            </main>
        </div>
    );
}

export default Home;
