import {NextPage} from "next";
import styles from "../styles/Create.module.css";
import {useState} from "react";
import QRCode from "react-qr-code";
import {router} from "next/client";
import {useRouter} from "next/router";

const Create: NextPage = () => {

    const router = useRouter();

    const [done, setDone] = useState<boolean>(false);
    const [link, setLink] = useState<string>("");

    const [time, setTime] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [service, setService] = useState<string>("");
    const [operator, setOperator] = useState<string>("");

    const generate = async () => {
/*        router.push({
            pathname: "/event",
            query: {
                time: time, date: date, service: service, operator: operator
            }
        });*/

        await setLink(`https://qrcalendar.${process.env.NEXT_PUBLIC_MAIN_URL}/event?time=${time}&date=${date}&service=${service}&operator=${operator}`);
        await setDone(true);
    }

    // TODO: change inputs to hidden instead of not rendering them to preserve state
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Create</h1>

            <br/>

            <br/>

            {done ? (
                <>
                    {/*<QRCode id={"QRCode"} value={`https://qrcalendar.${process.env.NEXT_PUBLIC_MAIN_URL}/event`}/>*/}
                    <QRCode id={"QRCode"} value={link}/>
                    <p>please scan the QR Code</p>
                    <br/>
                    <button onClick={() => {setDone(false)}}>Edit</button>
                </>
            ) : (
                <>
                    <div className={styles.grid}>
                        <div className={styles.card}>
                            <input type={"text"} placeholder={"time"} onChange={e => setTime(e.target.value)}/>
                            <input type={"text"} placeholder={"date"} onChange={e => setDate(e.target.value)}/>
                            <input type={"text"} placeholder={"service"} onChange={e => setService(e.target.value)}/>
                            <input type={"text"} placeholder={"operator"} onChange={e => setOperator(e.target.value)}/>
                            <br/>
                            <button onClick={generate}>create</button>
                        </div>
                    </div>

                    <div className={styles.error}>
                        <p>please fill out all fields</p>
                    </div>
                </>
            )}

        </div>
    );
}

export default Create;