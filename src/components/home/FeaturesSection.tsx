
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Briefcase, Home, Calendar, Heart, Users, Zap } from "lucide-react";

const features = [
  {
    icon: <Briefcase className="h-6 w-6 text-primary" />,
    title: "Job Portal",
    description: "Find inclusive employment opportunities specifically designed for differently-abled individuals.",
    image: "/images/features/job-portal.jpg"
  },
  {
    icon: <Home className="h-6 w-6 text-primary" />,
    title: "Housing Solutions",
    description: "Connect with accessible housing options and community living arrangements for elderly and differently-abled.",
    image: "/images/features/housing.jpg"
  },
  {
    icon: <Calendar className="h-6 w-6 text-primary" />,
    title: "Community Events",
    description: "Participate in events, workshops, and activities designed to foster inclusion and belonging.",
    image: "/images/features/events.jpg"
  },
  {
    icon: <Heart className="h-6 w-6 text-primary" />,
    title: "Support Network",
    description: "Access resources, mentorship, and a community of supporters to help navigate challenges.",
    image: "/images/features/support.jpg"
  },
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    title: "Corporate Partnerships",
    description: "Companies can engage in meaningful CSR initiatives and support diversity in the workplace.",
    image: "/images/features/corporate.jpg"
  },
  {
    icon: <Zap className="h-6 w-6 text-primary" />,
    title: "AI-Powered Matching",
    description: "Our advanced technology connects individuals with the perfect opportunities based on their needs.",
    image: "/images/features/ai-matching.jpg"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function FeaturesSection() {
  return (
    <section className="section-container" id="features">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-secondary text-foreground/80 mb-6">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Comprehensive Support for Every Need
          </h2>
          <p className="text-muted-foreground text-lg">
            We provide a holistic approach to community support, offering services
            designed to empower differently-abled individuals and the elderly.
          </p>
        </motion.div>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {features.map((feature, index) => (
          <motion.div key={index} variants={item}>
            <Card className="glass-card h-full border border-border/50 hover:border-primary/20 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              </div>
              <CardHeader className="pb-2 relative">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
