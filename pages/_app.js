// import App from 'next/app'
import '../style/global.css';

// Include map temporarily for lazy dev.
import '../style/map.css';

export default function Application({ Component, pageProps }) {
    return <Component {...pageProps} />
}