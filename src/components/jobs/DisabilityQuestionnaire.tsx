import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { FileText, Heart, Shield, Upload, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function DisabilityQuestionnaire() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    disabilityType: "",
    disabilityBackground: "",
    accommodationsNeeded: "",
    hasResume: null,
    resume: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, resume: e.target.files![0] }));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Here you would integrate with your backend service
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated API call
      
      toast({
        title: "Profile submitted successfully",
        description: "Our team will review your information and help match you with suitable opportunities."
      });
      
      // Reset form
      setFormData({
        disabilityType: "",
        disabilityBackground: "",
        accommodationsNeeded: "",
        hasResume: null,
        resume: null
      });
      setStep(1);
    } catch (error) {
      toast({
        title: "Error submitting profile",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-card border border-border/50 rounded-xl p-6 shadow-lg">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Your Journey Matters to Us</h2>
          <p className="text-muted-foreground">
            We're here to understand your unique situation and help you find the perfect opportunity.
            This is a safe space - share your story with us.
          </p>
        </div>

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium mb-2">
                What type of disability do you have?
              </label>
              <Input
                value={formData.disabilityType}
                onChange={(e) => handleInputChange("disabilityType", e.target.value)}
                placeholder="e.g., Physical disability, Visual impairment"
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Would you like to share how it occurred? (Optional)
              </label>
              <Textarea
                value={formData.disabilityBackground}
                onChange={(e) => handleInputChange("disabilityBackground", e.target.value)}
                placeholder="Your story helps us understand how to better support you"
                className="w-full min-h-[100px]"
              />
            </div>
            
            <div className="flex justify-end">
              <Button onClick={() => setStep(2)}>
                Next Step <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium mb-2">
                What accommodations or support would help you succeed in the workplace?
              </label>
              <Textarea
                value={formData.accommodationsNeeded}
                onChange={(e) => handleInputChange("accommodationsNeeded", e.target.value)}
                placeholder="e.g., Wheelchair accessibility, Flexible hours, Screen reader support"
                className="w-full min-h-[100px]"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Do you have a resume ready?
              </label>
              <div className="flex gap-4">
                <Button
                  variant={formData.hasResume === true ? "default" : "outline"}
                  onClick={() => setFormData(prev => ({ ...prev, hasResume: true }))}
                >
                  Yes, I have a resume
                </Button>
                <Button
                  variant={formData.hasResume === false ? "default" : "outline"}
                  onClick={() => setFormData(prev => ({ ...prev, hasResume: false }))}
                >
                  No, I need help
                </Button>
              </div>
            </div>

            {formData.hasResume === true && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Upload your resume
                </label>
                <div className="flex items-center gap-4">
                  <Input
                    type="file"
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx"
                    className="w-full"
                  />
                </div>
              </div>
            )}

            {formData.hasResume === false && (
              <div className="bg-secondary/30 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Don't worry! Our team will help you create a professional resume. 
                  We'll schedule a session to gather your experience and skills.
                </p>
              </div>
            )}
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Previous Step
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>Submit Profile</>
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}