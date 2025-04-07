import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { HandHeart, Users, Building, ArrowRight } from "lucide-react";

export default function SupportSection() {
  return (
    <section className="section-container bg-gradient-to-b from-background to-secondary/20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-accent text-accent-foreground mb-6">
            Join Our Community
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
            Together We Create Lasting Impact
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            YuktiiCare thrives on kindness and community. Your support can help us grow faster, reach more lives, 
            and create better systems. Whether it's through donations, partnerships, or volunteering — every bit 
            of help brings us closer to a more inclusive world.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-accent-foreground">Community Support</h3>
              <p className="text-muted-foreground">Connect with others who share your vision for an inclusive society</p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Building className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-accent-foreground">Resource Access</h3>
              <p className="text-muted-foreground">Get access to valuable resources and support services</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="group">
              Be a Kindness Hero
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="aspect-square rounded-2xl overflow-hidden">
            <img 
              src="/images/community-support.jpg" 
              alt="Community Support"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>

          <motion.div
            className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl border border-border shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <HandHeart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-accent-foreground">Join 5000+ Supporters</h4>
                <p className="text-sm text-muted-foreground">Making a difference together</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
