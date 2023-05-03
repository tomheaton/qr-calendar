import Footer from "@/components/footer";
import { event } from "@/lib/gtag";
import styles from "@/styles/Create.module.css";
import { optionsDataSchema } from "@/utils/types";
import dayjs from "dayjs";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState, type SyntheticEvent } from "react";
import QRCode from "react-qr-code";

const Create: NextPage = () => {
  const [done, setDone] = useState<boolean>(false);
  const [link, setLink] = useState<string>("");
  const [showLocation, setShowLocation] = useState<boolean>(false);
  const [errorMessage] = useState<string | null>(null);
  // TODO: combine these into a dayjs time type and set date and time.
  const [date, setDate] = useState<string>(dayjs().format("YYYY-MM-DD"));
  const [time, setTime] = useState<string>(dayjs().format("HH:mm"));
  const [hours, setHours] = useState<string>("1");
  const [minutes, setMinutes] = useState<string>("0");
  // TODO: finish implementing allDay option.
  const [allDay] = useState<boolean>(false);
  const [service, setService] = useState<string>("");
  const [operator, setOperator] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  const isDisabled = !((parseInt(hours) > 0 || parseInt(minutes) > 0) && service && operator);

  useEffect(() => {
    // Get saved options
    (async () => {
      const rawData = localStorage.getItem("data");

      if (rawData) {
        const data = await JSON.parse(rawData);

        const options = optionsDataSchema.safeParse(data);

        if (!options.success) return;

        if (options.data.service) setService(options.data.service);
        if (options.data.operator) setOperator(options.data.operator);
        if (options.data.location) {
          setLocation(options.data.location);
          setShowLocation(true);
        }
      }
    })();
  }, []);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    event({
      action: "create_event",
      category: "engagement",
      label: "method",
      value: 1,
    });

    const dateTime = new Date(`${date}T${time}`).toISOString();

    const url = new URL(`${process.env.NEXT_PUBLIC_CALENDAR_URL}/event`);

    url.searchParams.append("dateTime", dateTime);
    url.searchParams.append("hours", allDay ? "-1" : hours);
    url.searchParams.append("minutes", allDay ? "-1" : minutes);
    url.searchParams.append("service", service);
    url.searchParams.append("operator", operator);

    if (showLocation && location.length > 0) {
      url.searchParams.append("location", location);
    }

    setLink(url.toString());
    setDone(true);
  };

  return (
    <div className="flex h-screen w-screen flex-col justify-between bg-white text-black dark:bg-[#212529] dark:text-white-ish">
      <Head>
        <title>Create | QR Calendar</title>
        <meta name="description" content="Create calendar events and share them via QR Codes." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex h-full w-full flex-col items-center justify-center">
        <h1 className="text-6xl font-bold tracking-tight">
          {done ? "Share your" : "Create An Event"}
        </h1>
        <br />
        {done ? (
          <div className="card flex flex-col items-center justify-center text-center">
            <QRCode id="QRCode" value={link} level="L" />
            <p className="my-2">Scan the QR Code to share!</p>
            <button className="button w-3/4" onClick={() => setDone(false)}>
              Edit
            </button>
            <br />
            <p className="my-2 text-center">
              Or click{" "}
              <a className="font-bold text-[#0070f3]" href={link}>
                here
              </a>{" "}
              to add manually.
            </p>
          </div>
        ) : (
          <form className="card" onSubmit={handleSubmit}>
            <div className="flex w-full flex-row flex-wrap items-center justify-between">
              <div className={styles.dateTimeInput}>
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={date}
                  min={dayjs().format("YYYY-MM-DD")}
                  onKeyDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className={styles.dateTimeInput}>
                <input
                  type="time"
                  name="time"
                  id="time"
                  value={time}
                  pattern="[0-9]{2}:[0-9]{2}"
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
                <select
                  value={hours}
                  name="hours"
                  id="hours"
                  onChange={(e) => setHours(parseInt(e.target.value).toString())}
                >
                  {Array.from(Array(25), (_, i) => i).map((x) => {
                    return (
                      <option value={x} key={x}>
                        {x}
                      </option>
                    );
                  })}
                </select>
                <p className="w-full">hours</p>
              </div>
              <div className={styles.durationInput}>
                <select
                  value={minutes}
                  name="minutes"
                  id="minutes"
                  onChange={(e) => setMinutes(e.target.value)}
                >
                  {Array.from(Array(12), (_, i) => i * 5).map((x) => {
                    return (
                      <option value={x} key={x}>
                        {x}
                      </option>
                    );
                  })}
                </select>
                <p className="w-full">minutes</p>
              </div>
              {/*TODO: improve styling.*/}
              {/*<div className={styles.durationInput} style={{paddingLeft: "10px"}>
                                <input type="checkbox" defaultChecked={false} checked={allDay}
                                       onChange={e => {setAllDay(e.target.checked)}}
                                />
                                <p style={{fontSize: "16px", width: "100%"}>All day</p>
                            </div>*/}
            </div>
            <br />
            <label htmlFor="service">Service</label>
            <input
              type="text"
              name="service"
              id="service"
              placeholder="Haircut"
              value={service}
              required={true}
              onChange={(e) => setService(e.target.value)}
            />
            <label htmlFor="operator">Operator</label>
            <input
              type="text"
              name="operator"
              id="operator"
              placeholder="Alannah"
              value={operator}
              required={true}
              onChange={(e) => setOperator(e.target.value)}
            />
            {showLocation ? (
              <>
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  placeholder="Lana's Hair Salon"
                  value={location}
                  required={false}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </>
            ) : (
              <div>
                <br />
                <button className="button w-full" onClick={() => setShowLocation(true)}>
                  Add Location
                </button>
              </div>
            )}
            <br />
            <br />
            <button
              className={`button w-full ${isDisabled ? "cursor-not-allowed" : ""}`}
              type="submit"
              disabled={isDisabled}
            >
              Create
            </button>
            {errorMessage ||
              (isDisabled && <p className="mt-2 text-center">Please fill out all fields!</p>)}
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Create;
