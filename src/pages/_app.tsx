import 'bootstrap-icons/font/bootstrap-icons.css';
import '@styles/globals.css';
import {AppProps} from 'next/app';
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

const App = ({ Component, pageProps }: AppProps) => {

    const router = useRouter()

    // @ts-ignore
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const handleStart = () => { setLoading(true); };
        const handleComplete = () => { setLoading(false); };

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);

        const handleRouteChange = (url: URL) => {
            // @ts-ignore
            window.gtag('config', `${process.env.GOOGLE_ANALYTICS_KEY}`, {
                page_path: url
            });
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
