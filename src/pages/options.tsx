import {NextPage} from "next";
import {SyntheticEvent, useEffect, useState} from "react";
import Head from "next/head";
import {useRouter} from "next/router";
// @ts-ignore
import {OptionsData} from "@types/types";
import Footer from "@components/footer"; // TODO: fix this.

const Create: NextPage = () => {

    const router = useRouter();

    const [service, setService] = useState<string>("");
    const [operator, setOperator] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showMessage, setShowMessage] = useState<boolean>(false);

    useEffect(() => {
        const _data = localStorage.getItem("data");
        if (_data) {
            const data: OptionsData = JSON.parse(_data);
            setService(data.service);
            setOperator(data.operator);
            setLocation(data.location);
        }
    }, []);

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        if (isLoading) {
            return;
        }

        setIsLoading(true);
        setShowMessage(false)
        await localStorage.setItem("data", JSON.stringify({ service, operator, location }));
        setIsLoading(false);
        setShowMessage(true)
    }

    return (
        <div className={"h-screen w-screen bg-white text-black dark:bg-[#212529] dark:text-[#e3e3e3] flex flex-col justify-between"}>
            <Head>
                <title>Options | QR Calendar</title>
                <meta name={"description"} content={"Create calendar events and share them via QR Codes."}/>
                <link rel={"icon"} href={"/favicon.ico"}/>
            </Head>
            <main className={"h-full w-full flex flex-col justify-center items-center"}>
                <h1 className={"text-6xl font-bold text-center"}>
                    Options 🛠️
                </h1>
                <br />
                <p>Set default values for this site.</p>
                <form className={"card"} onSubmit={handleSubmit} autoComplete={"off"}>
                    <label htmlFor={"service"}>
                        Service
                    </label>
                    <input type={"text"}
                           name={"service"}
                           id={"service"}
                           placeholder={"Haircut"}
                           value={service}
                           required={false}
                           onChange={(e) => setService(e.target.value)}
                    />
                    <label htmlFor={"operator"}>
                        Operator
                    </label>
                    <input type={"text"}
                           name={"operator"}
                           id={"operator"}
                           placeholder={"Alannah"}
                           value={operator}
                           required={false}
                           onChange={(e) => setOperator(e.target.value)}
                    />
                    <label htmlFor={"location"}>
                        Location
                    </label>
                    <input type={"text"}
                           name={"location"}
                           id={"location"}
                           placeholder={"Lana's Hair Salon"}
                           value={location}
                           required={false}
                           onChange={(e) => setLocation(e.target.value)}
                    />
                    <br />
                    <br />
                    <div className={"flex flex-col justify-between"}>
                        <button className={"button"} type={"submit"} disabled={isLoading}>
                            {isLoading ? "loading..." : "Save"}
                        </button>
                        {showMessage && (
                            <p className={"text-center mt-2"}>
                                Saved to local storage.
                            </p>
                        )}
                        <br/>
                        <button className={"button"} onClick={() => {router.push("/")}}>
                            Return Home
                        </button>
                    </div>
                </form>
            </main>
            <Footer />
        </div>
    );
}

export default Create;