
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn(
      "w-full px-6 py-4 backdrop-blur-sm bg-white/60 border-b border-slate-200",
      "sticky top-0 z-10 transition-all duration-300",
      className
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center animate-scale-in">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div className="animate-fade-in">
            <h1 className="text-lg font-semibold leading-none tracking-tight">QRPayCraft</h1>
            <p className="text-xs text-gray-500">Bitcoin Payment Solutions</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-sm font-medium hover:text-blue-600 transition-colors animate-hover">Features</a>
          <a href="#" className="text-sm font-medium hover:text-blue-600 transition-colors animate-hover">Pricing</a>
          <a href="#" className="text-sm font-medium hover:text-blue-600 transition-colors animate-hover">Documentation</a>
          <a href="#" className="text-sm font-medium hover:text-blue-600 transition-colors animate-hover">Dashboard</a>
        </nav>
        
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline"
            size="sm"
            className="text-sm border-slate-200 hover:bg-slate-100 transition-all animate-hover hidden md:flex"
          >
            Sign In
          </Button>
          <Button 
            size="sm"
            className="text-sm bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 transition-all animate-hover"
          >
            Register
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
