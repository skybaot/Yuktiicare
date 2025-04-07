
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AuthForm from '@/components/auth/AuthForm';

export default function Auth() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container py-16 mt-16">
        <div className="max-w-md mx-auto">
          <AuthForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
