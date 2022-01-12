import type {NextPage} from "next";
import {useEffect, useState} from "react";
import Head from "next/head";
import {useRouter} from "next/router";
import styles from "../styles/Create.module.css";

type Data = {
    operator: string,
    location: string
}

const Create: NextPage = () => {

    const router = useRouter();

    const returnHome = () => {
        router.push("/");
    }

    const [operator, setOperator] = useState<string>("");
    const [location, setLocation] = useState<string>("");

    useEffect(() => {
        const _data = localStorage.getItem("data");
        if (_data) {
            const data: Data = JSON.parse(_data)
            setOperator(data.operator)
            setLocation(data.location)
        }
    }, []);

    const handleSave = () => {
        localStorage.setItem("data", JSON.stringify({operator, location}));
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