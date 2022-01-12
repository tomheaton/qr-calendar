import type {NextPage} from "next";
import {useEffect, useState} from "react";
import Head from "next/head";
import {useRouter} from "next/router";
import styles from "../styles/Create.module.css";
import type {OptionsData} from "../types/types";

const Create: NextPage = () => {

    const router = useRouter();

    const returnHome = () => {
        router.push("/");
    }

    const [service, setService] = useState<string>("");
    const [operator, setOperator] = useState<string>("");
    const [location, setLocation] = useState<string>("");

    useEffect(() => {
        const _data = localStorage.getItem("data");
        if (_data) {
            const data: OptionsData = JSON.parse(_data);
            setService(data.service);
            setOperator(data.operator);
            setLocation(data.location);
        }
    }, []);

    const handleSave = () => {
        localStorage.setItem("data", JSON.stringify({ service, operator, location }));
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
                    {service && (<label>Service</label>)}
                    <input type={"text"} placeholder={"service"} value={service}
                           onChange={(e) => setService(e.target.value)}/>
                    {operator && (<label>Operator</label>)}
                    <input type={"text"} placeholder={"operator"} value={operator}
                           onChange={(e) => setOperator(e.target.value)}/>
                    {location && (<label>Location</label>)}
                    <input type={"text"} placeholder={"location"} value={location}
                           onChange={(e) => setLocation(e.target.value)}/>
                    <button className={"btn"} onClick={handleSave}>Save</button>
                    <button className={"btn"} onClick={returnHome}>Return Home</button>
                </div>
            </div>
        </div>
    );
}

export default Create;