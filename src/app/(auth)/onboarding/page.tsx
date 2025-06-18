"use client"

import {useRouter} from "next/navigation";
import { useEffect, useState } from 'react';
import {DotLottieReact} from "@lottiefiles/dotlottie-react";

interface SyncUsersResponse {
    success: boolean;
    role?: string;
}

// Loading page for after sign-in/up
export default function OnboardingPage() {
    const router = useRouter()
    const [syncResult, setSyncResult] = useState<boolean>(false);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Checks whether User is in DB and syncs them
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

                const data: SyncUsersResponse = await response.json() as SyncUsersResponse;

                setSyncResult(data.success);
                setUserRole(data.role || 'patient');
                
                // Redirect based on role
                if (data.success) {
                    const role = data.role || 'patient';
                    if (role === 'admin') {
                        router.push('/admin');
                    } else {
                        router.push('/patient');
                    }
                }
            } catch (error) {
                console.error('Error syncing user:', error);
                // Default redirect to patient on error
                router.push('/patient');
            } finally {
                setLoading(false);
            }
        };

        void syncUser();
    }, [router]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            {loading ? (
                <div className="text-center">
                    <DotLottieReact
                        src="/loading.lottie"
                        loop
                        autoplay
                        className="w-64 h-64 mx-auto"
                    />
                    <div className="mt-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Setting up your account...</h2>
                        <p className="text-gray-600">Please wait while we configure your dashboard</p>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <div className="mb-4">
                        {syncResult ? (
                            <div className="text-green-600">
                                <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Account Setup Complete!</h2>
                                <p className="text-gray-600">Role: {userRole}</p>
                            </div>
                        ) : (
                            <div className="text-red-600">
                                <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Setup Failed</h2>
                                <p className="text-gray-600">Please try again or contact support</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}