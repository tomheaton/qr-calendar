import {NextPage} from "next";
import {useRouter} from "next/router";
import styles from "../styles/Event.module.css";
import {google, ics, outlook, office365, yahoo, CalendarEvent} from "calendar-link";

const Event: NextPage = () => {

    const router = useRouter();
    const {time, date, service, operator} = router.query as {time: string, date: string, service: string, operator: string};

    const event: CalendarEvent = {
        title: service,
        description: operator,
        start: "2019-12-29 18:00:00 +0100",
        duration: [3.5, "hours"],
    };

    const returnHome = () => {
        router.push("/");
    }

    if (!router.query) {
        return (
            <div className={styles.container}>
                <p>loading</p>
            </div>
        );
    } else if (!time || !date || !service || !operator) {
        return (
            <div className={styles.container}>
                <p>invalid url params</p>
                <button onClick={returnHome}>Return Home</button>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Event</h1>


            <div className={styles.grid}>
                <div className={styles.card}>
                    <p>Time: {time}</p>
                    <p>Date: {date}</p>
                    <p>Service: {service}</p>
                    <p>Operator: {operator}</p>
                </div>
            </div>

            <div className={styles.calendarContainer}>
                <button className={styles.button} onClick={() => {router.push(google(event))}}>
                    <i className="bi bi-google" aria-label="Google Calendar"/>
                    <p>Google Calendar</p>
                </button>
                <button className={styles.button} onClick={() => {router.push(ics(event))}}>
                    <i className="bi bi-calendar-event" aria-label="iCalendar"/>
                    <p>iCalendar</p>
                </button>
                <button className={styles.button} onClick={() => {router.push(outlook(event))}}>
                    <i className="bi bi-microsoft" aria-label="Outlook"/>
                    <p>Outlook</p>
                </button>
                <button className={styles.button} onClick={() => {router.push(office365(event))}}>
                    <i className="bi bi-windows" aria-label="Office 365"/>
                    <p>Office 365</p>
                </button>
            </div>

        </div>
    );
}

export default Event;