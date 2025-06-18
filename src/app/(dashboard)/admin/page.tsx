"use client"
import React, { useState } from 'react';
import { Calendar, Users, Activity } from 'lucide-react';
import NavBar from './_components/NavBar';
import Dashboard from './_components/Dashboard';
import Patients from './_components/Patients';
import Appointments from './_components/Appointments';

const MedicalPractitionerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: 'Sarah Johnson',
      patientId: 'PT-2024-001',
      date: '2025-01-19',
      time: '09:00',
      type: 'Regular Checkup',
      status: 'confirmed',
      duration: 30
    },
    {
      id: 2,
      patientName: 'Michael Chen',
      patientId: 'PT-2024-002',
      date: '2025-01-19',
      time: '10:30',
      type: 'Follow-up',
      status: 'pending',
      duration: 45
    },
    {
      id: 3,
      patientName: 'Emily Davis',
      patientId: 'PT-2024-003',
      date: '2025-01-20',
      time: '14:00',
      type: 'Consultation',
      status: 'confirmed',
      duration: 60
    }
  ]);

  const [patients, setPatients] = useState([
    {
      id: 'PT-2024-001',
      name: 'Sarah Johnson',
      age: 34,
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      lastVisit: '2025-01-10',
      condition: 'Hypertension',
      status: 'active'
    },
    {
      id: 'PT-2024-002',
      name: 'Michael Chen',
      age: 28,
      email: 'michael.chen@email.com',
      phone: '+1 (555) 234-5678',
      lastVisit: '2025-01-12',
      condition: 'Diabetes Type 2',
      status: 'active'
    },
    {
      id: 'PT-2024-003',
      name: 'Emily Davis',
      age: 45,
      email: 'emily.davis@email.com',
      phone: '+1 (555) 345-6789',
      lastVisit: '2025-01-08',
      condition: 'Anxiety',
      status: 'active'
    },
    {
      id: 'PT-2024-004',
      name: 'Robert Wilson',
      age: 52,
      email: 'robert.wilson@email.com',
      phone: '+1 (555) 456-7890',
      lastVisit: '2025-01-05',
      condition: 'Arthritis',
      status: 'inactive'
    }
  ]);

  const [newAppointment, setNewAppointment] = useState({
    patientId: '',
    date: '',
    time: '',
    type: 'Regular Checkup',
    duration: 30
  });

  const handleBookAppointment = () => {
    if (newAppointment.patientId && newAppointment.date && newAppointment.time) {
      const patient = patients.find(p => p.id === newAppointment.patientId);
      const newApt = {
        id: appointments.length + 1,
        patientName: patient?.name || '',
        patientId: newAppointment.patientId,
        date: newAppointment.date,
        time: newAppointment.time,
        type: newAppointment.type,
        status: 'pending',
        duration: newAppointment.duration
      };
      
      setAppointments([...appointments, newApt]);
      setNewAppointment({
        patientId: '',
        date: '',
        time: '',
        type: 'Regular Checkup',
        duration: 30
      });
      setShowBookingModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <NavBar />

      {/* Navigation */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Activity },
              { id: 'patients', label: 'Patients', icon: Users },
              { id: 'appointments', label: 'Appointments', icon: Calendar },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Render active tab component */}
        {activeTab === 'dashboard' && (
          <Dashboard 
            appointments={appointments}
            patients={patients}
            setActiveTab={setActiveTab}
            setShowBookingModal={setShowBookingModal}
          />
        )}

        {activeTab === 'patients' && (
          <Patients 
            patients={patients}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setSelectedPatient={setSelectedPatient}
            setNewAppointment={setNewAppointment}
            setShowBookingModal={setShowBookingModal}
            newAppointment={newAppointment}
          />
        )}

        {activeTab === 'appointments' && (
          <Appointments 
            appointments={appointments}
            setShowBookingModal={setShowBookingModal}
          />
        )}
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Book New Appointment</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Patient</label>
                <select
                  value={newAppointment.patientId}
                  onChange={(e) => setNewAppointment({ ...newAppointment, patientId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a patient</option>
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name} ({patient.id})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={newAppointment.date}
                  onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                <input
                  type="time"
                  value={newAppointment.time}
                  onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={newAppointment.type}
                  onChange={(e) => setNewAppointment({ ...newAppointment, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Regular Checkup">Regular Checkup</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Consultation">Consultation</option>
                  <option value="Emergency">Emergency</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                <select
                  value={newAppointment.duration}
                  onChange={(e) => setNewAppointment({ ...newAppointment, duration: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={15}>15 minutes</option>
                  <option value={30}>30 minutes</option>
                  <option value={45}>45 minutes</option>
                  <option value={60}>60 minutes</option>
                </select>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
              <button
                onClick={() => setShowBookingModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleBookAppointment}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalPractitionerDashboard;