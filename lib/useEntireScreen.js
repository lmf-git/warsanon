import { useEffect } from "react";
import styles from '@components/Map/Map.module.css';

export default function useEntireScreen() {
    // Make the page a full height/width viewport for easier sizing/positioning.
    useEffect(() => {
        // Add map window class from the html element
        document.documentElement.classList.add(styles['map-window']);

        // Add map-fullheight class to html and body
        [document.body, document.documentElement, document.querySelector('#__next')]
            .map(el => el.classList.add(styles['map-fullheight']));

        return function cleanup() {
            // Remove map window class from the html element
            document.documentElement.classList.remove(styles['map-window']);

            // Remove map-fullheight class to html and body
            [document.body, document.documentElement, document.querySelector('#__next')]
                .map(el => el.classList.remove(styles['map-fullheight']));
        }
    }, []);
};