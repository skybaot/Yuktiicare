
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  FileText, 
  BookOpen, 
  Briefcase 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { useAppContext } from "@/context/AppContext";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useIsMobile } from "@/hooks/use-mobile";

const UserProfile = () => {
  // Sample user data - in a real app, this would come from your backend
  const mockUserData = {
    id: "usr_123456",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    phone: "+91 98765 43210",
    address: "123 Gandhi Road, Mumbai, Maharashtra",
    birthdate: "1990-05-15",
    avatar: "/placeholder.svg",
    bio: "I'm a software developer with a passion for accessibility and inclusive design. I have 5+ years of experience working with various technologies.",
    skills: ["Web Development", "Accessibility", "UI/UX Design", "JavaScript", "React"],
    education: [
      {
        degree: "Bachelor of Computer Applications",
        institution: "Mumbai University",
        year: "2010-2013"
      }
    ],
    employment: [
      {
        company: "TechSolutions India",
        position: "Frontend Developer",
        duration: "2018-Present"
      },
      {
        company: "Digital Creations",
        position: "Web Designer",
        duration: "2014-2018"
      }
    ],
    preferences: {
      jobTypes: ["Remote", "Hybrid", "Full-time"],
      locations: ["Mumbai", "Pune", "Bangalore"],
      industries: ["Technology", "Education", "Healthcare"]
    },
    accessibility: {
      needs: "Screen reader compatible environments, flexible work hours",
      accommodations: "Low-vision friendly interfaces"
    },
    joinDate: "2023-01-15",
    lastActive: "2023-06-10"
  };

  const { user, isAuthenticated } = useAppContext();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [userData, setUserData] = useState(mockUserData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to view your dashboard",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isAuthenticated, navigate]);

  // Get initials for avatar fallback
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className={`pt-${isMobile ? '20' : '28'} px-4`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-8">
            {/* Header with user info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row gap-6 items-start md:items-center"
            >
              <Avatar className="w-20 h-20 border-4 border-primary/20">
                <AvatarImage src={userData.avatar} alt={userData.name} />
                <AvatarFallback>{getInitials(userData.name)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold">{userData.name}</h1>
                <p className="text-muted-foreground flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4" /> {userData.email}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Button variant="outline" size="sm" className="gap-1">
                    <FileText className="w-4 h-4" /> Edit Profile
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Clock className="w-4 h-4" /> Activity Log
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 w-full md:w-auto mt-4 md:mt-0">
                <Button className="w-full md:w-auto">Update Profile</Button>
              </div>
            </motion.div>
            
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Personal Information */}
                    <Card className="md:col-span-2">
                      <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Your basic information and contact details</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-muted-foreground">Full Name</span>
                          <span className="font-medium">{userData.name}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-muted-foreground">Email Address</span>
                          <span className="font-medium">{userData.email}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-muted-foreground">Phone Number</span>
                          <span className="font-medium">{userData.phone}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-muted-foreground">Address</span>
                          <span className="font-medium">{userData.address}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-muted-foreground">Date of Birth</span>
                          <span className="font-medium">{new Date(userData.birthdate).toLocaleDateString('en-IN')}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm">Edit Information</Button>
                      </CardFooter>
                    </Card>
                    
                    {/* Account Overview */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Account Overview</CardTitle>
                        <CardDescription>Your account statistics and status</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Calendar className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Member Since</p>
                            <p className="font-medium">{new Date(userData.joinDate).toLocaleDateString('en-IN')}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Clock className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Last Active</p>
                            <p className="font-medium">{new Date(userData.lastActive).toLocaleDateString('en-IN')}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Briefcase className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Job Applications</p>
                            <p className="font-medium">5 Active</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Bio */}
                    <Card className="md:col-span-2">
                      <CardHeader>
                        <CardTitle>About Me</CardTitle>
                        <CardDescription>Professional summary and skills</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="font-medium">Bio</h4>
                          <p className="text-muted-foreground">{userData.bio}</p>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="font-medium">Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {userData.skills.map((skill, index) => (
                              <div key={index} className="bg-secondary text-foreground px-3 py-1 rounded-full text-sm">
                                {skill}
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm">Edit Bio</Button>
                      </CardFooter>
                    </Card>
                    
                    {/* Accessibility Needs */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Accessibility Needs</CardTitle>
                        <CardDescription>Your specified accessibility requirements</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="font-medium">Needs</h4>
                          <p className="text-muted-foreground">{userData.accessibility.needs}</p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium">Accommodations</h4>
                          <p className="text-muted-foreground">{userData.accessibility.accommodations}</p>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm">Update Needs</Button>
                      </CardFooter>
                    </Card>
                    
                    {/* Education and Employment */}
                    <Card className="md:col-span-3">
                      <CardHeader>
                        <CardTitle>Education & Employment</CardTitle>
                        <CardDescription>Your educational and professional background</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div>
                            <h3 className="font-semibold text-lg mb-4">Education</h3>
                            <div className="space-y-4">
                              {userData.education.map((edu, index) => (
                                <div key={index} className="border-l-2 border-primary/40 pl-4 py-1">
                                  <h4 className="font-medium">{edu.degree}</h4>
                                  <p className="text-muted-foreground">{edu.institution}</p>
                                  <p className="text-sm text-muted-foreground">{edu.year}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div>
                            <h3 className="font-semibold text-lg mb-4">Employment</h3>
                            <div className="space-y-4">
                              {userData.employment.map((job, index) => (
                                <div key={index} className="border-l-2 border-primary/40 pl-4 py-1">
                                  <h4 className="font-medium">{job.position}</h4>
                                  <p className="text-muted-foreground">{job.company}</p>
                                  <p className="text-sm text-muted-foreground">{job.duration}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Add Education</Button>
                          <Button variant="outline" size="sm">Add Employment</Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </div>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="preferences" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Job Preferences</CardTitle>
                        <CardDescription>Your preferred job types and industries</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="font-medium">Job Types</h4>
                          <div className="flex flex-wrap gap-2">
                            {userData.preferences.jobTypes.map((type, index) => (
                              <div key={index} className="bg-secondary text-foreground px-3 py-1 rounded-full text-sm">
                                {type}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="font-medium">Industries</h4>
                          <div className="flex flex-wrap gap-2">
                            {userData.preferences.industries.map((industry, index) => (
                              <div key={index} className="bg-secondary text-foreground px-3 py-1 rounded-full text-sm">
                                {industry}
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm">Edit Preferences</Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Location Preferences</CardTitle>
                        <CardDescription>Your preferred work locations</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="font-medium">Preferred Locations</h4>
                          <div className="flex flex-wrap gap-2">
                            {userData.preferences.locations.map((location, index) => (
                              <div key={index} className="bg-secondary text-foreground px-3 py-1 rounded-full text-sm">
                                {location}
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm">Edit Locations</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="applications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Job Applications</CardTitle>
                    <CardDescription>Track the status of your job applications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center py-6 text-muted-foreground">You currently have no active job applications.</p>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button onClick={() => navigate('/jobs')}>Browse Jobs</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account preferences and security</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Email Notifications</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label htmlFor="job-alerts" className="text-sm">Job Alerts</label>
                          <input type="checkbox" id="job-alerts" className="toggle" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <label htmlFor="app-updates" className="text-sm">Application Updates</label>
                          <input type="checkbox" id="app-updates" className="toggle" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <label htmlFor="newsletter" className="text-sm">Newsletter</label>
                          <input type="checkbox" id="newsletter" className="toggle" />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Security</h3>
                      <Button variant="outline" size="sm">Change Password</Button>
                      <Button variant="outline" size="sm">Enable Two-Factor Authentication</Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="font-medium text-destructive">Danger Zone</h3>
                      <Button variant="destructive" size="sm">Delete Account</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default UserProfile;
