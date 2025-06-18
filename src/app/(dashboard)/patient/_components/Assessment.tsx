"use client"
import { Clock, Calendar, User } from 'lucide-react';
import { useState, useEffect } from 'react';

// Define TypeScript interfaces
interface PatientData {
  physical_assessment_cardiovascular?: string;
  physical_assessment_respiratory?: string;
  physical_assessment_neurological?: string;
}

interface MedicalRecord {
  id: number;
  entry_type: string;
  entry_date: string;
  description: string;
  practitioner: string;
  notes: string;
  status: string;
  appointment_time?: string;
}

// Physical Assessment Card Component
export function PhysicalAssessmentCard({ patientData }: { patientData: PatientData }) {
  return (
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
            <span className="text-gray-600">
              Cardiovascular: {patientData.physical_assessment_cardiovascular || 'Normal'}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-gray-600">
              Respiratory: {patientData.physical_assessment_respiratory || 'Normal'}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span className="text-gray-600">
              Neurological: {patientData.physical_assessment_neurological || 'Normal'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Medical History Card Component
export function MedicalHistoryCard({ medicalRecords }: { medicalRecords: MedicalRecord[] }) {
  // Filter medical history records
  const medicalHistory = medicalRecords.filter(
    record => record.entry_type === 'Medical History'
  );

  // Sort by date descending
  const sortedHistory = [...medicalHistory].sort((a, b) => 
    new Date(b.entry_date).getTime() - new Date(a.entry_date).getTime()
  );

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Medical History</h2>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View Full History
        </button>
      </div>
      <div className="space-y-4">
        {sortedHistory.slice(0, 4).map((record) => (
          <div key={record.id} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-900 text-sm">{record.description}</h4>
              <span className="text-xs text-gray-500">{formatDate(record.entry_date)}</span>
            </div>
            <p className="text-sm text-gray-600 mb-1">{record.practitioner}</p>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">{record.notes}</p>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                record.status === 'routine' ? 'bg-gray-100 text-gray-600' :
                record.status === 'preventive' ? 'bg-blue-100 text-blue-600' :
                'bg-yellow-100 text-yellow-600'
              }`}>
                {record.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Appointment Card Component
export function AppointmentCard({ 
  title, 
  records, 
  icon: Icon,
  isRecent = false
}: { 
  title: string;
  records: MedicalRecord[];
  icon: React.ComponentType<{ className?: string }>;
  isRecent?: boolean;
}) {
  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <Icon className="w-5 h-5 text-gray-500" />
      </div>
      <div className="space-y-4">
        {records.map((record) => (
          <div key={record.id} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${
                  isRecent ? 'bg-blue-100' : 
                  record.status === 'high' ? 'bg-red-100' : 'bg-blue-100'
                } rounded-full flex items-center justify-center`}>
                  <User className={`w-5 h-5 ${
                    isRecent ? 'text-blue-600' : 
                    record.status === 'high' ? 'text-red-600' : 'text-blue-600'
                  }`} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">{record.practitioner}</h4>
                  <p className="text-sm text-gray-600">{record.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-900">{formatDate(record.entry_date)}</p>
                {record.appointment_time && (
                  <p className="text-xs text-gray-500">{record.appointment_time}</p>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center mt-3">
              <span className="text-sm text-gray-600">
                {record.notes || record.description}
              </span>
              {isRecent ? (
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  {record.status || 'Completed'}
                </span>
              ) : (
                <div className="flex items-center space-x-2">
                  {record.status === 'high' && (
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                      Priority
                    </span>
                  )}
                  <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium hover:bg-blue-200 transition-colors">
                    Reschedule
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export function PatientDashboard() {
  const [patientData, setPatientData] = useState<PatientData>({});
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patientRes, medicalRecRes] = await Promise.all([
          fetch('/api/getPatient'), // Corrected endpoint
          fetch('/api/getMedical_rec') // Corrected endpoint
        ]);
        
        if (!patientRes.ok) throw new Error('Failed to fetch patient data');
        if (!medicalRecRes.ok) throw new Error('Failed to fetch medical records');
        
        const patient: PatientData = await patientRes.json();
        const records: MedicalRecord[] = await medicalRecRes.json();
        
        setPatientData(patient);
        setMedicalRecords(records);
      } catch (err: any) {
        setError(err.message || 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm animate-pulse">
            <div className="h-6 w-1/3 bg-gray-200 rounded mb-6"></div>
            <div className="h-72 bg-gray-100 rounded-xl"></div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm animate-pulse">
            <div className="h-6 w-1/3 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-24 bg-gray-100 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm animate-pulse">
              <div className="h-6 w-1/3 bg-gray-200 rounded mb-6"></div>
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="h-28 bg-gray-100 rounded-lg"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
        Error loading patient dashboard: {error}
      </div>
    );
  }

  // Filter records for different sections
  const recentAppointments = medicalRecords.filter(
    record => record.entry_type === 'Recent Appointment'
  );
  
  const scheduledAppointments = medicalRecords.filter(
    record => record.entry_type === 'Scheduled Appointment'
  );

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PhysicalAssessmentCard patientData={patientData} />
        <MedicalHistoryCard medicalRecords={medicalRecords} />
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <AppointmentCard 
          title="Recent Appointments" 
          records={recentAppointments} 
          icon={Clock}
          isRecent={true}
        />
        
        <AppointmentCard 
          title="Scheduled Appointments" 
          records={scheduledAppointments} 
          icon={Calendar}
        />
      </div>
    </div>
  );
}