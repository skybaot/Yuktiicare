import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Briefcase, Building, Clock, MapPin, Search, BadgeCheck, HeartHandshake, Loader2, ExternalLink, ShieldCheck } from "lucide-react";
import DisabilityQuestionnaire from "@/components/jobs/DisabilityQuestionnaire";
import { motion } from "framer-motion";
import { Job, JobFilter } from "@/types";
import { fetchJobs, applyForJob, trackJobApplication } from "@/services/jobService";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import JobScraperStatus from "@/components/jobs/JobScraperStatus";
import { useAppContext } from "@/context/AppContext";

export default function Jobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobType, setJobType] = useState("");
  const [accessibility, setAccessibility] = useState("");
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isApplying, setIsApplying] = useState<string | null>(null);
  const jobsPerPage = 3;
  const navigate = useNavigate();
  const { isAuthenticated } = useAppContext();

  const loadJobs = async (page: number, filters?: JobFilter) => {
    setIsLoading(true);
    try {
      const result = await fetchJobs(page, jobsPerPage, filters);
      setJobs(result.jobs);
      setTotalPages(result.totalPages);
      setTotalItems(result.totalItems);
    } catch (error) {
      console.error("Error loading jobs:", error);
      toast({
        title: "Failed to load jobs",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadJobs(1);
  }, []);

  const handleSearch = () => {
    const filters: JobFilter = {};
    
    if (searchTerm) {
      filters.keyword = searchTerm;
    }
    
    if (jobType) {
      filters.type = jobType;
    }
    
    if (accessibility) {
      filters.accessibility = [accessibility];
    }
    
    setCurrentPage(1);
    loadJobs(1, filters);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    
    const filters: JobFilter = {};
    if (searchTerm) filters.keyword = searchTerm;
    if (jobType) filters.type = jobType;
    if (accessibility) filters.accessibility = [accessibility];
    
    loadJobs(page, filters);
  };

  const toggleJobExpand = (id: string) => {
    setExpandedJob(expandedJob === id ? null : id);
  };

  const handleApply = async (jobId: string) => {
    setIsApplying(jobId);
    try {
      const applicationUrl = await applyForJob(jobId);
      
      await trackJobApplication(jobId);
      
      window.open(applicationUrl, '_blank');
      
      toast({
        title: "Redirecting to employer website",
        description: "You'll now be able to complete your application"
      });
    } catch (error) {
      console.error("Error applying for job:", error);
      toast({
        title: "Application error",
        description: "There was a problem processing your application",
        variant: "destructive"
      });
    } finally {
      setIsApplying(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      return `${Math.floor(diffDays / 7)} weeks ago`;
    } else {
      return `${Math.floor(diffDays / 30)} months ago`;
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
                Find Inclusive Jobs in India
              </h1>
              <p className="text-muted-foreground text-center mb-8">
                Browse jobs that value diversity and provide accommodations for differently-abled individuals across India.
              </p>
            </motion.div>

            {isAuthenticated && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                <JobScraperStatus />
              </motion.div>
            )}

            <motion.div
              className="bg-secondary/30 p-6 rounded-xl border border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search job titles or companies" 
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={jobType} onValueChange={setJobType}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={accessibility} onValueChange={setAccessibility}>
                  <SelectTrigger className="w-full md:w-[220px]">
                    <SelectValue placeholder="Accessibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Wheelchair">Wheelchair Accessible</SelectItem>
                    <SelectItem value="Screen Reader">Screen Reader Compatible</SelectItem>
                    <SelectItem value="Sign language">Sign Language Support</SelectItem>
                    <SelectItem value="Flexible">Flexible Hours</SelectItem>
                    <SelectItem value="Remote">Remote Work</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-between items-center">
                <Button onClick={handleSearch} disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Search className="h-4 w-4 mr-2" />}
                  Find Jobs
                </Button>
                <p className="text-muted-foreground">
                  {totalItems} jobs found
                </p>
              </div>
            </motion.div>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : jobs.length > 0 ? (
              jobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  className="glass-card border border-border/50 hover:border-primary/20 p-6 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1 flex items-center">
                        {job.title}
                        {new Date(job.postedDate).getTime() > Date.now() - 24 * 60 * 60 * 1000 && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                            <BadgeCheck className="w-3 h-3 mr-1" /> New
                          </span>
                        )}
                      </h3>
                      <div className="flex items-center text-muted-foreground flex-wrap">
                        <Building className="h-4 w-4 mr-1" />
                        <span className="mr-4">{job.company}</span>
                        <MapPin className="h-4 w-4 mr-1 ml-0 sm:ml-2" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <span className="inline-block bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium">
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                      <p className="text-md font-medium">{job.salary}</p>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Posted {formatDate(job.postedDate)}</span>
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
                      {job.accessibility.slice(0, 2).map((item, idx) => (
                        <span 
                          key={idx} 
                          className="inline-block bg-secondary/80 rounded-full px-3 py-1 text-xs"
                        >
                          {item}
                        </span>
                      ))}
                      {job.accessibility.length > 2 && (
                        <span className="inline-block bg-secondary/80 rounded-full px-3 py-1 text-xs">
                          +{job.accessibility.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    {expandedJob === job.id ? (
                      <div className="animate-fadeIn space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Job Description</h4>
                          <p className="text-muted-foreground">{job.description}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2">Requirements</h4>
                          <ul className="list-disc pl-5 text-muted-foreground">
                            {job.requirements.map((req, idx) => (
                              <li key={idx}>{req}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2">Benefits</h4>
                          <ul className="list-disc pl-5 text-muted-foreground">
                            {job.benefits.map((benefit, idx) => (
                              <li key={idx}>{benefit}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2">Accessibility Features</h4>
                          <ul className="list-disc pl-5 text-muted-foreground">
                            {job.accessibility.map((acc, idx) => (
                              <li key={idx}>{acc}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <p className="text-muted-foreground line-clamp-2 mt-3">{job.description}</p>
                    )}
                  </div>
                  
                  <div className="mt-6 flex justify-between items-center">
                    <Button 
                      variant="ghost" 
                      onClick={() => toggleJobExpand(job.id)}
                      className="text-primary"
                    >
                      {expandedJob === job.id ? "Show Less" : "Show More"}
                    </Button>
                    <div>
                      <Button variant="outline" size="sm" className="mr-2">
                        Save Job
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleApply(job.id)}
                        disabled={isApplying === job.id}
                      >
                        {isApplying === job.id ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Applying...
                          </>
                        ) : (
                          <>
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Apply Now
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No jobs found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("");
                    setJobType("");
                    setAccessibility("");
                    loadJobs(1);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => handlePageChange(Math.max(currentPage - 1, 1))} 
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink 
                        onClick={() => handlePageChange(i + 1)}
                        isActive={currentPage === i + 1}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}

          <DisabilityQuestionnaire />
          <div className="text-center mt-12 bg-secondary/30 p-6 rounded-xl border border-border max-w-3xl mx-auto">
            <HeartHandshake className="h-8 w-8 text-primary mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Looking for Inclusive Employment in India?</h2>
            <p className="text-muted-foreground mb-4">
              We work with employers across India who are committed to providing accommodations and support for differently-abled individuals.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="outline">Browse Jobs</Button>
              <Button>Schedule a Consultation</Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
