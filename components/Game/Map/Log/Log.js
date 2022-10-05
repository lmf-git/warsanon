import styles from '@components/Game/Map/Log/Log.module.css';
import { useEffect, useState } from 'react';

// Interactive log messsages that link events to coordinates, useful navigation.
export default function Log() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setInterval(() => {
            if (messages.length < 3)
                setMessages([...messages, { text: 'Test log message, should link' }]);
        }, 1500);
    });
    
    return <div className={styles.log}>
        { messages.map((m, mI) => 
            <p key={`log-${mI}`}>
                { m.text }
            </p>
        )}
    </div>
}