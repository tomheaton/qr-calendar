import type {NextPage} from "next";
import styles from "../styles/Create.module.css";
import {useEffect, useState} from "react";
import QRCode from "react-qr-code";
import Datetime from "react-datetime";
import moment, {Moment} from 'moment';
import Head from "next/head";
import type {OptionsData} from "../types/types";

const Create: NextPage = () => {

    const [done, setDone] = useState<boolean>(false);
    const [link, setLink] = useState<string>("");
    const [showLocation, setShowLocation] = useState<boolean>(false);

    const [dateTime, setDateTime] = useState<string>("");
    const [hours, setHours] = useState<string>("0");
    const [minutes, setMinutes] = useState<string>("0");
    const [service, setService] = useState<string>("");
    const [operator, setOperator] = useState<string>("");
    const [date, setDate] = useState<Date>(new Date());
    const [location, setLocation] = useState<string>("");
    const [allDay, setAllDay] = useState<boolean>(false)

    useEffect(() => {
        const _data = localStorage.getItem("data");
        if (_data) {
            const data: OptionsData = JSON.parse(_data)
            setService(data.service)
            setOperator(data.operator)
            if (data.location != "") {
                setLocation(data.location)
                setShowLocation(true);
            }
        }
    }, []);

    let valid = (current: Moment) => current.isAfter(moment().subtract(1, 'day'));

    const handleDateTimeChange = (a: any) => {
        try {
            let d: Date = a.toDate();
            setDate(d);
            setDateTime(d.toISOString());
        } catch (e: any) {
            return;
        }
    }

    const handleDateTimeChangeNew = (x: any) => {
        console.log(`x: ${x}`);
    }

    const generate = async () => {
        await setLink(
            `${process.env.NEXT_PUBLIC_CALENDAR_URL}/event`
            + `?dateTime=${encodeURIComponent(dateTime)}`
            + `&hours=${allDay ? encodeURIComponent("-1") : encodeURIComponent(hours)}`
            + `&minutes=${allDay ? encodeURIComponent("-1") : encodeURIComponent(minutes)}`
            + `&service=${encodeURIComponent(service)}`
            + `&operator=${encodeURIComponent(operator)}`
            + `${showLocation && location.length > 0 ? `&location=${encodeURIComponent(location)}` : ""}`);
        await setDone(true);
    }

    return (
        <div className={"container"}>
            <Head>
                <title>Create | QR Calendar</title>
                <meta name="description" content="Create calendar events and share them via QR Codes."/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <h1 className={"title"}>{done ? "Share your" : "Create an"} Event</h1>
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
                            {/*TODO: form?*/}
                            <Datetime isValidDate={valid} initialValue={new Date()} value={date}
                                      onChange={handleDateTimeChange} />
                            {/*<input min={Date.now()} defaultValue={Date.now()} value={date2} type={"datetime-local"}
                                   onChange={handleDateTimeChange2} />*/}
                            <input min={Date.now()} defaultValue={Date.now()} type={"datetime-local"}
                                   className={styles.dateTime}
                                   onChange={(e) => handleDateTimeChangeNew(e.target.value)} />
                            <div className={styles.duration}>
                                <div className={styles.durationInput}>
                                    <select value={hours}
                                            onChange={(e) => {setHours((parseInt(e.target.value)).toString())}}>
                                        {Array.from(Array(25), (_, i) => i).map((x) => {
                                            return (
                                                <option value={x} key={x}>{x}</option>
                                            );
                                        })}
                                    </select>
                                    <p style={{paddingRight: "10px"}}>hours</p>
                                </div>
                                <div className={styles.durationInput} >
                                    <select value={minutes} onChange={(e) => {setMinutes(e.target.value)}}>
                                        {Array.from(Array(12), (_, i) => (i)*5).map((x) => {
                                            return (
                                                <option value={x} key={x}>{x}</option>
                                            );
                                        })}
                                    </select>
                                    <p>minutes</p>
                                </div>
                                {/*TODO: improve styling.*/}
                                {/*<div className={styles.durationInput} style={{paddingLeft: "10px"}}>
                                    <input type={"checkbox"} defaultChecked={false} checked={allDay}
                                           onChange={e => {setAllDay(e.target.checked)}} />
                                    <p style={{fontSize: "16px", width: "100%"}}>All day</p>
                                </div>*/}
                            </div>
                            {service && (<label>Service</label>)}
                            <input type={"text"} placeholder={"service"} value={service}
                                   onChange={e => setService(e.target.value)} />
                            {operator && (<label>Operator</label>)}
                            <input type={"text"} placeholder={"operator"} value={operator}
                                   onChange={e => setOperator(e.target.value)} />
                            {
                                showLocation ? (
                                    <>
                                        {location && (<label>Location</label>)}
                                        <input type={"text"} placeholder={"location"} value={location}
                                               onChange={e => setLocation(e.target.value)} />
                                    </>
                                ) : (
                                    <button className={"button-9"}
                                            onClick={() => {setShowLocation(true)}}>
                                        add location
                                    </button>
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
                                    <br />
                                    <br />
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