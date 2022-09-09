import Link from 'next/link';
import { useEffect, useState } from 'react';

import firebaseConfig from 'firebaseConfig';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import styles from '@components/Home/Home.module.css';

export default function Layout({ children, showActions = true }) {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const listener = onAuthStateChanged(getAuth(),  user => setUser(user));
        return () => listener();
    }, [user]);

    return <> 
        <div className={styles.header}>
            <div className={styles.branding}>
                <Link href="/">
                    <a className={styles['logo-link']}>
                        <img className={styles.logo} src="/logo.png" />
                    </a>
                </Link>

                <div className={styles['branding-text']}>
                    <h1 className={styles['branding-title']}>Warsanon</h1>
                    <p className={styles['branding-slogan']}>Medeival fantasy strategy web game</p>
                </div>
            </div>

            {/* { user ? user.uid : null } */}

            { showActions ?
                <div className={styles['header-actions']}>
                    { 
                        user ? 
                        <Link href="/worlds">
                            <a className={styles['header-actions-item']}>
                                Play
                            </a>
                        </Link>
                        :
                        <Link href="/login">
                            <a className={styles['header-actions-item']}>
                                Login
                            </a>
                        </Link>
                    }
                </div>
                :
                null
            }
        </div>

        { children }
    </>
};