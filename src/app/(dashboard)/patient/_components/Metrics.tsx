"use client"
import { useState, useEffect } from 'react';
import { Heart, Activity, Shield, Pill } from 'lucide-react';

// Define TypeScript interfaces
interface MetricItem {
  icon: any;
  label: string;
  value: string;
  subvalue: string;
  status: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

interface PatientData {
  cardiovascular_bp_systolic?: number;
  cardiovascular_bp_diastolic?: number;
  cardiovascular_hr_bpm?: number;
  physical_activity_steps?: number;
  physical_activity_distance_km?: string;
  health_risk_score?: number;
  health_risk_status?: string;
  medications_active_count?: number;
  physical_assessment_cardiovascular?: string;
}

interface MedicalRecord {
  entry_type: string;
  entry_date: string;
  appointment_time?: string;
}

// Helper function to get health status word
const getHealthWord = (score?: number): string => {
  if (!score) return 'N/A';
  if (score >= 90) return 'Excellent';
  if (score >= 80) return 'Good';
  if (score >= 70) return 'Fair';
  return 'Needs Improvement';
};

export default function HealthMetrics() {
  const [metrics, setMetrics] = useState<MetricItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patientRes, medicalRecRes] = await Promise.all([
          fetch('/api/getPatient'),
          fetch('/api/getMedical_rec')
        ]);
        
        if (!patientRes.ok) throw new Error('Failed to fetch patient data');
        if (!medicalRecRes.ok) throw new Error('Failed to fetch medical records');
        
        const patientData: PatientData = await patientRes.json();
        const medicalRecords: MedicalRecord[] = await medicalRecRes.json();
        
        // Find next appointment time
        let nextAppointmentTime = null;
        const now = new Date();
        for (const record of medicalRecords) {
          if (record.entry_type === 'Scheduled Appointment' && 
              record.entry_date && 
              record.appointment_time) {
            const appointmentDate = new Date(`${record.entry_date}T${record.appointment_time}`);
            if (appointmentDate > now) {
              if (!nextAppointmentTime || appointmentDate < new Date(nextAppointmentTime)) {
                nextAppointmentTime = record.appointment_time;
              }
            }
          }
        }

        // Transform API data to match metrics structure
        const transformedMetrics: MetricItem[] = [
          {
            icon: Heart,
            label: 'Cardiovascular',
            value: patientData.cardiovascular_bp_systolic && patientData.cardiovascular_bp_diastolic 
                    ? `${patientData.cardiovascular_bp_systolic}/${patientData.cardiovascular_bp_diastolic} mmHg`
                    : 'N/A',
            subvalue: patientData.cardiovascular_hr_bpm ? `HR: ${patientData.cardiovascular_hr_bpm} BPM` : 'HR: N/A',
            status: patientData.physical_assessment_cardiovascular || 'Normal',
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            borderColor: 'border-green-200'
          },
          {
            icon: Activity,
            label: 'Physical Activity',
            value: patientData.physical_activity_steps ? 
                   `${patientData.physical_activity_steps.toLocaleString()} steps` : '0 steps',
            subvalue: patientData.physical_activity_distance_km ? 
                     `${patientData.physical_activity_distance_km} km today` : '0 km today',
            status: 'Active', // Default status
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200'
          },
          {
            icon: Shield,
            label: 'Health Risk Score',
            value: patientData.health_risk_score ? 
                   `${patientData.health_risk_score}/100` : 'N/A',
            subvalue: patientData.health_risk_status || 'Calculating',
            status: patientData.health_risk_score ? 
                   getHealthWord(patientData.health_risk_score) : 'N/A',
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-50',
            borderColor: 'border-emerald-200'
          },
          {
            icon: Pill,
            label: 'Medications',
            value: patientData.medications_active_count ? 
                   `${patientData.medications_active_count} Active` : '0 Active',
            subvalue: nextAppointmentTime ? 
                     `Next: ${nextAppointmentTime}` : 'Next: None',
            status: 'Compliant', // Default status
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
            borderColor: 'border-purple-200'
          }
        ];
        
        setMetrics(transformedMetrics);
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 animate-pulse">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg" />
              <div className="h-6 w-20 bg-gray-100 rounded-full" />
            </div>
            <div className="h-4 w-3/4 bg-gray-100 rounded mb-3" />
            <div className="h-7 w-full bg-gray-100 rounded mb-2" />
            <div className="h-4 w-2/3 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-8">
        Error loading health metrics: {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
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
  );
}