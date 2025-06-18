import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <div className="grid min-h-screen grid-cols-[60%_40%]">
            {/* Left: Gradient Background (60% width) */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-400 to-white"></div>

            {/* Right: Centered Sign-up Panel (40% width) */}
            <div className="flex items-center justify-center">
                <div className="w-full max-w-md">
                    <SignUp
                        path="/sign-up"
                        routing="path"
                        signInUrl="/sign-in"
                        forceRedirectUrl="/onboarding"
                        appearance={{
                            elements: {
                                rootBox: "w-full",
                                card: "shadow-lg rounded-lg p-6",
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
}