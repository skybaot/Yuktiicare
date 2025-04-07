
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Home, Lightbulb, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef, useState } from "react";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import DonationSection from "@/components/home/DonationSection";
import PartnersSection from "@/components/home/PartnersSection";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className={`pt-${isMobile ? '16' : '24'}`}>
        <HeroSection />
        
        {/* Mission Section */}
        <section className="section-container bg-gradient-to-b from-background to-secondary/20">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-8">
                We're dedicated to creating an inclusive world where every individual, regardless of ability or age,
                can live with dignity, purpose, and connection to their community.
              </p>
              <Button size="lg" className="group" asChild>
                <Link to="/mission">
                  See the Magic We're Making
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        <FeaturesSection />
        <TestimonialsSection />
        
        {/* Elder Care Section */}
        <section className="section-container bg-gradient-to-b from-background to-secondary/20">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Volunteer With Us</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join our community of dedicated volunteers who make a real difference in the lives of
                differently-abled and elderly individuals. Share your time, skills, and compassion.
              </p>
              <Button size="lg" className="group" asChild>
                <Link to="/volunteer">
                  Find Your People
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        <DonationSection />
        <PartnersSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
