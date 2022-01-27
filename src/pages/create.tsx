import {NextPage} from "next";
import styles from "@styles/Create.module.css";
import {useEffect, useState} from "react";
import QRCode from "react-qr-code";
import Head from "next/head";
// @ts-ignore
import {OptionsData} from "@types/types"; // TODO: fix this.
import dayjs from 'dayjs';

const Create: NextPage = () => {

    const [done, setDone] = useState<boolean>(false);
    const [link, setLink] = useState<string>("");
    const [showLocation, setShowLocation] = useState<boolean>(false);

    // TODO: combine these into a dayjs time type and set date and time.
    const [date, setDate] = useState<string>(dayjs().format("YYYY-MM-DD"));
    const [time, setTime] = useState<string>(dayjs().format("HH:mm"));
    const [hours, setHours] = useState<string>("1");
    const [minutes, setMinutes] = useState<string>("0");
    // TODO: finish implementing allDay option.
    const [allDay, setAllDay] = useState<boolean>(false)
    const [service, setService] = useState<string>("");
    const [operator, setOperator] = useState<string>("");
    const [location, setLocation] = useState<string>("");

    useEffect(() => {
        const _data = localStorage.getItem("data");
        if (_data) {
            const data: OptionsData = JSON.parse(_data)
            setService(data.service)
            setOperator(data.operator)
            if (data.location.length > 0) {
                setLocation(data.location)
                setShowLocation(true);
            }
        }
    }, []);

    const generate = async () => {
        let _dateTime = new Date(`${date}T${time}`).toISOString();
        await setLink(
            `${process.env.NEXT_PUBLIC_CALENDAR_URL}/event`
            + `?dateTime=${encodeURIComponent(_dateTime)}`
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
                        <div className={"card w-full"}>
                            <QRCode id={"QRCode"} value={link} level={"L"}/>
                            <p className={"text"}>Scan the QR Code to share!</p>
                            <button className={"btn"} onClick={() => {setDone(false)}}>
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
                            <div className={styles.inline}>
                                <div className={styles.dateTimeInput}>
                                    <input type={"date"} value={date}
                                           min={dayjs().format("YYYY-MM-DD")}
                                           onKeyDown={(e) => {e.preventDefault();e.stopPropagation()}}
                                           onChange={(e) => setDate(e.target.value)} />
                                </div>
                                <div className={styles.dateTimeInput}>
                                    <input type={"time"} value={time}
                                           pattern="[0-9]{2}:[0-9]{2}"
                                           // onKeyDown={(e) => {e.preventDefault();e.stopPropagation()}}
                                           onChange={(e) => setTime(e.target.value)} />
                                </div>
                            </div>
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
                                    <p>hours</p>
                                </div>
                                <div className={styles.durationInput}>
                                    <select value={minutes}
                                            onChange={(e) => {setMinutes(e.target.value)}}>
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
                            <br/>
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
                                    <button className={"btn"}
                                            onClick={() => {setShowLocation(true)}}>
                                        Add Location
                                    </button>
                                )
                            }
                            <br />
                            <br />
                            {((parseInt(hours) > 0 || parseInt(minutes) > 0) && service && operator) ? (
                                <button className={"btn"} onClick={generate}>
                                    Create
                                </button>
                            ) : (
                                <>
                                    <button disabled={true} className={"btn"}>
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