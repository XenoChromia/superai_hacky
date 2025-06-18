"use client"
import React, { useState } from 'react';
import { Heart, Brain, Shield, Users, ChevronRight, Menu, X, Activity, Stethoscope, FileText, Award, Building, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const GenkiSanHomepage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Mock Clerk functions - in real implementation, you'd import from @clerk/nextjs
  const handleSignIn = () => {
    console.log('Redirecting to Clerk sign in...');
    // In real app: signIn.redirectToSignIn()
  };

  const handleSignUp = () => {
    console.log('Redirecting to Clerk sign up...');
    // In real app: signUp.redirectToSignUp()
  };

  const features = [
    {
      icon: Brain,
      title: "Clinical Decision Support",
      description: "Evidence-based diagnostic assistance integrated with established medical protocols and guidelines for healthcare professionals."
    },
    {
      icon: Shield,
      title: "Regulatory Compliance",
      description: "Full compliance with HIPAA, FDA guidelines, and international healthcare data protection standards with comprehensive audit trails."
    },
    {
      icon: FileText,
      title: "Electronic Health Records",
      description: "Seamlessly integrated EHR management system with standardized medical coding and interoperability protocols."
    },
    {
      icon: Users,
      title: "Healthcare Network",
      description: "Secure multi-institutional collaboration platform connecting accredited healthcare providers and medical facilities."
    }
  ];

  const partnerships = [
    "Department of Health and Human Services",
    "Centers for Medicare & Medicaid Services",
    "American Medical Association",
    "Healthcare Information and Management Systems Society",
    "Office of the National Coordinator for Health IT"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Official Header Banner */}
      <div className="bg-blue-900 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <span>🏛️ Official Healthcare AI Platform</span>
              <span className="hidden sm:block">•</span>
              <span className="hidden sm:block">Regulated Medical Technology</span>
            </div>
            <div className="flex items-center space-x-4 mt-2 sm:mt-0">
              <span>📞 Support: 1-800-GENKI-AI</span>
              <span>•</span>
              <span>🔒 Secure Portal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white shadow-md border-b-2 border-blue-900 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Official Logo */}
            <div className="flex items-center space-x-4">
              <div className="bg-blue-900 p-3 rounded-md">
                <Activity className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-blue-900">Genki-San</h1>
                <p className="text-sm text-gray-600 font-medium">Healthcare Management System</p>
                <p className="text-xs text-gray-500">Authorized Medical AI Platform</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <a href="#contact" className="text-gray-700 hover:text-blue-900 font-medium border-b-2 border-transparent hover:border-blue-900 pb-1 transition-all">
                Contact
              </a>
              <div className="flex items-center space-x-3 border-l border-gray-300 pl-6">
                <SignedOut>
                    <SignInButton>
                        <button>Sign in</button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <UserButton>
                    </UserButton>
                </SignedIn >
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-blue-900 hover:text-blue-700 transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
                <a href="#services" className="block px-3 py-3 text-gray-700 hover:text-blue-900 font-medium border-b border-gray-100">
                  Services
                </a>
                <a href="#compliance" className="block px-3 py-3 text-gray-700 hover:text-blue-900 font-medium border-b border-gray-100">
                  Compliance
                </a>
                <a href="#partnerships" className="block px-3 py-3 text-gray-700 hover:text-blue-900 font-medium border-b border-gray-100">
                  Partnerships
                </a>
                <a href="#contact" className="block px-3 py-3 text-gray-700 hover:text-blue-900 font-medium border-b border-gray-100">
                  Contact
                </a>
                <div className="pt-4 space-y-2">
                  <button
                    onClick={handleSignIn}
                    className="block w-full text-left px-3 py-3 text-blue-900 hover:text-blue-700 font-semibold border border-blue-900 rounded"
                  >
                    Provider Login
                  </button>
                  <button
                    onClick={handleSignUp}
                    className="block w-full bg-blue-900 text-white px-3 py-3 rounded hover:bg-blue-800 transition-colors font-semibold"
                  >
                    Register Facility
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center bg-blue-50 border border-blue-200 text-blue-900 text-sm font-semibold px-6 py-3 rounded-md mb-8">
              <Building className="h-5 w-5 mr-3" />
              Authorized Healthcare Technology Platform
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Official Healthcare AI
              <br />
              <span className="text-blue-900">Management System</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Genki-San is a federally compliant healthcare management platform designed for medical institutions, 
              healthcare providers, and government health agencies. Our system ensures full regulatory compliance 
              while delivering advanced patient care coordination and clinical decision support.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button className="border-2 border-blue-900 text-blue-900 px-8 py-4 rounded-md hover:bg-blue-50 transition-colors font-semibold text-lg">
                View Documentation
              </button>
            </div>

            {/* Official Badges */}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Healthcare Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform provides healthcare institutions with the tools and infrastructure 
              needed to deliver exceptional patient care while maintaining full regulatory compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-md border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-md flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-blue-900" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-white p-2 rounded">
                  <Activity className="h-6 w-6 text-blue-900" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Genki-San</h3>
                  <p className="text-blue-200 text-sm">Official Healthcare AI</p>
                </div>
              </div>
              <p className="text-blue-200 text-sm leading-relaxed">
                Authorized healthcare management platform serving medical institutions nationwide.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Healthcare Services</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li><a href="#" className="hover:text-white transition-colors">Clinical Decision Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Patient Management</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Regulatory Compliance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Data Analytics</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Compliance</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li><a href="#" className="hover:text-white transition-colors">HIPAA Compliance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FDA Registration</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security Audits</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Training Materials</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Technical Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">System Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-blue-800 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-blue-200 text-sm">
                © 2025 Genki-San Healthcare Management System. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-4 md:mt-0 text-xs text-blue-200">
                <span>🛡️ HIPAA Compliant</span>
                <span>📜 FDA Registered</span>
                <span>🔒 SOC 2 Certified</span>
                <span>🏛️ Government Approved</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GenkiSanHomepage;