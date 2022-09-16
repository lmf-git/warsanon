import Link from 'next/link';

import styles from '@components/Home/Home.module.css';

export default function Layout({ children, showActions = true, auth }) {

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

            {/* { auth ? auth.uid : null } */}

            { showActions ?
                <div className={styles['header-actions']}>
                    { 
                        auth ? 
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