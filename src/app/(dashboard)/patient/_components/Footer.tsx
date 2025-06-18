import { Heart, Phone } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
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
  )
}