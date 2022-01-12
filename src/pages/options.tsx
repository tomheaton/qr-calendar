import type {NextPage} from "next";
import {useState} from "react";
import Head from "next/head";
import {useRouter} from "next/router";
import styles from "../styles/Create.module.css";

const Create: NextPage = () => {

    const router = useRouter();

    const returnHome = () => {
        router.push("/");
    }

    const [operator, setOperator] = useState<string>("");
    const [location, setLocation] = useState<string>("");

    const handleSave = () => {
        console.log(`Operator: ${operator}\nLocation: ${location}`);
    }

    return (
        <div className={"container"}>
            <Head>
                <title>Options | QR Calendar</title>
                <meta name="description" content="Create calendar events and share them via QR Codes."/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <h1 className={"title"}>Options 🛠️</h1>
            <br />
            <div className={"grid"}>
                <div className={styles.card}>
                    <input type={"text"} placeholder={"operator"} value={operator}
                           onChange={(e) => setOperator(e.target.value)}/>
                    <input type={"text"} placeholder={"location"} value={location}
                           onChange={(e) => setLocation(e.target.value)}/>
                    <button className={"button-9"} onClick={handleSave}>Save</button>
                    <button className={"button-9"} onClick={returnHome}>Return Home</button>
                </div>
            </div>
        </div>
    );
}

export default Create;