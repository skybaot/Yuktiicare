
import { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Heart, HelpingHand, UserPlus, Users, Send, Calendar, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { MatchProfile, MatchPreference } from "@/types";
import { findMatches, saveUserProfile } from "@/services/matchmakingService";

export default function Matchmaking() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("about");
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("female");
  const [location, setLocation] = useState("");
  const [about, setAbout] = useState("");
  const [interests, setInterests] = useState("");
  const [lookingFor, setLookingFor] = useState<string[]>([]);
  const [minAge, setMinAge] = useState("21");
  const [maxAge, setMaxAge] = useState("45");
  const [genderPreference, setGenderPreference] = useState("any");

  const handleLookingForChange = (type: string) => (checked: boolean) => {
    if (checked) {
      setLookingFor(prev => [...prev, type]);
    } else {
      setLookingFor(prev => prev.filter(item => item !== type));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Prepare profile data
      const profileData: Partial<MatchProfile> = {
        name,
        age: parseInt(age),
        gender,
        location,
        about,
        lookingFor,
        interests: interests.split(',').map(i => i.trim()).filter(Boolean)
      };
      
      // Save profile
      await saveUserProfile(profileData, "current-user-id");
      
      toast({
        title: "Profile submitted",
        description: "Your matrimony profile has been created. We'll start connecting you with potential matches.",
      });
      setFormSubmitted(true);
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: "Error",
        description: "Failed to save your profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24">
        <section className="section-container">
          <div className="max-w-4xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <span className="inline-block p-2 bg-primary/10 rounded-full mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </span>
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                Find Your Perfect Match
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Welcome to a safe space where genuine connections flourish. Here, you can be yourself and find someone who shares your values, interests, and dreams for the future.
              </p>
            </motion.div>
          </div>

          <Tabs defaultValue="about" className="max-w-4xl mx-auto" value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="about">About the Service</TabsTrigger>
              <TabsTrigger value="create">Create Profile</TabsTrigger>
              <TabsTrigger value="success">Success Stories</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about">
              <div className="grid md:grid-cols-2 gap-10">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <HelpingHand className="h-5 w-5 mr-2 text-primary" />
                      How It Works
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-primary/10 text-primary rounded-full h-8 w-8 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">1</div>
                      <div>
                        <h3 className="font-medium">Express Yourself</h3>
                        <p className="text-muted-foreground">Share your story, passions, and what makes you unique. Let your personality shine through.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-primary/10 text-primary rounded-full h-8 w-8 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">2</div>
                      <div>
                        <h3 className="font-medium">Meaningful Connections</h3>
                        <p className="text-muted-foreground">Connect with people who share your interests, values, and vision for the future.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-primary/10 text-primary rounded-full h-8 w-8 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">3</div>
                      <div>
                        <h3 className="font-medium">Get to Know Each Other</h3>
                        <p className="text-muted-foreground">Take your time to build a genuine connection through our secure messaging platform.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-primary/10 text-primary rounded-full h-8 w-8 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">4</div>
                      <div>
                        <h3 className="font-medium">Community Support</h3>
                        <p className="text-muted-foreground">Access resources and guidance to help you navigate your journey to finding love.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Check className="h-5 w-5 mr-2 text-primary" />
                      Why Choose Our Service
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-medium flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        Genuine Connections
                      </h3>
                      <p className="text-muted-foreground">Our platform focuses on creating meaningful relationships based on shared values and interests.</p>
                    </div>
                    <div>
                      <h3 className="font-medium flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        Inclusive Community
                      </h3>
                      <p className="text-muted-foreground">Connect with people who share your vision for life and understand your journey.</p>
                    </div>
                    <div>
                      <h3 className="font-medium flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        Safety First
                      </h3>
                      <p className="text-muted-foreground">All profiles are verified and we provide guidelines for safe meeting arrangements.</p>
                    </div>
                    <div>
                      <h3 className="font-medium flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        Privacy Protected
                      </h3>
                      <p className="text-muted-foreground">Your personal information is kept secure and only shared with your explicit permission.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-12 text-center">
                <Button size="lg" onClick={() => setActiveTab("create")}>
                  <UserPlus className="h-5 w-5 mr-2" />
                  Create Your Profile
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="create">
              {formSubmitted ? (
                <motion.div 
                  className="text-center p-10 bg-secondary/30 rounded-xl border border-border"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="inline-flex items-center justify-center p-2 bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-100 rounded-full mb-4">
                    <Check className="h-8 w-8" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Profile Created Successfully!</h2>
                  <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                    Thank you for creating your profile. Our matching system is now working to find compatible life partners for you.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button variant="outline">
                      <Users className="h-4 w-4 mr-2" />
                      Browse Profiles
                    </Button>
                    <Button>
                      <Calendar className="h-4 w-4 mr-2" />
                      Upcoming Events
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>
                        Tell us about yourself so we can find the best match for you.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input 
                            id="name" 
                            placeholder="Your full name" 
                            required 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="age">Age</Label>
                          <Input 
                            id="age" 
                            type="number" 
                            min="18" 
                            max="75" 
                            placeholder="Your age" 
                            required
                            value={age}
                            onChange={(e) => setAge(e.target.value)} 
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Gender</Label>
                        <RadioGroup 
                          value={gender} 
                          onValueChange={setGender} 
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female">Female</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male">Male</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="other" id="other" />
                            <Label htmlFor="other">Other</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="location">City & State</Label>
                        <Input 
                          id="location" 
                          placeholder="e.g., Mumbai, Maharashtra" 
                          required
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="about">About Me</Label>
                        <Textarea 
                          id="about" 
                          placeholder="Share a little about yourself, your interests, values, and what you enjoy doing." 
                          className="min-h-[120px]"
                          required
                          value={about}
                          onChange={(e) => setAbout(e.target.value)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Matching Preferences</CardTitle>
                      <CardDescription>
                        Let us know what you're looking for in a life partner.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label>I'm looking for (select all that apply)</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
                          <div className="flex items-center space-x-2">
                            <Switch 
                              id="friendship" 
                              checked={lookingFor.includes("friendship")}
                              onCheckedChange={handleLookingForChange("friendship")}
                            />
                            <Label htmlFor="friendship">Friendship</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch 
                              id="companionship" 
                              checked={lookingFor.includes("companionship")}
                              onCheckedChange={handleLookingForChange("companionship")}
                            />
                            <Label htmlFor="companionship">Companionship</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch 
                              id="marriage" 
                              checked={lookingFor.includes("marriage")}
                              onCheckedChange={handleLookingForChange("marriage")}
                            />
                            <Label htmlFor="marriage">Marriage</Label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Age Range Preference</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="min-age" className="text-xs text-muted-foreground">Minimum</Label>
                            <Input 
                              id="min-age" 
                              type="number" 
                              min="18" 
                              max="70" 
                              placeholder="Min age" 
                              value={minAge}
                              onChange={(e) => setMinAge(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="max-age" className="text-xs text-muted-foreground">Maximum</Label>
                            <Input 
                              id="max-age" 
                              type="number" 
                              min="18" 
                              max="75" 
                              placeholder="Max age" 
                              value={maxAge}
                              onChange={(e) => setMaxAge(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Gender Preference</Label>
                        <RadioGroup 
                          value={genderPreference} 
                          onValueChange={setGenderPreference} 
                          className="flex flex-wrap gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="pref-female" />
                            <Label htmlFor="pref-female">Female</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="pref-male" />
                            <Label htmlFor="pref-male">Male</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="other" id="pref-other" />
                            <Label htmlFor="pref-other">Other</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="any" id="pref-any" />
                            <Label htmlFor="pref-any">Any</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="interests">Interests & Hobbies (comma separated)</Label>
                        <Input 
                          id="interests" 
                          placeholder="e.g., Reading, Music, Travel, Cooking, Spirituality"
                          value={interests}
                          onChange={(e) => setInterests(e.target.value)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="flex justify-end">
                    <Button type="submit" size="lg" className="px-8" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Creating Profile...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Create Profile
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </TabsContent>
            
            <TabsContent value="success">
              <div className="space-y-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/4">
                        <img 
                          src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2000&auto=format&fit=crop" 
                          alt="Priya and Rahul" 
                          className="rounded-lg w-full h-40 object-cover"
                        />
                      </div>
                      <div className="md:w-3/4">
                        <div className="flex items-center mb-2">
                          <Heart className="h-5 w-5 text-red-500 mr-2" fill="currentColor" />
                          <h3 className="text-xl font-bold">Priya & Rahul</h3>
                        </div>
                        <p className="text-muted-foreground mb-4">
                          "With my hearing impairment, I found it difficult to meet someone through traditional channels. YuktiiCare's matrimony platform connected me with Rahul, who understands me perfectly. We've been married for over a year now and couldn't be happier!"
                        </p>
                        <p className="text-sm text-muted-foreground italic">- Priya, 28, Mumbai</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/4">
                        <img 
                          src="https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2000&auto=format&fit=crop" 
                          alt="Vikram and Meera" 
                          className="rounded-lg w-full h-40 object-cover"
                        />
                      </div>
                      <div className="md:w-3/4">
                        <div className="flex items-center mb-2">
                          <Heart className="h-5 w-5 text-red-500 mr-2" fill="currentColor" />
                          <h3 className="text-xl font-bold">Vikram & Meera</h3>
                        </div>
                        <p className="text-muted-foreground mb-4">
                          "After my accident left me with mobility challenges, I thought marriage wasn't in my future. Through YuktiiCare, I met Meera who sees beyond my wheelchair. Our families connected well, and we had a beautiful wedding in Chennai last month."
                        </p>
                        <p className="text-sm text-muted-foreground italic">- Vikram, 34, Chennai</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/4">
                        <img 
                          src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=2000&auto=format&fit=crop" 
                          alt="Anjali and Deepak" 
                          className="rounded-lg w-full h-40 object-cover"
                        />
                      </div>
                      <div className="md:w-3/4">
                        <div className="flex items-center mb-2">
                          <Heart className="h-5 w-5 text-red-500 mr-2" fill="currentColor" />
                          <h3 className="text-xl font-bold">Anjali & Deepak</h3>
                        </div>
                        <p className="text-muted-foreground mb-4">
                          "Living with visual impairment, I was hesitant about marriage websites. YuktiiCare's inclusive platform made it easy to connect with Deepak, who values me for who I am. We're now planning our wedding for next Diwali!"
                        </p>
                        <p className="text-sm text-muted-foreground italic">- Anjali, 27, Bangalore</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-12 text-center">
                <p className="text-muted-foreground mb-6">Ready to write your own success story?</p>
                <Button size="lg" onClick={() => setActiveTab("create")}>
                  <UserPlus className="h-5 w-5 mr-2" />
                  Create Your Profile
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
