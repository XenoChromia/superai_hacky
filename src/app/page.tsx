import React from 'react';
import { Heart, Calendar, Clock, User, Bell, Settings, LogOut, Activity, TrendingUp, Shield, Pill, FileText, Users, Phone } from 'lucide-react';
import NavBar from "~/app/_components/NavBar";

export default function HomePage() {

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

              {/* Clinical Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                  {
                    icon: Heart,
                    label: 'Cardiovascular',
                    value: '118/78 mmHg',
                    subvalue: 'HR: 72 BPM',
                    status: 'Normal',
                    color: 'text-green-600',
                    bgColor: 'bg-green-50',
                    borderColor: 'border-green-200'
                  },
                  {
                    icon: Activity,
                    label: 'Physical Activity',
                    value: '8,547 steps',
                    subvalue: '6.2 km today',
                    status: 'Above Target',
                    color: 'text-blue-600',
                    bgColor: 'bg-blue-50',
                    borderColor: 'border-blue-200'
                  },
                  {
                    icon: Shield,
                    label: 'Health Risk Score',
                    value: '94/100',
                    subvalue: 'Low Risk',
                    status: 'Excellent',
                    color: 'text-emerald-600',
                    bgColor: 'bg-emerald-50',
                    borderColor: 'border-emerald-200'
                  },
                  {
                    icon: Pill,
                    label: 'Medications',
                    value: '3 Active',
                    subvalue: 'Next: 18:00',
                    status: 'Compliant',
                    color: 'text-purple-600',
                    bgColor: 'bg-purple-50',
                    borderColor: 'border-purple-200'
                  }
                ].map((metric, index) => (
                  <div
                    key={index}
                    className={`bg-white border ${metric.borderColor} rounded-xl p-6 hover:shadow-md transition-all duration-200`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 ${metric.bgColor} rounded-lg flex items-center justify-center`}>
                        <metric.icon className={`w-6 h-6 ${metric.color}`} />
                      </div>
                      <span className={`px-2 py-1 ${metric.bgColor} ${metric.color} rounded-full text-xs font-medium`}>
                        {metric.status}
                      </span>
                    </div>
                    <h3 className="text-gray-600 text-sm font-medium mb-1">{metric.label}</h3>
                    <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
                    <p className="text-gray-500 text-sm">{metric.subvalue}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
                {/* Clinical Assessment */}
                <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Physical Assessment</h2>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-gray-600">Normal Range</span>
                    </div>
                  </div>

                  <div className="flex justify-center items-center h-72 relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                    {/* Professional Medical Diagram */}
                    <div className="relative">
                      <svg width="140" height="280" viewBox="0 0 140 280" className="text-gray-700">
                        {/* Head */}
                        <ellipse cx="70" cy="35" rx="22" ry="26" fill="none" stroke="currentColor" strokeWidth="2.5"/>
                        {/* Neck */}
                        <line x1="70" y1="61" x2="70" y2="78" stroke="currentColor" strokeWidth="2.5"/>
                        {/* Torso */}
                        <rect x="43" y="78" width="54" height="88" fill="none" stroke="currentColor" strokeWidth="2.5" rx="10"/>
                        {/* Arms */}
                        <line x1="43" y1="95" x2="18" y2="130" stroke="currentColor" strokeWidth="2.5"/>
                        <line x1="18" y1="130" x2="26" y2="165" stroke="currentColor" strokeWidth="2.5"/>
                        <line x1="97" y1="95" x2="122" y2="130" stroke="currentColor" strokeWidth="2.5"/>
                        <line x1="122" y1="130" x2="114" y2="165" stroke="currentColor" strokeWidth="2.5"/>
                        {/* Legs */}
                        <line x1="56" y1="166" x2="43" y2="225" stroke="currentColor" strokeWidth="2.5"/>
                        <line x1="43" y1="225" x2="52" y2="260" stroke="currentColor" strokeWidth="2.5"/>
                        <line x1="84" y1="166" x2="97" y2="225" stroke="currentColor" strokeWidth="2.5"/>
                        <line x1="97" y1="225" x2="88" y2="260" stroke="currentColor" strokeWidth="2.5"/>

                        {/* Medical indicators */}
                        <circle cx="70" cy="35" r="3" fill="#10B981" opacity="0.8"/>
                        <circle cx="70" cy="120" r="3" fill="#10B981" opacity="0.8"/>
                        <circle cx="56" cy="140" r="3" fill="#10B981" opacity="0.8"/>
                        <circle cx="84" cy="140" r="3" fill="#10B981" opacity="0.8"/>
                      </svg>
                    </div>

                    {/* Vital Signs Overlay */}
                    <div className="absolute top-4 left-4 space-y-2">
                      <div className="flex items-center space-x-2 text-xs">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-gray-600">Cardiovascular: Normal</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-gray-600">Respiratory: Normal</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        <span className="text-gray-600">Neurological: Normal</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Medical History */}
                <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Medical History</h2>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View Full History</button>
                  </div>
                  <div className="space-y-4">
                    {[
                      {
                        date: '2024-06-15',
                        type: 'Annual Physical Examination',
                        provider: 'Dr. Sarah Johnson, MD',
                        result: 'Normal findings',
                        priority: 'routine'
                      },
                      {
                        date: '2024-05-22',
                        type: 'Blood Pressure Monitoring',
                        provider: 'Nurse Patricia Miller, RN',
                        result: 'Within normal range',
                        priority: 'routine'
                      },
                      {
                        date: '2024-04-18',
                        type: 'COVID-19 Booster Vaccination',
                        provider: 'Dr. Michael Chen, MD',
                        result: 'Administered successfully',
                        priority: 'preventive'
                      },
                      {
                        date: '2024-03-12',
                        type: 'Dental Prophylaxis',
                        provider: 'Dr. Emily Davis, DDS',
                        result: 'Excellent oral health',
                        priority: 'routine'
                      }
                    ].map((record, index) => (
                      <div key={index} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900 text-sm">{record.type}</h4>
                          <span className="text-xs text-gray-500">{record.date}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{record.provider}</p>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-500">{record.result}</p>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            record.priority === 'routine' ? 'bg-gray-100 text-gray-600' :
                              record.priority === 'preventive' ? 'bg-blue-100 text-blue-600' :
                                'bg-yellow-100 text-yellow-600'
                          }`}>
                            {record.priority}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Appointment History */}
                <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Recent Appointments</h2>
                    <Clock className="w-5 h-5 text-gray-500" />
                  </div>
                  <div className="space-y-4">
                    {[
                      {
                        doctor: 'Dr. Sarah Johnson, MD',
                        specialty: 'Internal Medicine',
                        date: 'June 10, 2024',
                        time: '14:00',
                        type: 'Follow-up Consultation',
                        status: 'Completed'
                      },
                      {
                        doctor: 'Dr. Michael Chen, MD',
                        specialty: 'Family Practice',
                        date: 'May 28, 2024',
                        time: '10:30',
                        type: 'Annual Physical',
                        status: 'Completed'
                      },
                      {
                        doctor: 'Dr. Emily Davis, DDS',
                        specialty: 'Dentistry',
                        date: 'May 15, 2024',
                        time: '15:15',
                        type: 'Preventive Care',
                        status: 'Completed'
                      }
                    ].map((appointment, index) => (
                      <div key={index} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 text-sm">{appointment.doctor}</h4>
                              <p className="text-sm text-gray-600">{appointment.specialty}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-900">{appointment.date}</p>
                            <p className="text-xs text-gray-500">{appointment.time}</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-sm text-gray-600">{appointment.type}</span>
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            {appointment.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scheduled Appointments */}
                <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Scheduled Appointments</h2>
                    <Calendar className="w-5 h-5 text-gray-500" />
                  </div>
                  <div className="space-y-4">
                    {[
                      {
                        doctor: 'Dr. Lisa Rodriguez, MD',
                        specialty: 'Endocrinology',
                        date: 'June 25, 2024',
                        time: '09:00',
                        type: 'Diabetes Management',
                        priority: 'high'
                      },
                      {
                        doctor: 'Dr. Robert Kim, MD',
                        specialty: 'Neurology',
                        date: 'July 8, 2024',
                        time: '13:30',
                        type: 'Consultation',
                        priority: 'normal'
                      },
                      {
                        doctor: 'Dr. Amanda White, MD',
                        specialty: 'Gynecology',
                        date: 'July 22, 2024',
                        time: '11:15',
                        type: 'Annual Screening',
                        priority: 'normal'
                      }
                    ].map((appointment, index) => (
                      <div key={index} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 ${appointment.priority === 'high' ? 'bg-red-100' : 'bg-blue-100'} rounded-full flex items-center justify-center`}>
                              <User className={`w-5 h-5 ${appointment.priority === 'high' ? 'text-red-600' : 'text-blue-600'}`} />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 text-sm">{appointment.doctor}</h4>
                              <p className="text-sm text-gray-600">{appointment.specialty}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-900">{appointment.date}</p>
                            <p className="text-xs text-gray-500">{appointment.time}</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-sm text-gray-600">{appointment.type}</span>
                          <div className="flex items-center space-x-2">
                            {appointment.priority === 'high' && (
                              <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                                Priority
                              </span>
                            )}
                            <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium hover:bg-blue-200 transition-colors">
                              Reschedule
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </main>

            {/* Professional Footer */}
            <footer className="bg-white border-t border-gray-200 px-8 py-6">
              <div className="flex flex-col md:flex-row justify-between items-start space-y-4 md:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">HealthHub Medical</h3>
                    <p className="text-gray-600 text-sm">Comprehensive Healthcare Management</p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-8 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>Emergency: +1 (555) 911-HELP</span>
                  </div>
                  <div>HIPAA Compliant • SSL Secured</div>
                  <div>© 2024 HealthHub Medical Systems</div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}