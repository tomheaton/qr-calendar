import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>QR Calendar</title>
        <meta name="description" content="Create calendar events and share them via QR Codes." />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="flex h-full flex-col items-center justify-center">
        <h1 className="text-6xl font-bold">QR Calendar</h1>
        <br />
        <p className="text-center text-2xl">Create calendar events and share them via QR Codes.</p>
        <br />
        <Link href="/create">
          <button className="button shadow-xl">Create An Event</button>
        </Link>
      </main>
    </>
  );
};

export default Index;
