import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Genki-San",
  description: "A health app assisted by AI and medical professionals",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}