import React from 'react';
import NavBar from "./_components/NavBar";
import Footer from "./_components/Footer";
import Metrics from "./_components/Metrics";
import { PatientDashboard } from "./_components/Assessment";


export default function DashboardPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1)_0%,transparent_50%)]"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
      </div>

      <div className="relative z-10 min-h-screen">
        {/* Professional Container */}
        <div className="max-w-7xl mx-auto p-6">
          <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl overflow-hidden">

            {/* Official Header */}
            <NavBar />

            {/* Main Dashboard */}
            <main className="p-8 bg-gray-50/50">
              {/* Professional Header Section */}
              <div className="mb-8 pb-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Health Dashboard</h1>
                    <p className="text-gray-600">Comprehensive health monitoring and medical record management</p>
                    <div className="flex items-center space-x-6 mt-3 text-sm text-gray-500">
                      <span>Last Updated: June 17, 2025 - 14:32 EST</span>
                      <span>•</span>
                      <span>Next Appointment: June 25, 2025</span>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      Emergency Contact
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                      Print Records
                    </button>
                  </div>
                </div>
              </div>

              <Metrics />

                {/* Clinical Assessment */}
                <PatientDashboard />
            </main>
          <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}