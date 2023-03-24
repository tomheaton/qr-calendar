import { NextPage } from "next";
import { SyntheticEvent, useEffect, useState } from "react";
import Head from "next/head";
import { OptionsData } from "@utils/types";
import Footer from "@components/footer";
import { event } from "@lib/gtag";
import Link from "next/link";

const Create: NextPage = () => {
  const [service, setService] = useState<string>("");
  const [operator, setOperator] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);

  useEffect(() => {
    const getSavedOptions = async () => {
      const rawData = await localStorage.getItem("data");
      if (rawData) {
        const data: OptionsData = await JSON.parse(rawData);
        setService(data.service);
        setOperator(data.operator);
        setLocation(data.location);
      }
    };

    getSavedOptions();
  }, []);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (isLoading) {
      return;
    }

    event({
      action: "save_options",
      category: "engagement",
      label: "method",
      value: 1,
    });

    setIsLoading(true);
    setShowMessage(false);

    await localStorage.setItem("data", JSON.stringify({ service, operator, location }));

    setIsLoading(false);
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
    }, 4000);
  };

  return (
    <div
      className={
        "flex h-screen w-screen flex-col justify-between bg-white text-black dark:bg-[#212529] dark:text-[#e3e3e3]"
      }
    >
      <Head>
        <title>Options | QR Calendar</title>
        <meta
          name={"description"}
          content={"Create calendar events and share them via QR Codes."}
        />
        <link rel={"icon"} href={"/favicon.ico"} />
      </Head>

      <main className={"flex h-full w-full flex-col items-center justify-center"}>
        <h1 className={"text-center text-6xl font-bold"}>Options 🛠️</h1>
        <br />
        <p>Set default values for this site.</p>
        <form className={"card"} onSubmit={handleSubmit} autoComplete={"off"}>
          <label htmlFor={"service"}>Service</label>
          <input
            type={"text"}
            name={"service"}
            id={"service"}
            placeholder={"Haircut"}
            value={service}
            required={false}
            onChange={(e) => setService(e.target.value)}
          />
          <label htmlFor={"operator"}>Operator</label>
          <input
            type={"text"}
            name={"operator"}
            id={"operator"}
            placeholder={"Alannah"}
            value={operator}
            required={false}
            onChange={(e) => setOperator(e.target.value)}
          />
          <label htmlFor={"location"}>Location</label>
          <input
            type={"text"}
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
            {showMessage && <p className={"mt-2 text-center"}>Saved to local storage.</p>}
            <br />
            <Link href={"/"}>
              <button className={"button"}>Return Home</button>
            </Link>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default Create;
