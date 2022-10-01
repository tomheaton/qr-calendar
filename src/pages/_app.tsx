import 'bootstrap-icons/font/bootstrap-icons.css';
import '@styles/globals.css';
import type {AppType} from 'next/app';
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {pageView} from "@lib/gtag";

const App: AppType = ({Component, pageProps}) => {
    const router = useRouter()

    // @ts-ignore
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const handleStart = () => {
            setLoading(true);
        };
        const handleComplete = () => {
            setLoading(false);
        };

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);

        const handleRouteChange = (url: URL) => {
            /*window.gtag('config', `${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY}`, {
                page_path: url
            });*/
            pageView(url);
        }

        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        }
    }, [router.events]);

    return (
        loading ? (
            <>
                <h1>QR Calendar</h1>
                <p>loading...</p>
            </>
        ) : (
            <Component {...pageProps} />
        )
    );
}

export default App;
