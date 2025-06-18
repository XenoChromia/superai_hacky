'use client'

import { Activity, Bell, Settings } from 'lucide-react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

export default function NavBar() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Left side - Logo & Title */}
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 p-2 rounded-lg">
              <Activity className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">MedPro Dashboard</h1>
              <p className="text-blue-100">Medical Practitioner Management System</p>
            </div>
          </div>

          {/* Right side - User controls */}
          <div className="flex items-center space-x-4">
            {/* Notification Button */}
            <button className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-colors">
              <Bell className="h-5 w-5" />
            </button>

            {/* Clerk Authentication Components */}
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-colors">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8",
                    userButtonBox: "gap-2"
                  }
                }}
              />
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  )
}