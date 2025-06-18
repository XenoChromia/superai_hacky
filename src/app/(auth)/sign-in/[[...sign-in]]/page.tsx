import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div className="grid min-h-screen grid-cols-[60%_40%]">
            {/* Left: Colored Background (60% width) */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-400 to-white"></div>

            {/* Right: Centered Sign-in Panel (40% width) */}
            <div className="flex items-center justify-center">
                <div className="w-full max-w-md">
                    <SignIn
                        path="/sign-in"
                        routing="path"
                        signUpUrl="/sign-up"
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