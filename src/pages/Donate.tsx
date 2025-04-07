
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { 
  CheckCircle, 
  Heart, 
  PiggyBank, 
  Receipt, 
  Users, 
  BriefcaseIcon, 
  HomeIcon, 
  CalendarIcon,
  Loader2
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { submitDonation, getRecentDonors, getDonationImpactStats, DonationFormData, RecentDonor } from "@/services/donationService";
import { useAppContext } from "@/context/AppContext";

export default function Donate() {
  const { isAuthenticated, user } = useAppContext();
  
  const [donationAmount, setDonationAmount] = useState<string>("25");
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [isMonthly, setIsMonthly] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [thankYouVisible, setThankYouVisible] = useState(false);
  const [recentDonors, setRecentDonors] = useState<RecentDonor[]>([]);
  const [impactStats, setImpactStats] = useState({
    jobsSecured: 0,
    housingPlacements: 0,
    eventsOrganized: 0,
    totalRaised: 0,
    goalAmount: 100000
  });
  const [loading, setLoading] = useState(true);

  // Load recent donors and impact stats
  useEffect(() => {
    const loadDonationData = async () => {
      setLoading(true);
      
      try {
        // Load user data if logged in
        if (isAuthenticated && user) {
          setDonorName(user.user_metadata?.full_name || '');
          setDonorEmail(user.email || '');
        }
        
        // Load recent donors
        const donors = await getRecentDonors();
        setRecentDonors(donors);
        
        // Load impact stats
        const stats = await getDonationImpactStats();
        setImpactStats(stats);
      } catch (error) {
        console.error('Error loading donation data:', error);
        toast({
          title: "Error",
          description: "Failed to load donation data. Please refresh the page.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadDonationData();
  }, [isAuthenticated, user]);

  const handleDonationSelect = (amount: string) => {
    setIsCustomAmount(amount === "custom");
    setDonationAmount(amount);
  };
  
  const handleDonationSubmit = async () => {
    setIsSubmitting(true);
    
    const formData: DonationFormData = {
      amount: donationAmount,
      custom_amount: isCustomAmount ? customAmount : undefined,
      donor_name: donorName,
      donor_email: donorEmail,
      is_monthly: isMonthly,
      message: message
    };
    
    try {
      const response = await submitDonation(formData);
      
      if (response.success) {
        setThankYouVisible(true);
        toast({
          title: "Donation successful!",
          description: response.message,
        });
        
        // Reset form
        setDonationAmount("25");
        setIsCustomAmount(false);
        setCustomAmount("");
        setMessage("");
        
        // Reload recent donors
        const donors = await getRecentDonors();
        setRecentDonors(donors);
        
        // Reload impact stats
        const stats = await getDonationImpactStats();
        setImpactStats(stats);
      } else {
        toast({
          title: "Donation failed",
          description: response.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error submitting donation:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24">
        <section className="section-container">
          <div className="max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                Make a Difference Today
              </h1>
              <p className="text-muted-foreground text-center mb-8">
                Your donation helps us create opportunities, provide support, and build 
                a more inclusive community for differently-abled individuals and the elderly.
              </p>
            </motion.div>
          </div>

          {thankYouVisible ? (
            <motion.div 
              className="max-w-2xl mx-auto text-center p-12 glass-panel border border-primary/20 rounded-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Thank You for Your Donation!</h2>
              <p className="text-muted-foreground mb-8">
                Your generous contribution will help us make a real difference in the lives of differently-abled individuals and the elderly.
              </p>
              <Button onClick={() => setThankYouVisible(false)}>Make Another Donation</Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="glass-panel border border-primary/10 rounded-xl overflow-hidden">
                  <div className="p-8">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Support Our Mission</h2>
                    <p className="text-muted-foreground mb-8">
                      Choose an amount to donate or enter a custom value. Every contribution
                      makes a real impact in our community.
                    </p>

                    <div className="space-y-6">
                      <div>
                        <div className="grid grid-cols-3 gap-3 mb-4">
                          {["10", "25", "50", "100", "250", "custom"].map((amount) => (
                            <Button 
                              key={amount} 
                              variant={donationAmount === amount ? "default" : "outline"}
                              className="w-full"
                              onClick={() => handleDonationSelect(amount)}
                            >
                              {amount === "custom" ? "Custom" : `$${amount}`}
                            </Button>
                          ))}
                        </div>
                        
                        {isCustomAmount && (
                          <div className="mt-4">
                            <label htmlFor="customAmount" className="block text-sm font-medium mb-1">
                              Custom Amount
                            </label>
                            <Input
                              id="customAmount"
                              type="number"
                              min="1"
                              placeholder="Enter amount"
                              value={customAmount}
                              onChange={(e) => setCustomAmount(e.target.value)}
                              className="bg-background"
                            />
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="monthlyDonation"
                            checked={isMonthly}
                            onChange={() => setIsMonthly(!isMonthly)}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <label htmlFor="monthlyDonation" className="ml-2 block text-sm">
                            Make this a monthly donation
                          </label>
                        </div>
                        <PiggyBank className="h-5 w-5 text-muted-foreground" />
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-1">
                            Your Name
                          </label>
                          <Input
                            id="name"
                            value={donorName}
                            onChange={(e) => setDonorName(e.target.value)}
                            placeholder="Enter your name"
                            className="bg-background"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-1">
                            Email Address
                          </label>
                          <Input
                            id="email"
                            type="email"
                            value={donorEmail}
                            onChange={(e) => setDonorEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="bg-background"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium mb-1">
                            Message (Optional)
                          </label>
                          <Textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Share why you're donating..."
                            className="bg-background resize-none"
                            rows={3}
                          />
                        </div>
                      </div>

                      <Button 
                        className="w-full" 
                        size="lg" 
                        onClick={handleDonationSubmit}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          'Donate Now'
                        )}
                      </Button>

                      <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                        <Receipt className="h-3 w-3" />
                        <span>You'll receive a tax-deductible receipt via email</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div>
                  <Tabs defaultValue="impact" className="w-full">
                    <TabsList className="grid w-full max-w-md grid-cols-2 mx-auto mb-8">
                      <TabsTrigger value="impact">Your Impact</TabsTrigger>
                      <TabsTrigger value="donors">Recent Donors</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="impact">
                      {loading ? (
                        <div className="flex items-center justify-center h-[400px]">
                          <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                      ) : (
                        <div className="glass-panel border border-border rounded-xl p-8">
                          <h3 className="text-xl font-bold mb-6">
                            Where Your Donation Goes
                          </h3>
                          
                          <div className="space-y-8 mb-8">
                            <div>
                              <div className="flex justify-between mb-2">
                                <span className="font-medium">Job Placement Program</span>
                                <span className="text-primary font-medium">40%</span>
                              </div>
                              <Progress value={40} className="h-2" />
                              <p className="text-sm text-muted-foreground mt-2">
                                Helping differently-abled individuals find meaningful employment
                              </p>
                            </div>
                            
                            <div>
                              <div className="flex justify-between mb-2">
                                <span className="font-medium">Housing Assistance</span>
                                <span className="text-primary font-medium">30%</span>
                              </div>
                              <Progress value={30} className="h-2" />
                              <p className="text-sm text-muted-foreground mt-2">
                                Supporting accessible and affordable housing solutions
                              </p>
                            </div>
                            
                            <div>
                              <div className="flex justify-between mb-2">
                                <span className="font-medium">Community Programs</span>
                                <span className="text-primary font-medium">20%</span>
                              </div>
                              <Progress value={20} className="h-2" />
                              <p className="text-sm text-muted-foreground mt-2">
                                Creating events and activities that foster inclusion
                              </p>
                            </div>
                            
                            <div>
                              <div className="flex justify-between mb-2">
                                <span className="font-medium">Technology & Operations</span>
                                <span className="text-primary font-medium">10%</span>
                              </div>
                              <Progress value={10} className="h-2" />
                              <p className="text-sm text-muted-foreground mt-2">
                                Maintaining our platform and services
                              </p>
                            </div>
                          </div>
                          
                          <div className="space-y-4 bg-secondary/50 rounded-lg p-4 border border-border">
                            <h4 className="font-medium">This Year's Impact</h4>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                  <BriefcaseIcon className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <p className="text-lg font-bold">{impactStats.jobsSecured}+</p>
                                  <p className="text-xs text-muted-foreground">Jobs Secured</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                  <HomeIcon className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <p className="text-lg font-bold">{impactStats.housingPlacements}+</p>
                                  <p className="text-xs text-muted-foreground">Housing Placements</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                  <CalendarIcon className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <p className="text-lg font-bold">{impactStats.eventsOrganized}+</p>
                                  <p className="text-xs text-muted-foreground">Events Organized</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                  <Users className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <p className="text-lg font-bold">${Math.floor(impactStats.totalRaised / 1000)}K</p>
                                  <p className="text-xs text-muted-foreground">of ${Math.floor(impactStats.goalAmount / 1000)}K Goal</p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-4">
                              <div className="flex justify-between mb-2 text-xs">
                                <span>Total Raised</span>
                                <span>${impactStats.totalRaised.toLocaleString()} of ${impactStats.goalAmount.toLocaleString()}</span>
                              </div>
                              <Progress value={(impactStats.totalRaised / impactStats.goalAmount) * 100} className="h-2" />
                            </div>
                          </div>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="donors">
                      {loading ? (
                        <div className="flex items-center justify-center h-[400px]">
                          <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                      ) : (
                        <div className="glass-panel border border-border rounded-xl p-8">
                          <h3 className="text-xl font-bold mb-6">
                            Donor Appreciation
                          </h3>
                          
                          <div className="space-y-6 mb-8">
                            {recentDonors.length > 0 ? (
                              recentDonors.map((donor, i) => (
                                <div key={i} className="p-4 bg-secondary/50 rounded-lg border border-border">
                                  <div className="flex justify-between items-start mb-2">
                                    <div>
                                      <div className="flex items-center">
                                        <CheckCircle className="h-4 w-4 text-primary mr-1" />
                                        <p className="font-medium">{donor.name}</p>
                                      </div>
                                      <p className="text-sm text-muted-foreground">
                                        {new Date(donor.timestamp).toLocaleDateString('en-IN', { 
                                          year: 'numeric', 
                                          month: 'short', 
                                          day: 'numeric',
                                          hour: '2-digit',
                                          minute: '2-digit'
                                        })}
                                      </p>
                                    </div>
                                    <p className="font-medium text-primary">{donor.amount}</p>
                                  </div>
                                  {donor.message && (
                                    <p className="text-sm italic mt-2 bg-background/50 p-2 rounded">
                                      "{donor.message}"
                                    </p>
                                  )}
                                </div>
                              ))
                            ) : (
                              <div className="text-center py-8">
                                <p className="text-muted-foreground">No donations yet. Be the first to donate!</p>
                              </div>
                            )}
                          </div>
                          
                          <div className="text-center">
                            <p className="text-muted-foreground mb-4">
                              Join our community of generous donors
                            </p>
                            <Button variant="outline" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                              Make a Donation
                            </Button>
                          </div>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
              </motion.div>
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
