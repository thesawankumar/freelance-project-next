// This is a global CSS file and should override anything in the CSS modules or inline

import '../styles/global.css';

export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />;
}