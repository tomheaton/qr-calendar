// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, {Head, Html, Main, NextScript} from 'next/document';

class MyDocument extends Document {

    /*    static async getInitialProps(ctx: DocumentContext) {
            return await Document.getInitialProps(ctx)
        }*/

    render() {
        return (
            <Html lang={"en"}>
                <Head>
                    <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY}`} />
                    <script dangerouslySetInnerHTML={{ __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){ dataLayer.push(arguments); }
                        gtag('js', new Date());
                        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY}', { page_path: window.location.pathname });`,
                    }} />

                    <link rel="icon" href="/favicon.ico"/>
                    <link rel="canonical" href="https://qr-calender.vercel.app"/>
                    <link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
                    <link rel="manifest" href="/manifest.json"/>

                    <meta charSet="utf-8" />
                    {/*<meta name="viewport" content="width=device-width, initial-scale=1"/>*/}
                    <meta name="color-scheme" content="light dark"/>
                    <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff"/>
                    <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#212529"/>
                    <meta name="author" content="Tom Heaton"/>
                    <meta name="description" content="QR Calendar - Create and Share events to calendars using QR codes"/>
                    <meta name="keywords" content="Software, Developer, Code, Programming"/>

                    {/*<title>QR Calendar</title>*/}
                </Head>
                <body>
                <script dangerouslySetInnerHTML={{ __html: `document.body.dataset.theme = window.localStorage.getItem('theme') || "light"`}} />
                <Main/>
                <NextScript/>
                </body>
            </Html>
        );
    }
}

export default MyDocument;