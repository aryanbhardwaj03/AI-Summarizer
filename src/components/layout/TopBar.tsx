"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { Search, Bell, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { NotificationCenter } from "./NotificationCenter";
import { useState, useRef, useEffect } from "react";
import { LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { DocumentSelector } from "./DocumentSelector";
import { GlobalSearch } from "./GlobalSearch";

export function TopBar() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileOpen]);

  return (
    <header className="h-[72px] px-8 flex items-center justify-between sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
      <GlobalSearch />

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        
        {/* Document Selector - Hidden on very small screens, visible on md+ */}
        <div className="hidden md:block">
          <DocumentSelector />
        </div>
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="relative p-2 rounded-full hover:bg-muted transition-colors text-foreground"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <NotificationCenter />

        <div className="relative" ref={profileRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center font-bold text-sm text-foreground shadow-sm hover:border-primary/50 transition-colors cursor-pointer"
          >
            {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "A"}
          </button>
          
          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-lg overflow-hidden flex flex-col py-1 z-50"
              >
                <div className="px-4 py-2 border-b border-border mb-1">
                  <p className="text-sm font-medium text-foreground truncate">
                    {user?.name || "Aryan"}
                  </p>
                  <p className="text-[10px] text-muted-foreground truncate">
                    {user?.email || "aryan@example.com"}
                  </p>
                </div>
                
                <Link 
                  href="/settings" 
                  onClick={() => setIsProfileOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-2 transition-colors"
                >
                  <User className="w-3.5 h-3.5" />
                  Profile Details
                </Link>
                <Link 
                  href="/settings" 
                  onClick={() => setIsProfileOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-2 transition-colors"
                >
                  <Settings className="w-3.5 h-3.5" />
                  Settings
                </Link>
                <button 
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full text-left px-4 py-2 text-xs font-medium text-red-500 hover:bg-red-500/10 flex items-center gap-2 transition-colors mt-1 border-t border-border"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
