import { useRouter } from "next/router";
import { useEffect } from "react";

export default function useSpawned() {
    const router = useRouter();

    // If they aren't logged in after 1 second then assume they're logged out.
    useEffect(() => {
        setTimeout(() => {
            const spawned = false;
            if (!spawned) router.push('/map');
        }, 1000);
    }, []);
};