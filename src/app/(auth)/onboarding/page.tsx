"use client"

import {useRouter} from "next/navigation";
import { useEffect, useState } from 'react';
import {DotLottieReact} from "@lottiefiles/dotlottie-react";

interface syncUsers {
    success: boolean;
}

// Loading page for after sign-in/up
export default function OnboardingPage() {
    const router = useRouter()
    const [syncResult, setSyncResult] = useState<boolean>(false); // State to store the API result
    const [loading, setLoading] = useState(true); // State to handle loading state

    // Checks whether User is in DB and syncs themb
    useEffect(() => {
        const syncUser = async () => {
            try {
                const response = await fetch('/api/auth/sync-users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to sync user');
                }

                const data: syncUsers = await response.json() as syncUsers;

                setSyncResult(data.success);
                setLoading(false);
            } catch (error) {
                console.error('Error syncing user:', error);
            } finally {
                setLoading(false);
                router.push('/patient');
            }
        };

        void syncUser();
    }, []);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            {loading ? (
                <DotLottieReact
                    src="/loading.lottie"
                    loop
                    autoplay
                    className="w-1/2"
                />
            ) : (
                <p>Sync result: {syncResult ? 'Success' : 'Failed'}</p>
            )}
        </div>
    );
}