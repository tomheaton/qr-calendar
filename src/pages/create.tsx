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
  const [link, setLink] = useState<string>("");
  const [isDone, setIsDone] = useState<boolean>(false);
  const [showLocation, setShowLocation] = useState<boolean>(false);

  // TODO: combine these into a dayjs time type and set date and time.
  const [date, setDate] = useState<string>(dayjs().format("YYYY-MM-DD"));
  const [time, setTime] = useState<string>(dayjs().format("HH:mm"));
  const [hours, setHours] = useState<string>("1");
  const [minutes, setMinutes] = useState<string>("0");

  // TODO: finish implementing allDay option.
  const [allDay] = useState<boolean>(false);

  const [options, setOptions] = useState<{ service: string; operator: string; location?: string }>({
    service: "",
    operator: "",
    location: "",
  });

  const isDisabled = !(
    (parseInt(hours) > 0 || parseInt(minutes) > 0) &&
    options.service &&
    options.operator
  );

  useEffect(() => {
    // Get saved options
    (async () => {
      const rawData = localStorage.getItem("data");

      if (rawData) {
        const data = await JSON.parse(rawData);

        const savedOptions = optionsDataSchema.safeParse(data);

        if (!savedOptions.success) return;

        setOptions({ ...options, ...savedOptions.data });

        if (savedOptions.data.location) setShowLocation(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    url.searchParams.append("service", options.service);
    url.searchParams.append("operator", options.operator);

    if (showLocation && options.location && options.location.length > 0) {
      url.searchParams.append("location", options.location);
    }

    setLink(url.toString());
    setIsDone(true);
  };

  return (
    <>
      <Head>
        <title>Create | QR Calendar</title>
        <meta name="description" content="Create calendar events and share them via QR Codes." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen w-screen flex-col justify-between bg-white text-black dark:bg-[#212529] dark:text-white-ish">
        <main className="flex h-full w-full flex-col items-center justify-center">
          <h1 className="text-6xl font-bold tracking-tight">
            {isDone ? "Share Your" : "Create An"} Event
          </h1>
          <br />
          {isDone ? (
            <div className="card flex flex-col items-center justify-center text-center">
              <QRCode id="QRCode" value={link} level="L" className="m-2" />
              <p className="my-2">Scan the QR Code to share!</p>
              <button className="button w-3/4" onClick={() => setIsDone(false)}>
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
                {/* <div className={styles.durationInput} style={{ paddingLeft: "10px" }}>
                  <input
                    type="checkbox"
                    defaultChecked={false}
                    checked={allDay}
                    onChange={(e) => setAllDay(e.target.checked)}
                  />
                  <p style={{ fontSize: "16px", width: "100%" }}>All day</p>
                </div> */}
              </div>
              <br />
              <label htmlFor="service">Service</label>
              <input
                type="text"
                name="service"
                id="service"
                placeholder="Haircut"
                required
                value={options.service}
                onChange={(e) => setOptions({ ...options, service: e.target.value })}
              />
              <label htmlFor="operator">Operator</label>
              <input
                type="text"
                name="operator"
                id="operator"
                placeholder="Lana"
                required
                value={options.operator}
                onChange={(e) => setOptions({ ...options, operator: e.target.value })}
              />
              {showLocation ? (
                <>
                  <label htmlFor="location">Location</label>
                  <div className="flex gap-x-2">
                    <input
                      type="text"
                      name="location"
                      id="location"
                      placeholder="Lana's Hair Salon"
                      value={options.location}
                      onChange={(e) => setOptions({ ...options, location: e.target.value })}
                    />
                    {/* TODO: fix size */}
                    <button className="button px-2 py-1" onClick={() => setShowLocation(false)}>
                      <i className="bi bi-x" />
                    </button>
                  </div>
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
                className={`button w-full ${
                  isDisabled ? "cursor-not-allowed opacity-80 hover:scale-100" : ""
                }`}
                type="submit"
                disabled={isDisabled}
              >
                Create
              </button>
            </form>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Create;
