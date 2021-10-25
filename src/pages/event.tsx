import {NextPage} from "next";
import {useRouter} from "next/router";
import styles from "../styles/Event.module.css";
import {google, ics, outlook, CalendarEvent} from "calendar-link";

const Event: NextPage = () => {

    const router = useRouter();
    const {
        dateTime,
        duration,
        service,
        operator
    } = router.query as { dateTime: string, duration: string, service: string, operator: string };

    const event: CalendarEvent = {
        title: service,
        description: `Operator: ${operator}`,
        start: dateTime,
        duration: [parseFloat(duration), "hours"],
        location: `${process.env.NEXT_PUBLIC_CALENDAR_LOCATION}`
    };

    const returnHome = () => {
        router.push("/");
    }

    if (!router.query) {
        return (
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.cardQr}>
                        <p className={styles.description}>loading</p>
                    </div>
                </div>
            </div>
        );
    } else if (!dateTime || !duration || !service || !operator) {
        return (
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.cardQr}>
                        <p className={styles.description}>invalid url params</p>
                        <button className={styles.button} onClick={returnHome}>Return Home</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Event</h1>
            <br/>
            <div className={styles.grid}>
                <div className={styles.card}>
                    <p>Time: {new Date(dateTime).toTimeString()}</p>
                    <p>Date: {new Date(dateTime).toDateString()}</p>
                    {/*TODO: fancy duration display.*/}
                    <p>Duration: {duration} hour(s)</p>
                    <p>Service: {service}</p>
                    <p>Operator: {operator}</p>
                </div>
            </div>
            <br/>
            <div className={styles.calendarContainer}>
                <button className={styles.button} onClick={() => {
                    router.push(google(event))
                }}>
                    <i className="bi bi-google" aria-label="Google Calendar"/>
                    <p>Google Calendar</p>
                </button>
                <button className={styles.button} onClick={() => {
                    router.push(ics(event))
                }}>
                    <i className="bi bi-calendar-event" aria-label="iCalendar"/>
                    <p>iCalendar</p>
                </button>
                <button className={styles.button} onClick={() => {
                    router.push(outlook(event))
                }}>
                    <i className="bi bi-microsoft" aria-label="Outlook"/>
                    <p>Outlook</p>
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