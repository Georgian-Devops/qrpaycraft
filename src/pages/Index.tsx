
import React from 'react';
import Header from '@/components/Header';
import QRCodeGenerator from '@/components/QRCodeGenerator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-24 px-4 w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6 animate-slide-down">
              <Badge variant="outline" className="px-3 py-1 text-sm bg-white border-slate-200 text-slate-600">
                Simple Bitcoin Payments
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 text-balance">
                Accept Bitcoin Payments <span className="text-blue-500">Without Complexity</span>
              </h1>
              
              <p className="text-lg text-slate-600 max-w-md text-balance">
                Generate QR codes for Bitcoin payments instantly. No registration, no fees, just simple payments.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 transition-all animate-hover">
                  Get Started
                </Button>
                <Button variant="outline" size="lg" className="border-slate-200 bg-white/60 backdrop-blur-sm hover:bg-slate-100 transition-all animate-hover">
                  Learn More
                </Button>
              </div>
              
              <div className="pt-4 flex items-center gap-6 text-sm text-slate-600">
                <div className="flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-green-500">
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <span>No Registration</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-green-500">
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <span>No Fees</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-green-500">
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <span>Instant Setup</span>
                </div>
              </div>
            </div>
            
            <div className="animate-slide-up">
              <QRCodeGenerator />
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 px-4 w-full max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose QRPayCraft?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our platform makes accepting Bitcoin payments effortless with beautiful QR codes and a streamlined process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Instant QR Codes",
                description: "Generate Bitcoin payment QR codes in seconds without any complicated setup",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <rect width="3" height="3" x="7" y="7" />
                    <rect width="3" height="3" x="14" y="7" />
                    <rect width="3" height="3" x="7" y="14" />
                    <rect width="3" height="3" x="14" y="14" />
                  </svg>
                )
              },
              {
                title: "Transaction Monitoring",
                description: "Track payment status in real-time with confirmation notifications",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <path d="M12 2v4" />
                    <path d="M12 18v4" />
                    <path d="M4.93 4.93l2.83 2.83" />
                    <path d="M16.24 16.24l2.83 2.83" />
                    <path d="M2 12h4" />
                    <path d="M18 12h4" />
                    <path d="M4.93 19.07l2.83-2.83" />
                    <path d="M16.24 7.76l2.83-2.83" />
                  </svg>
                )
              },
              {
                title: "No Wallet Lock-in",
                description: "Use with any Bitcoin wallet. Full control over your funds and keys",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <line x1="2" x2="22" y1="10" y2="10" />
                  </svg>
                )
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="glass p-6 rounded-lg transition-all duration-300 animate-hover animate-scale-in" 
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-12 h-12 rounded-full flex items-center justify-center text-white mb-4 shadow-md">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 px-4 w-full max-w-6xl mx-auto">
          <div className="glass border border-blue-100 rounded-2xl p-8 md:p-12 bg-gradient-to-br from-white/60 to-blue-50/40 backdrop-blur-md animate-scale-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                  Ready to accept Bitcoin payments?
                </h2>
                <p className="text-slate-600">
                  Start generating QR codes and accepting Bitcoin payments in minutes. No technical knowledge required.
                </p>
                <div className="pt-4 flex flex-wrap gap-4">
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 transition-all animate-hover">
                    Create Account
                  </Button>
                  <Button variant="outline" size="lg" className="border-slate-200 bg-white/80 backdrop-blur-sm hover:bg-slate-100 transition-all animate-hover">
                    Contact Sales
                  </Button>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-green-500">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span className="text-slate-700 font-medium">Direct to wallet payments</span>
                  </div>
                  <p className="text-sm text-slate-600 pl-7">Funds go directly to your wallet. No middleman.</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-green-500">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span className="text-slate-700 font-medium">Easy integration</span>
                  </div>
                  <p className="text-sm text-slate-600 pl-7">Use our API or simple embed codes to add to your website.</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-green-500">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span className="text-slate-700 font-medium">24/7 support</span>
                  </div>
                  <p className="text-sm text-slate-600 pl-7">Our team is always available to help with any issues.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-8 px-4 border-t border-slate-200">
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-white">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-sm font-medium">QRPayCraft</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-500">
            <a href="#" className="hover:text-blue-600 transition-colors">About</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Documentation</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Support</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
          </div>
          
          <div className="mt-4 md:mt-0 text-xs text-slate-500">
            &copy; {new Date().getFullYear()} QRPayCraft. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
