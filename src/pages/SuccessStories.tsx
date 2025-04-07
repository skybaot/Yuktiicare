
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Quote, Star, ArrowRight } from "lucide-react";
import { getSuccessStories, SuccessStory, submitSuccessStory } from "@/services/storyService";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

export default function SuccessStories() {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Form state
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [story, setStory] = useState("");
  const [program, setProgram] = useState("Employment");
  const [impact, setImpact] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const loadStories = async () => {
      setLoading(true);
      try {
        const fetchedStories = await getSuccessStories();
        setStories(fetchedStories);
      } catch (error) {
        console.error("Error loading stories:", error);
        toast({
          title: "Failed to load stories",
          description: "Please try refreshing the page",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadStories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!name || !age || !story || !program || !impact) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // For demo, we're using a placeholder image based on the program
      const programImages: {[key: string]: string} = {
        "Employment": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
        "Housing": "https://images.unsplash.com/photo-1581579438747-104c53d7fbc0",
        "Community": "https://images.unsplash.com/photo-1593761437894-31d440ae508f"
      };
      
      const success = await submitSuccessStory({
        name,
        age: parseInt(age),
        image: programImages[program] || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
        story,
        program,
        impact,
        submissionDate: new Date().toISOString()
      });
      
      if (success) {
        // Reset form
        setName("");
        setAge("");
        setStory("");
        setProgram("Employment");
        setImpact("");
        setDialogOpen(false);
      }
    } catch (error) {
      console.error("Error submitting story:", error);
    } finally {
      setIsSubmitting(false);
    }
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
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                Success Stories
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Meet the individuals who have transformed their lives through YuktiiCare's programs and support.
              </p>
            </motion.div>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading stories...</p>
              </div>
            ) : stories.length > 0 ? (
              stories.map((story, index) => (
                <motion.div
                  key={story.id}
                  className="mb-12 bg-background border border-border/50 rounded-xl overflow-hidden hover:shadow-md transition-all hover:border-primary/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <div className="h-full">
                        <img 
                          src={story.image} 
                          alt={story.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="md:w-2/3 p-6 md:p-8">
                      <div className="flex items-start mb-4">
                        <Quote className="h-8 w-8 text-primary mr-2 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-xl font-bold">{story.name}, {story.age}</h3>
                          <p className="text-primary font-medium">{story.program} Program</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-6">
                        "{story.story}"
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium">
                          {story.impact}
                        </span>
                        <Button variant="outline" size="sm">
                          Read Full Story
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12 border border-dashed border-border rounded-xl">
                <p className="text-muted-foreground">No stories available yet. Be the first to share your success story!</p>
              </div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="max-w-4xl mx-auto bg-secondary/30 p-8 rounded-xl border border-border text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Share Your Story</h2>
            <p className="text-muted-foreground mb-6">
              Have you benefited from YuktiiCare's programs? We'd love to hear how our services have made a difference in your life.
            </p>
            
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  Submit Your Story <ArrowRight className="ml-2" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Share Your Success Story</DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="age" className="block text-sm font-medium mb-1">Age</label>
                    <input
                      type="number"
                      id="age"
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      min="1"
                      max="120"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="program" className="block text-sm font-medium mb-1">Program</label>
                    <select
                      id="program"
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      value={program}
                      onChange={(e) => setProgram(e.target.value)}
                      required
                    >
                      <option value="Employment">Employment</option>
                      <option value="Housing">Housing</option>
                      <option value="Community">Community</option>
                      <option value="Education">Education</option>
                      <option value="Healthcare">Healthcare</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="impact" className="block text-sm font-medium mb-1">Impact (brief description)</label>
                    <input
                      type="text"
                      id="impact"
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      value={impact}
                      onChange={(e) => setImpact(e.target.value)}
                      placeholder="e.g., Found employment, Improved independence"
                      maxLength={50}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="story" className="block text-sm font-medium mb-1">Your Story</label>
                    <textarea
                      id="story"
                      className="w-full px-3 py-2 border border-border rounded-md bg-background min-h-[150px]"
                      value={story}
                      onChange={(e) => setStory(e.target.value)}
                      placeholder="Share how YuktiiCare's services have made a difference in your life..."
                      maxLength={500}
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">Maximum 500 characters</p>
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-2">
                    <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Story"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </motion.div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
