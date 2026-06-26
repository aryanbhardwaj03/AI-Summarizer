"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export function AppLayout({ children, onUploadClick }: { children: React.ReactNode; onUploadClick?: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Desktop fixed, Mobile drawer */}
      <div className={`fixed inset-y-0 left-0 z-50 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <Sidebar onUploadClick={onUploadClick} />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen md:pl-[260px] w-full max-w-[100vw] overflow-x-hidden">
        {/* Mobile Header Overlay */}
        <div className="md:hidden flex items-center p-4 border-b border-border bg-background sticky top-0 z-30">
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 -ml-2 rounded-lg hover:bg-muted"
          >
            <Menu className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex-1 flex justify-center">
             <span className="font-semibold">DocuMind AI</span>
          </div>
        </div>

        <div className="hidden md:block sticky top-0 z-40">
          <TopBar />
        </div>
        
        <main className="flex-1 w-full bg-background relative z-0">
          {children}
        </main>
      </div>
    </div>
  );
}
