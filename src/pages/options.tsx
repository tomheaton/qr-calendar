import {NextPage} from "next";
import {useEffect, useState} from "react";
import Head from "next/head";
import {useRouter} from "next/router";
import styles from "@styles/Create.module.css";
// @ts-ignore
import {OptionsData} from "@types/types";
import Footer from "@components/footer"; // TODO: fix this.

const Create: NextPage = () => {

    const router = useRouter();

    const [service, setService] = useState<string>("");
    const [operator, setOperator] = useState<string>("");
    const [location, setLocation] = useState<string>("");

    useEffect(() => {
        const _data = localStorage.getItem("data");
        if (_data) {
            const data: OptionsData = JSON.parse(_data);
            setService(data.service);
            setOperator(data.operator);
            setLocation(data.location);
        }
    }, []);

    const handleSave = () => {
        localStorage.setItem("data", JSON.stringify({ service, operator, location }));
    }

    return (
        <div className={"h-screen w-screen bg-white text-black dark:bg-[#212529] dark:text-[#e3e3e3] flex flex-col justify-between"}>
            <Head>
                <title>Options | QR Calendar</title>
                <meta name="description" content="Create calendar events and share them via QR Codes."/>
                <link rel="icon" href={"/favicon.ico"}/>
            </Head>
            <main className={"h-full w-full flex flex-col justify-center items-center"}>
                <h1 className={"text-6xl font-bold text-center"}>
                    Options 🛠️
                </h1>
                <br />
                {/*<div className={styles.card}>*/}
                <div className={"card w-5/6 md:w-1/4"}>
                    <label htmlFor={"service"}>
                        Service
                    </label>
                    <input type={"text"}
                           name={"service"}
                           id={"service"}
                           placeholder={"service"}
                           value={service}
                           required={true}
                           onChange={(e) => setService(e.target.value)}
                    />
                    <label htmlFor={"operator"}>
                        Operator
                    </label>
                    <input type={"text"}
                           name={"operator"}
                           id={"operator"}
                           placeholder={"operator"}
                           value={operator}
                           required={true}
                           onChange={(e) => setOperator(e.target.value)}
                    />
                    <label htmlFor={"location"}>
                        Location
                    </label>
                    <input type={"text"}
                           name={"location"}
                           id={"location"}
                           placeholder={"location"}
                           value={location}
                           required={false}
                           onChange={(e) => setLocation(e.target.value)}
                    />
                    <br />
                    <br />
                    <div className={"flex flex-col justify-between"}>
                        <button className={"button"} onClick={handleSave}>
                            Save
                        </button>
                        <br/>
                        <button className={"button"} onClick={() => {router.push("/")}}>
                            Return Home
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Create;