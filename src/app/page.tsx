'use client';

import Link from 'next/link';
import { ArrowRight, Building2, ShieldCheck, Users, Megaphone, Wrench, Calendar, FileText, CheckCircle2, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-lg text-white">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-gray-900">SocietyFlow</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Pricing</a>
              <a href="#testimonials" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Testimonials</a>
              <Link
                href="/login"
                className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
              >
                Member Login
              </Link>
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-100 p-4 flex flex-col gap-4 shadow-xl">
            <a href="#features" className="text-lg font-medium text-gray-800" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#pricing" className="text-lg font-medium text-gray-800" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
            <Link
              href="/login"
              className="px-5 py-3 bg-indigo-600 text-white rounded-xl font-bold text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Member Login
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 font-bold text-sm mb-6 border border-indigo-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Trusted by 500+ Societies
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight mb-6 leading-tight animate-in fade-in slide-in-from-bottom-8 duration-700">
            Smart Management for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Modern Housing Societies</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-700">
            Streamline communication, automate accounts, and enhance security with Anusaya's all-in-one residential platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-16 duration-700">
            <Link
              href="/login"
              className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all active:scale-95">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Hero Image/Mockup Placeholder */}
        <div className="mt-20 relative mx-auto max-w-5xl">
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10"></div>
          <div className="bg-gray-100 rounded-3xl border-8 border-gray-900/5 shadow-2xl overflow-hidden aspect-video relative flex items-center justify-center">
            <div className="absolute inset-0 bg-indigo-900/5 pattern-grid-lg"></div>
            <p className="text-gray-400 font-medium">App Dashboard Preview</p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything you need</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">From accounting to security, we've digitised every aspect of society management.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Megaphone, title: 'Digital Notices', desc: 'Instant announcements to all members via the app.' },
              { icon: Wrench, title: 'Help Desk', desc: 'Track and resolve maintenance complaints efficiently.' },
              { icon: Users, title: 'Visitor Management', desc: 'Secure gate passes and digital entry logs.' },
              { icon: Calendar, title: 'Amenity Booking', desc: 'Hassle-free reservations for clubhouse and facilities.' },
              { icon: FileText, title: 'Document Center', desc: 'Central repository for by-laws and meeting minutes.' },
              { icon: ShieldCheck, title: 'Admin Controls', desc: 'Powerful dashboard for managing members and finances.' },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-all border border-gray-100">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-600">Choose the plan that fits your society size.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: 'Starter', price: '₹999', period: '/month', features: ['Up to 20 Flats', 'Basic Notices', 'Visitor Log'] },
              { name: 'Pro', price: '₹2,499', period: '/month', popular: true, features: ['Up to 100 Flats', 'Full Accounting', 'Complaints & Bookings', 'Priority Support'] },
              { name: 'Enterprise', price: 'Custom', period: '', features: ['Unlimited Flats', 'Dedicated Manager', 'Custom Features', 'API Access'] },
            ].map((plan, i) => (
              <div key={i} className={`relative p-8 rounded-3xl border ${plan.popular ? 'border-2 border-indigo-600 bg-indigo-50/50 shadow-xl' : 'border-gray-200 bg-white'}`}>
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
                    Most Popular
                  </div>
                )}
                <h3 className="text-lg font-bold text-gray-500 mb-4">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-gray-600">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl font-bold transition-all ${plan.popular ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/20' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-6 h-6 text-indigo-400" />
              <span className="text-xl font-bold">SocietyFlow</span>
            </div>
            <p className="text-gray-400 max-w-sm">Making community living smarter, safer, and simpler for everyone.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          © 2024 SocietyFlow Labs. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
