import {NextPage} from "next";
import styles from "../styles/Create.module.css";
import {useState} from "react";
import QRCode from "react-qr-code";
import {useRouter} from "next/router";
import Datetime from "react-datetime";
import moment from 'moment';

const Create: NextPage = () => {

    const router = useRouter();

    const [done, setDone] = useState<boolean>(false);
    const [link, setLink] = useState<string>("");

    const [dateTime, setDateTime] = useState<string>("");
    const [hours, setHours] = useState<string>("1");
    const [minutes, setMinutes] = useState<string>("0");
    const [service, setService] = useState<string>("");
    const [operator, setOperator] = useState<string>("");
    const [date, setDate] = useState<Date>(new Date());

    let yesterday = moment().subtract(1, 'day');
    let valid = (current: any) => current.isAfter(yesterday);

    let duration: number = parseInt(hours) + (parseInt(minutes)/60);

    const handleDateTimeChange = (a: any) => {
        let d: Date = a.toDate();
        setDate(d);
        setDateTime(d.toISOString());
    }

    const generate = async () => {

        let newLink = `https://qr-calendar.${process.env.NEXT_PUBLIC_CALENDAR_URL}/event?dateTime=${encodeURIComponent(dateTime)}&duration=${encodeURIComponent(duration)}&service=${encodeURIComponent(service)}&operator=${encodeURIComponent(operator)}`;

        //await router.push(newLink); // Testing.
        await setLink(newLink);
        await setDone(true);
    }

    return (
        <div className={"container"}>
            <h1 className={"title"}>{done ? "Share your" : "Create an"} Event</h1>

            <br/>

            {done ? (
                <>
                    <div className={"grid"}>
                        <div className={styles.card2}>
                            <QRCode id={"QRCode"} value={link}/>
                            <p className={"text"}>Scan the QR Code to share!</p>
                            <br/>
                            <button className={"button-9"} onClick={() => {setDone(false)}}>
                                Edit
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className={"grid"}>
                        <div className={styles.card}>
                            <Datetime onChange={handleDateTimeChange} isValidDate={valid} initialValue={new Date()} value={date}/>
                            <div className={styles.duration}>
                                <input type={"number"} placeholder={"1"} min={"0"} max={"24"} step={"1"} onChange={e => setHours(e.target.value)} value={hours}/>
                                <p style={{paddingRight: "20px"}}>hours</p>
                                <input type={"number"} placeholder={"1"} min={"0"} max={"59"} step={"1"} onChange={e => setMinutes(e.target.value)} value={minutes}/>
                                <p>minutes</p>
                            </div>
                            <input type={"text"} placeholder={"service"} onChange={e => setService(e.target.value)} value={service}/>
                            <input type={"text"} placeholder={"operator"} onChange={e => setOperator(e.target.value)} value={operator}/>
                            <br/><br/>
                            {(dateTime && (hours || minutes) && service && operator) ? (
                                <button className={"button-9"} onClick={generate}>
                                    Create
                                </button>
                            ) : (
                                <>
                                    <button disabled={true} className={"button-9"}>
                                        Create
                                    </button>
                                    <br/><br/>
                                    <p className={"text"}>Please fill out all fields!</p>
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}

        </div>
    );
}

export default Create;