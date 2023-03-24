import Footer from "@/components/footer";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Index: NextPage = () => {
  return (
    <div
      className={
        "flex h-screen flex-col justify-between bg-white text-black dark:bg-[#212529] dark:text-[#e3e3e3]"
      }
    >
      <Head>
        <title>QR Calendar</title>
        <meta
          name={"description"}
          content={"Create calendar events and share them via QR Codes."}
        />
        <link rel={"icon"} href={"/favicon.ico"} />
        <meta name={"viewport"} content={"width=device-width, initial-scale=1"} />
      </Head>

      <main className={"flex h-full flex-col items-center justify-center"}>
        <h1 className={"text-center text-6xl font-bold"}>QR Calendar</h1>
        <br />
        <p className={"text-center text-2xl"}>
          To begin, click the <code className={"text-2xl font-bold"}>Create</code> button below!
        </p>
        <br />
        <Link href={"/create"}>
          <button className={"button"}>Create</button>
        </Link>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
