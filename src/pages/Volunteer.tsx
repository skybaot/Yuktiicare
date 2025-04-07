import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { HandHeart, Clock, Users, Target, ArrowRight, CheckCircle } from "lucide-react";

export default function Volunteer() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24">
        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
                <HandHeart className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                Volunteer With Us
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Make a meaningful impact in your community by volunteering with YuktiiCare. Your time and skills can help create a more inclusive world for differently-abled and elderly individuals.
              </p>
            </motion.div>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="prose prose-lg dark:prose-invert mx-auto"
            >
              <h2>Why Volunteer?</h2>
              <p>
                Volunteering with YuktiiCare offers a unique opportunity to make a direct impact in the lives of differently-abled and elderly individuals while developing valuable skills and connections within your community.
              </p>
              
              <h2>Volunteer Opportunities</h2>
              <ul>
                <li><strong>Community Support:</strong> Help organize and facilitate community events and activities.</li>
                <li><strong>Skills Training:</strong> Share your professional expertise to help others develop job-ready skills.</li>
                <li><strong>Companionship:</strong> Provide social support and friendship to elderly individuals.</li>
                <li><strong>Administrative Support:</strong> Assist with office tasks and program coordination.</li>
                <li><strong>Transportation:</strong> Help community members access essential services and activities.</li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            <div className="bg-background border border-border/50 rounded-xl p-6 hover:shadow-md transition-all hover:border-primary/20">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Flexible Schedule</h3>
              <p className="text-muted-foreground">
                Choose volunteer opportunities that fit your availability and interests.
              </p>
            </div>
            
            <div className="bg-background border border-border/50 rounded-xl p-6 hover:shadow-md transition-all hover:border-primary/20">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Build Community</h3>
              <p className="text-muted-foreground">
                Connect with like-minded individuals and create lasting relationships.
              </p>
            </div>
            
            <div className="bg-background border border-border/50 rounded-xl p-6 hover:shadow-md transition-all hover:border-primary/20">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Make an Impact</h3>
              <p className="text-muted-foreground">
                See the direct results of your contributions in people's lives.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="max-w-4xl mx-auto bg-secondary/30 p-8 rounded-xl border border-border text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-muted-foreground mb-6">
              Join our community of volunteers and help create positive change in the lives of others.
            </p>
            <Button size="lg" className="group">
              Apply to Volunteer <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}