import {NextPage} from "next";
import styles from "../styles/Create.module.css";
import {useState} from "react";
import QRCode from "react-qr-code";

const Create: NextPage = () => {

    const [done, setDone] = useState<boolean>(true);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Create</h1>

            <br/>

            {done && (
                <>
                    <QRCode id={"QRCode"} value={`https://qrcalendar.${process.env.MAIN_URL}/event`}/>
                    <p>please scan the QR Code</p>
                </>
            )}
        </div>
    );
}

export default Create;