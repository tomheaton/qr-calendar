import {NextPage} from "next";
import styles from "../styles/Create.module.css";
import {useState} from "react";
import QRCode from "react-qr-code";
import {router} from "next/client";
import {useRouter} from "next/router";
import Datetime from "react-datetime";
import moment, {Moment} from 'moment';

const Create: NextPage = () => {

    const router = useRouter();

    const [done, setDone] = useState<boolean>(false);
    const [link, setLink] = useState<string>("");

    const [dateTime, setDateTime] = useState<string>("");
    const [duration, setDuration] = useState<string>("1");
    const [service, setService] = useState<string>("");
    const [operator, setOperator] = useState<string>("");
    const [date, setDate] = useState<Date>(new Date());

    let yesterday = moment().subtract(1, 'day');
    let valid = (current: any) => current.isAfter(yesterday);

    const handleDateTimeChange = (a: any) => {
        let d: Date = a.toDate();
        setDate(d);
        setDateTime(d.toISOString());
    }

    const generate = async () => {
        // Testing:
        router.push({
            pathname: "/event",
            query: {
                dateTime: dateTime, duration: duration, service: service, operator: operator
            }
        });

        await setLink(`https://qrcalendar.${process.env.NEXT_PUBLIC_CALENDAR_URL}/event?dateTime=${dateTime}&duration=${duration}&service=${service}&operator=${operator}`);
        await setDone(true);
    }

    // TODO: change inputs to hidden instead of not rendering them to preserve state.
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Create</h1>

            <br/>

            {done ? (
                <>
                    <div className={styles.grid}>
                        <div className={styles.cardQr}>
                            <QRCode id={"QRCode"} value={link}/>
                            <p>please scan the QR Code</p>
                            <br/>
                            <button className={styles.button} onClick={() => {
                                setDone(false)
                            }}>Edit
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.grid}>
                        <div className={styles.card}>
                            <Datetime onChange={handleDateTimeChange} isValidDate={valid} initialValue={new Date()}
                                      value={date}/>
                            {/*TODO: rework duration, maybe separate hours and minutes.*/}
                            <input type={"number"} placeholder={"1"} min={"0"} max={"24"}
                                   onChange={e => setDuration(e.target.value)}/>
                            <input type={"text"} placeholder={"service"} onChange={e => setService(e.target.value)}/>
                            <input type={"text"} placeholder={"operator"} onChange={e => setOperator(e.target.value)}/>
                            <br/>
                            <br/>
                            {(dateTime && duration && service && operator) ? (
                                <button className={styles.button} onClick={generate}>create</button>
                            ) : (
                                <div className={styles.error}>
                                    <p>Please fill out all fields!</p>
                                </div>
                            )}

                        </div>
                    </div>


                </>
            )}

        </div>
    );
}

export default Create;