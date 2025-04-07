
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Heart, Target, Clock, ArrowRight } from "lucide-react";

export default function Mission() {
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
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                Our Mission
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Empowering differently-abled and elderly individuals through inclusive opportunities for employment, housing, and community engagement.
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
              <p className="lead">
                Founded in 2018, YuktiiCare emerged from a recognition of the significant barriers that differently-abled and elderly individuals face in accessing employment, housing, and community support.
              </p>
              
              <h2>Our Vision</h2>
              <p>
                We envision a world where every person, regardless of ability or age, has equal access to opportunities that enable them to live with dignity, purpose, and connection to their community.
              </p>
              
              <h2>Our Core Values</h2>
              <ul>
                <li><strong>Inclusion:</strong> We believe in creating spaces and opportunities that welcome everyone.</li>
                <li><strong>Empowerment:</strong> We focus on building independence and self-determination.</li>
                <li><strong>Innovation:</strong> We continuously seek new solutions to long-standing challenges.</li>
                <li><strong>Dignity:</strong> We respect the inherent worth of every individual.</li>
                <li><strong>Community:</strong> We foster connections that create support networks.</li>
              </ul>
              
              <h2>Our Approach</h2>
              <p>
                YuktiiCare takes a holistic approach to support, recognizing that employment, housing, and community engagement are interconnected needs. We work directly with individuals, employers, housing providers, and communities to create sustainable, inclusive solutions.
              </p>
              
              <p>
                Through partnerships with businesses, government agencies, and other nonprofit organizations, we leverage collective resources to maximize our impact and reach more people in need.
              </p>
              
              <h2>Our Impact Goals</h2>
              <p>
                By 2025, we aim to:
              </p>
              <ul>
                <li>Secure meaningful employment for 1,000+ differently-abled individuals</li>
                <li>Provide accessible housing solutions for 500+ elderly and differently-abled people</li>
                <li>Host 200+ community events that foster connection and belonging</li>
                <li>Partner with 100+ companies to create more inclusive workplaces</li>
                <li>Advocate for policy changes that reduce systemic barriers</li>
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
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Our Purpose</h3>
              <p className="text-muted-foreground">
                To create a world where ability and age are not barriers to leading a fulfilling life.
              </p>
            </div>
            
            <div className="bg-background border border-border/50 rounded-xl p-6 hover:shadow-md transition-all hover:border-primary/20">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Our Focus</h3>
              <p className="text-muted-foreground">
                Building bridges between individuals with diverse needs and the resources they require to thrive.
              </p>
            </div>
            
            <div className="bg-background border border-border/50 rounded-xl p-6 hover:shadow-md transition-all hover:border-primary/20">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Our Commitment</h3>
              <p className="text-muted-foreground">
                Sustained, long-term support that evolves with the changing needs of the communities we serve.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Button size="lg" className="group">
              Join Our Mission <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
