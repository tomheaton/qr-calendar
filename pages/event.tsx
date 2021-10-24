import {NextPage} from "next";
import {useRouter} from "next/router";
import styles from "../styles/Event.module.css";
import {google, outlook, office365, yahoo, ics} from "calendar-link";

const Event: NextPage = () => {

    const router = useRouter();
    const {time, date, service, operator} = router.query;

    const saveToCalendar = () => {
        console.log("save to calendar")
    }

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

            <div>
                <p>Time: {time}</p>
                <p>Date: {date}</p>
                <p>Service: {service}</p>
                <p>Operator: {operator}</p>
            </div>

            <button onClick={saveToCalendar}>Save to Calendar</button>

        </div>
    );
}

export default Event;