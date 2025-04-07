
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const partners = [
  { name: "TechCorp" },
  { name: "AccessAbility" },
  { name: "EldersFirst" },
  { name: "InclusiTech" },
  { name: "CommunityPlus" },
  { name: "SupportNet" }
];

export default function PartnersSection() {
  return (
    <section className="section-container">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-secondary text-foreground/80 mb-6">
            Our Network
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Trusted by Leading Organizations
          </h2>
          <p className="text-muted-foreground text-lg">
            We collaborate with companies and nonprofits committed to creating an
            inclusive society and meaningful opportunities for all.
          </p>
        </motion.div>
      </div>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        {partners.map((partner, index) => (
          <div 
            key={index} 
            className="flex items-center justify-center h-24 rounded-lg bg-secondary/50 border border-border"
          >
            <span className="font-display font-bold text-foreground/80">{partner.name}</span>
          </div>
        ))}
      </motion.div>

      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-xl md:text-2xl font-bold mb-6">
          Become a Corporate Partner
        </h3>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join our network of corporate partners and make a meaningful impact
          through inclusive hiring practices and social responsibility.
        </p>
        <Button size="lg">
          Partner With Us
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </section>
  );
}
