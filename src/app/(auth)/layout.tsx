import { ClerkProvider } from "@clerk/nextjs";
import type { ReactNode } from "react";


export default function SignUpLayout({ children }: { children: ReactNode }) {
  // This layout overrides the global layout and removes navbar/footer
  return (
    <ClerkProvider signInUrl="/sign-in" signUpUrl="/sign-up">
          {children}
    </ClerkProvider>
  );
}