import Context from "@components/Context";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

export default function useProtected() {
    const context = useContext(Context);
    const router = useRouter();

    useEffect(() => {
        console.log(context);

        // If they aren't logged in after 1 second then assume they're logged out.
        setTimeout(() => {
            console.log('Redirect?');

            // If not authenticated, redirect to login page.
            if (!context.auth)
                router.push('/login');

            // If authenticated but incomplete profile, redirect there.
            // if (!context.auth && )
                // router.push('/login');

            console.log(getAuth().currentUser);

            
        }, 1000);
    }, []);

    return "test";
};