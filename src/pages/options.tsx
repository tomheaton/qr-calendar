import Footer from "@/components/footer";
import { event } from "@/lib/gtag";
import { optionsDataSchema, type OptionsData } from "@/utils/types";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState, type SyntheticEvent } from "react";

const Create: NextPage = () => {
  const [options, setOptions] = useState<OptionsData>({
    service: "",
    operator: "",
    location: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);

  useEffect(() => {
    // Get saved options
    (async () => {
      const rawData = localStorage.getItem("data");

      if (rawData) {
        const data = await JSON.parse(rawData);

        const savedOptions = optionsDataSchema.safeParse(data);

        if (!savedOptions.success) return;

        setOptions(savedOptions.data);
      }
    })();
  }, []);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (isLoading) return;

    event({
      action: "save_options",
      category: "engagement",
      label: "method",
      value: 1,
    });

    setIsLoading(true);
    setShowMessage(false);

    localStorage.setItem("data", JSON.stringify(options));

    setIsLoading(false);
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
    }, 4000);
  };

  return (
    <>
      <Head>
        <title>Options | QR Calendar</title>
        <meta name="description" content="Create calendar events and share them via QR Codes." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen w-screen flex-col justify-between bg-white text-black dark:bg-[#212529] dark:text-white-ish">
        <main className="flex h-full w-full flex-col items-center justify-center">
          <h1 className="text-6xl font-bold tracking-tight">Options 🛠️</h1>
          <br />
          <p>Set default values for this site.</p>
          <form className="card" onSubmit={handleSubmit} autoComplete="off">
            <label htmlFor="service">Service</label>
            <input
              type="text"
              name="service"
              id="service"
              placeholder="Haircut"
              value={options.service}
              onChange={(e) => setOptions({ ...options, service: e.target.value })}
            />
            <label htmlFor="operator">Operator</label>
            <input
              type="text"
              name="operator"
              id="operator"
              placeholder="Alannah"
              value={options.operator}
              onChange={(e) => setOptions({ ...options, operator: e.target.value })}
            />
            <label htmlFor="location">Location</label>
            <input
              type="text"
              name="location"
              id="location"
              placeholder="Lana's Hair Salon"
              value={options.location}
              onChange={(e) => setOptions({ ...options, location: e.target.value })}
            />
            <br />
            <br />
            <div className="flex flex-col justify-between">
              <button className="button" type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Save"}
              </button>
              {showMessage && <p className="mt-2 text-center">Saved to local storage.</p>}
              <br />
              <Link href="/" className="button">
                Back
              </Link>
            </div>
          </form>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Create;
