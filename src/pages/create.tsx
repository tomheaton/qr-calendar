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
    const [duration, setDuration] = useState<string>("1");
    const [service, setService] = useState<string>("");
    const [operator, setOperator] = useState<string>("");
    const [date, setDate] = useState<Date>(new Date());

    const showButton = (dateTime && duration && service && operator)

    let yesterday = moment().subtract(1, 'day');
    let valid = (current: any) => current.isAfter(yesterday);

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

    // TODO: change inputs to hidden instead of not rendering them to preserve state.
    return (
        <div className={"container"}>
            <h1 className={"title"}>Create</h1>

            <br/>

            {done ? (
                <>
                    <div className={"grid"}>
                        <div className={styles.cardQr}>
                            <QRCode id={"QRCode"} value={link}/>
                            <p>please scan the QR Code</p>
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
                            {/*TODO: rework duration, maybe separate hours and minutes.*/}
                            <div className={styles.duration}>
                                <input type={"number"} placeholder={"1"} min={"0"} max={"24"} onChange={e => setDuration(e.target.value)}/>
                                <p style={{paddingRight: "20px"}}>hours</p>
                                <input type={"number"} placeholder={"1"} min={"0"} max={"59"} onChange={e => setDuration(e.target.value)}/>
                                <p>minutes</p>
                            </div>
                            <input type={"text"} placeholder={"service"} onChange={e => setService(e.target.value)}/>
                            <input type={"text"} placeholder={"operator"} onChange={e => setOperator(e.target.value)}/>
                            <br/>
                            {(dateTime && duration && service && operator) ? (
                                <button className={"button-9"} onClick={generate}>
                                    Create
                                </button>
                            ) : (
                                <>
                                    <button disabled={true} className={"button-9"}>
                                        Create
                                    </button>
                                    <br/>
                                    <p className={styles.errorMessage}>Please fill out all fields!</p>
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