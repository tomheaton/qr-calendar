import type {NextPage} from 'next';
import Head from 'next/head';
import styles from '../styles/Index.module.css';
import {useRouter} from "next/router";

const Index: NextPage = () => {

    const router = useRouter();

    return (
        <div className={"container"}>
            <Head>
                <title>QR Calendar</title>
                <meta name="description" content="Create calendar events and share them via QR Codes."/>
                <link rel="icon" href="/favicon.ico"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
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
                <div className={styles.buttonContainer}>
                    <button className={"btn"} style={{width: "80%"}} onClick={() => {router.push("/create")}}>
                        Create
                    </button>
                </div>
            </main>
        </div>
    );
}

export default Index;
