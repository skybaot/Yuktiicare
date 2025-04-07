
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { Handshake, Building, Briefcase, Users, ArrowRight, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function Partner() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    organizationName: "",
    contactName: "",
    email: "",
    phone: "",
    organizationType: "",
    partnershipType: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Partnership request submitted!",
        description: "We'll be in touch with you shortly to discuss next steps.",
        variant: "default",
      });
      
      // Reset form
      setFormData({
        organizationName: "",
        contactName: "",
        email: "",
        phone: "",
        organizationType: "",
        partnershipType: "",
        message: ""
      });
    }, 1500);
  };

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
                <Handshake className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                Partner With Us
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join us in creating inclusive opportunities for differently-abled and elderly individuals through meaningful partnerships.
              </p>
            </motion.div>
          </div>

          <div className="max-w-6xl mx-auto mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="bg-background border border-border/50 rounded-xl p-6 hover:shadow-md transition-all hover:border-primary/20"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Corporate Partners</h3>
                <p className="text-muted-foreground mb-4">
                  Create inclusive hiring practices and fulfill your CSR objectives while making a meaningful impact.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Access to diverse talent pool</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Workplace inclusion training</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>CSR impact reporting</span>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-background border border-border/50 rounded-xl p-6 hover:shadow-md transition-all hover:border-primary/20"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Employment Partners</h3>
                <p className="text-muted-foreground mb-4">
                  Connect with qualified candidates and create inclusive workplaces with our specialized support.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Candidate matching service</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Accommodation guidance</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Ongoing support for employees</span>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-background border border-border/50 rounded-xl p-6 hover:shadow-md transition-all hover:border-primary/20"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Community Partners</h3>
                <p className="text-muted-foreground mb-4">
                  Join our network of organizations collaborating to create inclusive communities and expand resources.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Resource sharing opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Joint event programming</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Collaborative grant opportunities</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="max-w-3xl mx-auto bg-background border border-border/50 rounded-xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Become a Partner</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="organizationName" className="text-sm font-medium">
                    Organization Name
                  </label>
                  <Input
                    id="organizationName"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleInputChange}
                    placeholder="Your organization name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="contactName" className="text-sm font-medium">
                    Contact Name
                  </label>
                  <Input
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(123) 456-7890"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="organizationType" className="text-sm font-medium">
                    Organization Type
                  </label>
                  <Select
                    value={formData.organizationType}
                    onValueChange={(value) => handleSelectChange("organizationType", value)}
                  >
                    <SelectTrigger id="organizationType">
                      <SelectValue placeholder="Select organization type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="corporation">Corporation</SelectItem>
                      <SelectItem value="nonprofit">Nonprofit</SelectItem>
                      <SelectItem value="government">Government Agency</SelectItem>
                      <SelectItem value="educational">Educational Institution</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="partnershipType" className="text-sm font-medium">
                    Partnership Interest
                  </label>
                  <Select
                    value={formData.partnershipType}
                    onValueChange={(value) => handleSelectChange("partnershipType", value)}
                  >
                    <SelectTrigger id="partnershipType">
                      <SelectValue placeholder="Select partnership type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employment">Employment Partner</SelectItem>
                      <SelectItem value="housing">Housing Partner</SelectItem>
                      <SelectItem value="financial">Financial Supporter</SelectItem>
                      <SelectItem value="service">Service Provider</SelectItem>
                      <SelectItem value="community">Community Partner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  How would you like to partner with us?
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your partnership goals and how you'd like to work with YuktiiCare."
                  rows={4}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Partnership Request"}
                <ArrowRight className="ml-2" />
              </Button>
            </form>
          </motion.div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
