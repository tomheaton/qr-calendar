import {NextPage} from "next";
import styles from "../styles/Create.module.css";
import {useState} from "react";
import QRCode from "react-qr-code";
import Datetime from "react-datetime";
import moment, {Moment} from 'moment';
import Head from "next/head";

const Create: NextPage = () => {

    const [done, setDone] = useState<boolean>(false);
    const [link, setLink] = useState<string>("");
    const [showLocation, setShowLocation] = useState<boolean>(false);

    const [dateTime, setDateTime] = useState<string>("");
    const [hours, setHours] = useState<string>("1");
    const [minutes, setMinutes] = useState<string>("0");
    const [service, setService] = useState<string>("");
    const [operator, setOperator] = useState<string>("");
    const [date, setDate] = useState<Date>(new Date());
    // const [date2, setDate2] = useState<any>(new Date());
    const [location, setLocation] = useState<string>("");

    let valid = (current: Moment) => current.isAfter(moment().subtract(1, 'day'));

    const handleDateTimeChange = (a: any) => {
        try {
            let d: Date = a.toDate();
            setDate(d);
            setDateTime(d.toISOString());
        }
        catch (e: any) {
            return;
        }
    }

/*    const handleDateTimeChange2 = (a: any) => {
        console.log("date2: ", date2, "type = ", typeof(a))
        setDate2(a)
    }*/

    const generate = async () => {
        await setLink(
            `https://qr-calendar.${process.env.NEXT_PUBLIC_CALENDAR_URL}/event`
            +`?dateTime=${encodeURIComponent(dateTime)}`
            +`&hours=${encodeURIComponent(hours)}`
            +`&minutes=${encodeURIComponent(minutes)}`
            +`&service=${encodeURIComponent(service)}`
            +`&operator=${encodeURIComponent(operator)}`
            +`${showLocation && location.length > 0 ? `&location=${encodeURIComponent(location)}` : ""}`
        );
        await setDone(true);
    }

    return (
        <div className={"container"}>
            <Head>
                <title>Create | QR Calendar</title>
                <meta name="description" content="Simple webapp to create calendar events and share then via QR Codes."/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <h1 className={"title"}>{done ? "Share your" : "Create an"} Event</h1>
            {/*<p>Date2: {date2.toString()}</p>*/}
            <br/>
            {done ? (
                <>
                    <div className={"grid"}>
                        <div className={styles.card2}>
                            <QRCode id={"QRCode"} value={link}/>
                            <p className={"text"}>Scan the QR Code to share!</p>
                            <button className={"button-9"} onClick={() => {setDone(false)}}>
                                Edit
                            </button>
                            <br/>
                            <p className={"textSmall"}>
                                Or click{" "}
                                <a className={styles.quickLink} href={link}>here</a>
                                {" "}to add manually.
                            </p>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className={"grid"}>
                        <div className={styles.card}>
                            <Datetime onChange={handleDateTimeChange} isValidDate={valid} initialValue={new Date()} value={date}/>
                            {/*<input min={Date.now()} defaultValue={Date.now()} value={date2} type={"datetime-local"} onChange={handleDateTimeChange2}/>*/}
                            <div className={styles.duration}>
                                <div className={styles.durationInput}>
                                    {/*<input type={"number"} placeholder={"1"} min={"0"} max={"24"} step={"1"} onChange={e => setHours(e.target.value)} value={hours}/>*/}
                                    <select value={hours} onChange={(e) => {setHours((parseInt(e.target.value)).toString())}}>
                                        {Array.from(Array(25), (_, i) => i).map((x) => {
                                            return (<option value={x} key={x}>{x}</option>);
                                        })}
                                    </select>
                                    <p style={{paddingRight: "20px"}}>hours</p>
                                </div>
                                <div className={styles.durationInput} >
                                    {/*<input type={"number"} placeholder={"1"} min={"0"} max={"59"} step={"1"} onChange={e => setMinutes(e.target.value)} value={minutes}/>*/}
                                    <select value={minutes} onChange={(e) => {setMinutes(e.target.value)}}>
                                        {Array.from(Array(12), (_, i) => (i)*5).map((x) => {
                                            return (<option value={x} key={x}>{x}</option>);
                                        })}
                                    </select>
                                    <p>minutes</p>
                                </div>
                            </div>
                            <input type={"text"} placeholder={"service"} onChange={e => setService(e.target.value)} value={service}/>
                            <input type={"text"} placeholder={"operator"} onChange={e => setOperator(e.target.value)} value={operator}/>
                            {
                                showLocation ? (
                                    <input type={"text"} placeholder={"location"} onChange={e => setLocation(e.target.value)} value={location}/>
                                ) : (
                                    <button className={"button-9"} onClick={() => {setShowLocation(true)}}>add location</button>
                                )
                            }
                            <br/><br/>
                            {(dateTime && (parseInt(hours) > 0 || parseInt(minutes) > 0) && service && operator) ? (
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