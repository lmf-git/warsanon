import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import styles from '@components/Home/Home.module.css';

export default function useProtected(redirect) {
    // const [user, setUser] = useState(null);

    useEffect(() => {
        const listener = onAuthStateChanged(getAuth(),  user => setUser(user));
        return () => listener();
    }, [user]);
};