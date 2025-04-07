
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    content: "YuktiiCare helped me find a job that accommodates my disability while valuing my skills. I feel empowered and independent for the first time in years.",
    author: "Sarah Johnson",
    role: "Software Developer",
    avatar: "SJ"
  },
  {
    content: "Finding accessible housing was always a challenge until I discovered YuktiiCare. Now I have a comfortable home with the support I need.",
    author: "Michael Chen",
    role: "Retired Teacher",
    avatar: "MC"
  },
  {
    content: "The community events organized by YuktiiCare have been life-changing. I've made new friends and no longer feel isolated in my journey.",
    author: "Emily Rodriguez",
    role: "Graphic Designer",
    avatar: "ER"
  },
  {
    content: "As a corporate partner, we've seen tremendous value in YuktiiCare's platform. It has helped us build a more diverse and inclusive workforce.",
    author: "David Williams",
    role: "HR Director, TechCorp",
    avatar: "DW"
  }
];

export default function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="section-container bg-secondary/40 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      </div>

      <div className="relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-background text-foreground/80 mb-6">
              Success Stories
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Hear from Our Community
            </h2>
            <p className="text-muted-foreground text-lg">
              Real stories from individuals and organizations whose lives have been
              transformed through our platform.
            </p>
          </motion.div>
        </div>

        <div ref={containerRef} className="relative">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="glass-card h-full border border-white/20 dark:border-white/5 overflow-hidden">
                  <CardContent className="pt-6">
                    <p className="text-foreground/90 mb-6 italic">"{testimonial.content}"</p>
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-4 border-2 border-primary/20">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {testimonial.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
