
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Users, Code, Database, Brain, Server } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Yukti Vyas",
    role: "Founder & CEO",
    bio: "Visionary leader driving YuktiiCare's mission to create inclusive opportunities and support for differently-abled and elderly individuals.",
    image: "/images/team/yukti.jpg"
  },
  {
    id: 2,
    name: "Ujjwall Sharma",
    role: "Backend & Data Server Engineer",
    bio: "Expert in backend architecture and data server management, ensuring robust and scalable infrastructure for YuktiiCare's services.",
    image: "/images/team/ujjwall.jpg"
  },
  {
    id: 3,
    name: "Harshul Baluni",
    role: "Frontend Developer",
    bio: "Crafting intuitive and accessible user interfaces to provide seamless experiences for all YuktiiCare users.",
    image: "/images/team/harshul.jpg"
  },
  {
    id: 4,
    name: "Ayush Thakkar",
    role: "AI/ML Engineer",
    bio: "Leveraging artificial intelligence and machine learning to enhance YuktiiCare's services and create innovative solutions.",
    image: "/images/team/ayush.jpg"
  },
  {
    id: 5,
    name: "Khushboo",
    role: "Backend Developer",
    bio: "Developing robust backend solutions to power YuktiiCare's platform and ensure reliable service delivery.",
    image: "/images/team/khushboo.jpg"
  }
];

const volunteers = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Community Coordinator",
    bio: "Dedicated volunteer organizing community events and fostering connections between members.",
    image: "/images/team/volunteer-1.jpg"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Skills Trainer",
    bio: "Professional developer volunteering to teach coding skills to differently-abled individuals.",
    image: "/images/team/volunteer-2.jpg"
  },
  {
    id: 3,
    name: "Priya Patel",
    role: "Elder Care Specialist",
    bio: "Experienced caregiver providing support and companionship to elderly community members.",
    image: "/images/team/volunteer-3.jpg"
  }
];

export default function Team() {
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
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                Meet Our Team
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Meet the talented individuals behind YuktiiCare who are dedicated to creating innovative solutions for differently-abled and elderly individuals.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className="bg-background border border-border/50 rounded-xl overflow-hidden hover:shadow-md transition-all hover:border-primary/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Volunteer Section */}
          <div className="max-w-3xl mx-auto mt-24 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our Volunteers
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Meet our amazing volunteers who dedicate their time and expertise to support our community and mission.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {volunteers.map((volunteer, index) => (
              <motion.div
                key={volunteer.id}
                className="bg-background border border-border/50 rounded-xl overflow-hidden hover:shadow-md transition-all hover:border-primary/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img 
                    src={volunteer.image} 
                    alt={volunteer.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{volunteer.name}</h3>
                  <p className="text-primary font-medium mb-3">{volunteer.role}</p>
                  <p className="text-muted-foreground">{volunteer.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mt-16"
          >
            <p className="text-lg text-muted-foreground mb-8">
              Want to join our mission to create positive change? We're always looking for passionate individuals to join our team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group" asChild>
                <a href="mailto:careers@yuktiicare.com">
                  Join Our Team
                </a>
              </Button>
              <Button size="lg" variant="outline" className="group" asChild>
                <a href="/volunteer">
                  Become a Volunteer
                </a>
              </Button>
            </div>
          </motion.div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
