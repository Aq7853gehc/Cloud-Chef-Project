"use client"
import React from 'react';
import { Button } from './ui/button';
import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const LogoutButton = () => {
  return (
    <div>
      
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button 
        onClick={() => signOut({ callbackUrl: '/login' })}
        variant="outline"
        className="group flex items-center gap-2 border-red-500/30 hover:bg-red-500/10 hover:border-red-500/50 transition-colors"
      >
        <LogOut className="w-4 h-4 text-red-500 group-hover:text-red-600 transition-colors" />
        <span className="text-red-500 group-hover:text-red-600 transition-colors">
          Logout
        </span>
      </Button>
    </motion.div>
    </div>
  );
};

export default LogoutButton;