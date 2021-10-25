import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-datetime/css/react-datetime.css';
import '../styles/globals.css';
import type {AppProps} from 'next/app';
import Layout from '../components/layout';

const MyApp = ({Component, pageProps}: AppProps) => {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
