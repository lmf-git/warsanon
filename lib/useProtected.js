import Context from "@components/Context";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

export default function useProtected() {
    const router = useRouter();

    // If they aren't logged in after 1 second then assume they're logged out.
    useEffect(() => {
        const timeout = setTimeout(() => {
            const user = getAuth().currentUser;
            if (!user) router.push('/login');
            else if (!user.displayName || !user.email) 
                router.push('/profile/complete');
        }, 1000);

        return function cleanup() {
            clearTimeout(timeout);
        }
    }, []);
};