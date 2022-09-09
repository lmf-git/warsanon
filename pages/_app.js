import { initializeApp } from 'firebase/app';
import firebaseConfig from 'firebaseConfig';

import '../public/global.css';

initializeApp(firebaseConfig);

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
};