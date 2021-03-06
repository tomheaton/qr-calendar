import {NextPage} from "next";
import {useRouter} from "next/router";
import {CalendarEvent, google, ics, outlook, yahoo} from "calendar-link";
import Head from "next/head";
import {EventData} from "@utils/types";
import dayjs from "dayjs";
import Footer from "@components/footer";
import Link from "next/link";
import React from "react";

const Event: NextPage = () => {

    const router = useRouter();

    const { dateTime, hours, minutes, service, operator, location } = router.query as EventData;

    const hour: number = parseInt(hours);
    const minute: number = parseInt(minutes);
    const allDay: boolean = hour == -1 && minute == -1;
    const duration: number = hour + (minute / 60);

    const event: CalendarEvent = {
        title: service,
        description: `Operator: ${operator}`,
        start: dateTime,
        ...(allDay && { allDay: true }),
        ...(!allDay && { duration: [duration, "hours"] }),
        ...(location && { location: location })
    };

    const handleSaveToCalendar = (calendarType: "google" | "ics" | "outlook" | "yahoo"): void => {
        // TODO: register calendar type event and push new route.
    }

    if (!router.query) {
        return (
            <div className={"h-screen bg-white text-black dark:bg-[#212529] dark:text-[#e3e3e3] flex flex-col justify-between"}>
                <EventHead />
                <main className={"h-full flex flex-col justify-center items-center"}>
                    <h1 className={"text-6xl font-bold"}>
                        loading...
                    </h1>
                </main>
            </div>
        );
    }

    if (!dateTime || !hours || !minutes || !service || !operator) {
        return (
            <div
                className={"h-screen bg-white text-black dark:bg-[#212529] dark:text-[#e3e3e3] flex flex-col justify-between"}>
                <EventHead/>
                <main className={"h-full flex flex-col justify-center items-center"}>
                    <h1 className={"text-6xl font-bold"}>
                        Invalid URL Params ?????????
                    </h1>
                    <br/>
                    <Link href={"/"}>
                        <button className={"button"}>
                            Return Home
                        </button>
                    </Link>
                </main>
            </div>
        );
    }

    return (
        <div className={"h-screen bg-white text-black dark:bg-[#212529] dark:text-[#e3e3e3] flex flex-col justify-between"}>
            <EventHead />
            <main className={"h-full flex flex-col justify-center items-center"}>
                <h1 className={"text-6xl font-bold"}>
                    Your Event ????
                </h1>
                <div className={"card"}>
                    <p>Time: {dayjs(dateTime).format("h:mm A UTC")}</p>
                    <p>Date: {dayjs(dateTime).format("dddd, D MMMM YYYY")}</p>
                    <p>
                        Duration: {allDay ? "All Day" : (
                        `${hours} hour${hour > 1 ? "s" : ""}${minute > 0 ? `, ${minutes} minutes` : ""}`)}
                    </p>
                    <br />
                    <p>Service: {service}</p>
                    <p>Operator: {operator}</p>
                    {location && (<p>Location: {location}</p>)}
                </div>
                <br/>
                <div className={"flex flex-col"}>
                    <button className={"button my-2"} onClick={() => {router.push(google(event))}}>
                        <i className="bi bi-google" aria-label="Google Calendar" />
                        <p>Google Calendar</p>
                    </button>
                    <button className={"button my-2"} onClick={() => {router.push(ics(event))}}>
                        <i className="bi bi-calendar-event-fill" aria-label="iCalendar" />
                        <p>iCalendar</p>
                    </button>
                    <button className={"button my-2"} onClick={() => {router.push(outlook(event))}}>
                        <i className="bi bi-microsoft" aria-label="Outlook" />
                        <p>Outlook</p>
                    </button>
                    <button className={"button my-2"} onClick={() => {router.push(yahoo(event))}}>
                        <i className="bi bi-calendar-event-fill" aria-label="Yahoo" />
                        <p>Yahoo</p>
                    </button>
                    {/*<button className={"button my-2"} onClick={() => {router.push(office365(event))}}>
                        <i className="bi bi-windows" aria-label="Office 365" />
                        <p>Office 365</p>
                    </button>*/}
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Event;

const EventHead: React.FC = () => {
    return (
        <Head>
            <title>Event | QR Calendar</title>
            <meta name={"description"} content={"Create calendar events and share them via QR Codes."} />
            <link rel={"icon"} href={"/favicon.ico"} />
        </Head>
    );
}
