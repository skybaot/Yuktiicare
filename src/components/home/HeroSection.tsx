
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Users, Home } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-background/80" />
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/20 via-background to-background" />
        </motion.div>
      </div>

      <div className="section-container relative z-10 pb-0 md:min-h-[85vh] flex flex-col justify-center">
        <div className="max-w-3xl mx-auto text-center mb-6 md:mb-12 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-accent text-accent-foreground mb-4 md:mb-6">
              Changing Perspectives, Creating Impact
            </span>
          </motion.div>

          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Redefining Abilities,
            <span className="block text-foreground">Embracing Potential</span>
          </motion.h1>

          <motion.p
            className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8 px-2 md:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            YuktiiCare is more than just a platform — it's a place where every person is accepted for who they are.
            We create safe spaces where voices are heard, stories are shared, and hearts are connected — because
            everyone deserves a life filled with dignity and love.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <Button size={isMobile ? "default" : "lg"} className="font-medium group" asChild>
              <Link to="/community">
                Join Our Community
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size={isMobile ? "default" : "lg"} variant="outline" className="font-medium" asChild>
              <Link to="/support">Learn How to Help</Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto max-w-5xl w-full mt-6 md:mt-8 px-4 md:px-0"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="aspect-[4/3] overflow-hidden rounded-xl glass-panel border border-primary/10 shadow-lg">
              <img 
                src="/images/community-1.jpg" 
                alt="Community Support"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-4">
                <div className="text-white">
                  <Heart className="h-6 w-6 mb-2 text-accent" />
                  <h3 className="font-medium">Supportive Community</h3>
                </div>
              </div>
            </div>
            
            <div className="aspect-[4/3] overflow-hidden rounded-xl glass-panel border border-primary/10 shadow-lg">
              <img 
                src="/images/community-2.jpg" 
                alt="Job Opportunities"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-4">
                <div className="text-white">
                  <Users className="h-6 w-6 mb-2 text-accent" />
                  <h3 className="font-medium">Inclusive Workplace</h3>
                </div>
              </div>
            </div>
            
            <div className="aspect-[4/3] overflow-hidden rounded-xl glass-panel border border-primary/10 shadow-lg">
              <img 
                src="/images/community-3.jpg" 
                alt="Housing Solutions"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-4">
                <div className="text-white">
                  <Home className="h-6 w-6 mb-2 text-accent" />
                  <h3 className="font-medium">Accessible Housing</h3>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </div>
    </section>
  );
}
