import type {NextPage} from "next";
import styles from "@styles/Create.module.css";
import {SyntheticEvent, useEffect, useState} from "react";
import QRCode from "react-qr-code";
import Head from "next/head";
import type {OptionsData} from "@utils/types";
import dayjs from 'dayjs';
import Footer from "@components/footer";
import {event} from "@lib/gtag";

const Create: NextPage = () => {
    const [done, setDone] = useState<boolean>(false);
    const [link, setLink] = useState<string>("");
    const [showLocation, setShowLocation] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

    const isDisabled: boolean = !((parseInt(hours) > 0 || parseInt(minutes) > 0) && service && operator);

    useEffect(() => {
        const rawData = localStorage.getItem("data");
        if (rawData) {
            const data: OptionsData = JSON.parse(rawData)
            setService(data.service)
            setOperator(data.operator)
            if (data.location.length > 0) {
                setLocation(data.location)
                setShowLocation(true);
            }
        }
    }, []);

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        event({
            action: "create_event",
            category: "engagement",
            label: "method",
            value: 1
        });

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
        <div
            className={"h-screen w-screen bg-white text-black dark:bg-[#212529] dark:text-[#e3e3e3] flex flex-col justify-between"}>
            <Head>
                <title>Create | QR Calendar</title>
                <meta name={"description"} content={"Create calendar events and share them via QR Codes."}/>
                <link rel={"icon"} href={"/favicon.ico"}/>
            </Head>
            <main className={"h-full w-full flex flex-col justify-center items-center"}>
                <h1 className={"text-6xl font-bold"}>
                    {done ? "Share your" : "Create an"} Event
                </h1>
                <br/>
                {done ? (
                    <div className={"card text-center flex flex-col justify-center items-center"}>
                        <QRCode id={"QRCode"} value={link} level={"L"}/>
                        <p className={"my-2"}>
                            Scan the QR Code to share!
                        </p>
                        <button className={"button w-3/4"} onClick={() => {
                            setDone(false)
                        }}>
                            Edit
                        </button>
                        <br/>
                        <p className={"text-center my-2"}>
                            Or click{" "}
                            <a className={"font-bold text-[#0070f3]"} href={link}>
                                here
                            </a>
                            {" "}to add manually.
                        </p>
                    </div>
                ) : (
                    <form className={"card"} onSubmit={handleSubmit}>
                        <div className={"w-full flex flex-row flex-wrap items-center justify-between"}>
                            <div className={styles.dateTimeInput}>
                                <input type={"date"}
                                       name={"date"}
                                       id={"date"}
                                       value={date}
                                       min={dayjs().format("YYYY-MM-DD")}
                                       onKeyDown={(e) => {
                                           e.preventDefault();
                                           e.stopPropagation()
                                       }}
                                       onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                            <div className={styles.dateTimeInput}>
                                <input type={"time"}
                                       name={"time"}
                                       id={"time"}
                                       value={time}
                                       pattern={"[0-9]{2}:[0-9]{2}"}
                                    /*onKeyDown={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation()
                                    }}*/
                                       onChange={(e) => setTime(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={styles.duration}>
                            <div className={styles.durationInput}>
                                <select value={hours}
                                        name={"hours"}
                                        id={"hours"}
                                        onChange={(e) => {
                                            setHours((parseInt(e.target.value)).toString())
                                        }}
                                >
                                    {Array.from(Array(25), (_, i) => i).map((x) => {
                                        return (<option value={x} key={x}>{x}</option>);
                                    })}
                                </select>
                                <p className={"w-full"}>
                                    hours
                                </p>
                            </div>
                            <div className={styles.durationInput}>
                                <select value={minutes}
                                        name={"minutes"}
                                        id={"minutes"}
                                        onChange={(e) => {
                                            setMinutes(e.target.value)
                                        }}
                                >
                                    {Array.from(Array(12), (_, i) => (i) * 5).map((x) => {
                                        return (<option value={x} key={x}>{x}</option>);
                                    })}
                                </select>
                                <p className={"w-full"}>
                                    minutes
                                </p>
                            </div>
                            {/*TODO: improve styling.*/}
                            {/*<div className={styles.durationInput} style={{paddingLeft: "10px"}}>
                                <input type={"checkbox"} defaultChecked={false} checked={allDay}
                                       onChange={e => {setAllDay(e.target.checked)}}
                                />
                                <p style={{fontSize: "16px", width: "100%"}}>All day</p>
                            </div>*/}
                        </div>
                        <br/>
                        <label htmlFor={"service"}>
                            Service
                        </label>
                        <input type={"text"}
                               name={"service"}
                               id={"service"}
                               placeholder={"Haircut"}
                               value={service}
                               required={true}
                               onChange={e => setService(e.target.value)}
                        />
                        <label htmlFor={"operator"}>
                            Operator
                        </label>
                        <input type={"text"}
                               name={"operator"}
                               id={"operator"}
                               placeholder={"Alannah"}
                               value={operator}
                               required={true}
                               onChange={e => setOperator(e.target.value)}
                        />
                        {showLocation ? (
                            <>
                                <label htmlFor={"location"}>
                                    Location
                                </label>
                                <input type={"text"}
                                       name={"location"}
                                       id={"location"}
                                       placeholder={"Lana's Hair Salon"}
                                       value={location}
                                       required={false}
                                       onChange={e => setLocation(e.target.value)}
                                />
                            </>
                        ) : (
                            <div>
                                <br/>
                                <button className={"button w-full"} onClick={() => {
                                    setShowLocation(true)
                                }}>
                                    Add Location
                                </button>
                            </div>
                        )}
                        <br/>
                        <br/>
                        <button className={`button w-full ${isDisabled ? "cursor-not-allowed" : ""}`}
                                type={"submit"}
                                disabled={isDisabled}
                        >
                            Create
                        </button>
                        {errorMessage || isDisabled && (
                            <p className={"text-center mt-2"}>
                                Please fill out all fields!
                            </p>
                        )}
                    </form>
                )}
            </main>
            <Footer/>
        </div>
    );
}

export default Create;