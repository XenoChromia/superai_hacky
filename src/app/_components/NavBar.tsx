"use client"
import React, { useState } from "react";
import {
  Heart,
  Calendar,
  Settings,
  LogOut,
  Activity,
  FileText, Users
} from "lucide-react";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export default function NavBar(){
  const [activeTab, setActiveTab] = useState('home');

  return (
    <header className="bg-gradient-to-r from-blue-900 to-indigo-800 px-8 py-6 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <Heart className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <span className="text-2xl font-bold text-white">Genki-San</span>
              <p className="text-blue-100 text-sm">Patient Management System</p>
            </div>
          </div>

          <nav className="hidden lg:flex space-x-1">
            {[
              { id: 'home', label: 'Dashboard', icon: Activity },
              { id: 'records', label: 'Medical Records', icon: FileText },
              { id: 'appointments', label: 'Appointments', icon: Calendar },
              { id: 'providers', label: 'Providers', icon: Users },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeTab === id
                    ? 'bg-white/20 text-white shadow-md border border-white/30'
                    : 'text-blue-100 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium text-sm">{label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex flex-col text-right">
            <span className="text-white font-medium text-sm">Dr. Alexander Smith</span>
            <span className="text-blue-100 text-xs">Patient ID: #PH-2024-5847</span>
          </div>
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
        </div>
      </div>
    </header>
  )
}