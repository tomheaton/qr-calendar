import type {NextPage} from "next";
import {useRouter} from "next/router";
import styles from "../styles/Event.module.css";
import {CalendarEvent, google, ics, outlook, yahoo} from "calendar-link";
import Head from "next/head";

type Data = {
    dateTime: string,
    hours: string,
    minutes: string,
    service: string,
    operator: string,
    location?: string
}

const Event: NextPage = () => {

    const router = useRouter();

    const { dateTime, hours, minutes, service, operator, location } = router.query as Data;

    const hour: number = parseInt(hours)
    const minute: number = parseInt(minutes)
    const allDay: boolean = hour == -1 && minute == -1
    const duration: number = hour + (minute / 60)

    const event: CalendarEvent = {
        title: service,
        description: `Operator: ${operator}`,
        start: dateTime,
        ...(allDay && { allDay: true }),
        ...(!allDay && { duration: [duration, "hours"] }),
        ...(location && { location: location })
    };

    const returnHome = () => {
        router.push("/");
    }

    const head = (
        <Head>
            <title>Event | QR Calendar</title>
            <meta name="description" content="Create calendar events and share them via QR Codes."/>
            <link rel="icon" href="/favicon.ico"/>
        </Head>
    );

    if (!router.query) {
        return (
            <div className={"container"}>
                {head}
                <div className={"grid"}>
                    <div className={styles.cardQr}>
                        <p className={"description"}>loading...</p>
                    </div>
                </div>
            </div>
        );
    } else if (!dateTime || !hours || !minutes || !service || !operator) {
        return (
            <div className={"container"}>
                {head}
                <div className={"grid"}>
                    <div className={styles.cardQr}>
                        <p className={"description"}>Invalid URL Params 🛠️</p>
                        <button className={"button-9"} onClick={returnHome}>Return Home</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={"container"}>
            {head}
            <h1 className={"title"}>Your Event</h1>
            <br/>
            <div className={"grid"}>
                <div className={styles.card}>
                    <p>Time: {new Date(dateTime).toTimeString()}</p>
                    <p>Date: {new Date(dateTime).toDateString()}</p>
                    <p>
                        Duration: {allDay ? "All Day" : (
                        `${hours} hour${hour > 1 ? "s" : ""}${minute > 0 ? ` ${minutes} minutes` : ""}`)}
                    </p>
                    <p>Service: {service}</p>
                    <p>Operator: {operator}</p>
                    {
                        location && (
                            <p>Location: {location}</p>
                        )
                    }
                </div>
            </div>
            <br/>
            <div className={styles.calendarContainer}>
                <button className={styles.button} onClick={() => {router.push(google(event))}}>
                    <i className="bi bi-google" aria-label="Google Calendar"/>
                    <p>Google Calendar</p>
                </button>
                <button className={styles.button} onClick={() => {router.push(ics(event))}}>
                    <i className="bi bi-calendar-event-fill" aria-label="iCalendar"/>
                    <p>iCalendar</p>
                </button>
                <button className={styles.button} onClick={() => {router.push(outlook(event))}}>
                    <i className="bi bi-microsoft" aria-label="Outlook"/>
                    <p>Outlook</p>
                </button>
                <button className={styles.button} onClick={() => {router.push(yahoo(event))}}>
                    <i className="bi bi-calendar-event-fill" aria-label="Yahoo"/>
                    <p>Yahoo</p>
                </button>
                {/*<button className={styles.button} onClick={() => {router.push(office365(event))}}>
                    <i className="bi bi-windows" aria-label="Office 365"/>
                    <p>Office 365</p>
                </button>*/}
            </div>
        </div>
    );
}

export default Event;