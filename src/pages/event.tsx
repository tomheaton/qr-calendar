import {NextPage} from "next";
import {useRouter} from "next/router";
import styles from "../styles/Event.module.css";
import {CalendarEvent, google, ics, outlook} from "calendar-link";

const Event: NextPage = () => {

    const router = useRouter();
    const {dateTime, hours, minutes, service, operator} = router.query as { dateTime: string, hours: string, minutes: string, service: string, operator: string };

    let duration: number = parseInt(hours) + (parseInt(minutes)/60);

    const event: CalendarEvent = {
        title: service,
        description: `Operator: ${operator}`,
        start: dateTime,
        duration: [duration, "hours"],
        location: `${process.env.NEXT_PUBLIC_CALENDAR_LOCATION}`
    };

    const returnHome = () => {
        router.push("/");
    }

    if (!router.query) {
        return (
            <div className={"container"}>
                <div className={"grid"}>
                    <div className={styles.cardQr}>
                        <p className={"description"}>loading</p>
                    </div>
                </div>
            </div>
        );
    } else if (!dateTime || !hours || !minutes || !service || !operator) {
        return (
            <div className={"container"}>
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
            <h1 className={"title"}>Your Event</h1>
            <br/>
            <div className={"grid"}>
                <div className={styles.card}>
                    <p>Time: {new Date(dateTime).toTimeString()}</p>
                    <p>Date: {new Date(dateTime).toDateString()}</p>
                    <p>
                        Duration: {hours} hour{parseInt(hours) > 1 ? "s" : ""}
                        {parseInt(minutes) > 0 ? ` ${minutes} minutes` : ""}
                    </p>
                    <p>Service: {service}</p>
                    <p>Operator: {operator}</p>
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
                {/*<button className={styles.button} onClick={() => {router.push(office365(event))}}>
                    <i className="bi bi-windows" aria-label="Office 365"/>
                    <p>Office 365</p>
                </button>*/}
            </div>
        </div>
    );
}

export default Event;