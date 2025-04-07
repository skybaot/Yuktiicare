import { Job, JobFilter } from '@/types';
import { simulateApiCall, getPaginatedData } from '@/utils/mockApi';
import { fetchJobsFromDatabase } from '@/services/jobScraperService';

// Mock data for Indian jobs for differently-abled persons
const mockJobs: Job[] = [
  {
    id: "1",
    title: "Customer Support Executive",
    company: "TechVision India",
    location: "Bangalore, Karnataka",
    type: "Full-time",
    salary: "₹25,000 - ₹35,000/month",
    postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    logo: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=64&h=64&auto=format&fit=crop",
    description: "TechVision India is looking for a Customer Support Executive to help our clients with technical issues. This position is suitable for candidates with hearing impairment as we provide assistive technology.",
    requirements: ["Good communication skills", "Basic computer knowledge", "Customer service orientation"],
    benefits: ["Health insurance", "Transportation allowance", "Skill development programs"],
    accessibility: ["Sign language interpreters", "Assistive listening devices", "Flexible work hours"],
    featured: true,
    applicationUrl: "https://techvisionindia.com/careers/customer-support"
  },
  {
    id: "2",
    title: "Content Writer",
    company: "Digital Media Solutions",
    location: "Remote (India)",
    type: "Part-time",
    salary: "₹15,000 - ₹25,000/month",
    postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    logo: "https://images.unsplash.com/photo-1560472355-536de3962603?w=64&h=64&auto=format&fit=crop",
    description: "Create engaging content for our blog and social media channels. This remote position is ideal for persons with mobility challenges.",
    requirements: ["Excellent writing skills in English and Hindi", "Knowledge of SEO", "Creative mindset"],
    benefits: ["Work from home", "Flexible hours", "Performance bonuses"],
    accessibility: ["Remote work", "Accessible digital tools", "Flexible deadlines"],
    featured: false,
    applicationUrl: "https://digitalmediasolutions.in/careers/content-writer"
  },
  {
    id: "3",
    title: "Accounts Assistant",
    company: "Nirman Constructions",
    location: "Mumbai, Maharashtra",
    type: "Full-time",
    salary: "₹20,000 - ₹30,000/month",
    postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=64&h=64&auto=format&fit=crop",
    description: "Assist in managing accounts and financial records. Our office provides a wheelchair-accessible environment with appropriate accommodations.",
    requirements: ["Knowledge of basic accounting", "Proficiency in MS Excel", "Attention to detail"],
    benefits: ["Provident Fund", "Medical insurance", "Travel allowance"],
    accessibility: ["Wheelchair accessible workplace", "Adjustable desks", "Screen reader software"],
    featured: false,
    applicationUrl: "https://nirmanconstructions.co.in/join-us/accounts-assistant"
  },
  {
    id: "4",
    title: "Software Developer",
    company: "Infotech Solutions",
    location: "Hyderabad, Telangana",
    type: "Full-time",
    salary: "₹40,000 - ₹70,000/month",
    postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    logo: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=64&h=64&auto=format&fit=crop",
    description: "Develop web applications using modern technologies. We're committed to inclusive hiring and provide necessary accommodations for developers with visual impairments.",
    requirements: ["JavaScript/TypeScript experience", "React knowledge", "Problem-solving abilities"],
    benefits: ["Comprehensive health insurance", "Skill development budget", "Team outings"],
    accessibility: ["Screen reader technology", "Braille displays", "Voice recognition software"],
    featured: true,
    applicationUrl: "https://infotechsolutions.in/careers/software-developer"
  },
  {
    id: "5",
    title: "HR Coordinator",
    company: "Global Services India",
    location: "Delhi NCR",
    type: "Full-time",
    salary: "₹25,000 - ₹40,000/month",
    postedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=64&h=64&auto=format&fit=crop",
    description: "Coordinate HR activities including recruitment and employee engagement. Our office is designed to be accessible for all types of disabilities.",
    requirements: ["HR background", "Good interpersonal skills", "Knowledge of labor laws"],
    benefits: ["Health and dental coverage", "Professional development", "Wellness programs"],
    accessibility: ["Accessible bathrooms", "Elevators", "Inclusive culture"],
    featured: false,
    applicationUrl: "https://globalservicesindia.com/careers/hr-coordinator"
  }
];

// Get all jobs with pagination and filters
export const fetchJobs = async (
  page: number = 1,
  pageSize: number = 10,
  filters?: JobFilter
): Promise<{ jobs: Job[], totalPages: number, totalItems: number }> => {
  try {
    // Try to fetch from the database first (dynamically scraped jobs)
    try {
      const result = await fetchJobsFromDatabase(page, pageSize, filters);
      
      // If no jobs found in database and we're on page 1 with no filters,
      // fall back to mock data
      if (result.jobs.length === 0 && page === 1 && !filters) {
        console.log('No jobs found in database, falling back to mock data');
        return await fallbackToMockJobs(page, pageSize, filters);
      }
      
      return result;
    } catch (error) {
      console.error('Error fetching jobs from database:', error);
      console.log('Falling back to mock data');
      return await fallbackToMockJobs(page, pageSize, filters);
    }
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

// Fallback to use mock data
const fallbackToMockJobs = async (
  page: number = 1,
  pageSize: number = 10,
  filters?: JobFilter
): Promise<{ jobs: Job[], totalPages: number, totalItems: number }> => {
  // Filter the mock data
  let filteredJobs = [...mockJobs];
  
  if (filters) {
    if (filters.location) {
      filteredJobs = filteredJobs.filter(job => 
        job.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }
    
    if (filters.type) {
      filteredJobs = filteredJobs.filter(job => 
        job.type.toLowerCase() === filters.type!.toLowerCase()
      );
    }
    
    if (filters.keyword) {
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(filters.keyword!.toLowerCase()) || 
        job.description.toLowerCase().includes(filters.keyword!.toLowerCase())
      );
    }
    
    if (filters.accessibility && filters.accessibility.length > 0) {
      filteredJobs = filteredJobs.filter(job => 
        filters.accessibility!.some(acc => 
          job.accessibility.some(jobAcc => 
            jobAcc.toLowerCase().includes(acc.toLowerCase())
          )
        )
      );
    }
  }
  
  // Sort by posted date (newest first)
  filteredJobs.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
  
  // Simulate API call with delay
  const paginatedData = getPaginatedData(filteredJobs, page, pageSize);
  return await simulateApiCall({
    jobs: paginatedData.data,
    totalPages: paginatedData.totalPages,
    totalItems: paginatedData.totalItems
  }, 500);
};

// Get job by ID
export const fetchJobById = async (id: string): Promise<Job | null> => {
  try {
    const job = mockJobs.find(job => job.id === id);
    
    if (!job) {
      return null;
    }
    
    return await simulateApiCall(job, 300);
  } catch (error) {
    console.error('Error fetching job by ID:', error);
    throw error;
  }
};

// Apply for a job - redirects to the application URL
export const applyForJob = async (jobId: string): Promise<string> => {
  try {
    // Find the job to get its application URL
    const job = await fetchJobById(jobId);
    
    if (!job) {
      throw new Error('Job not found');
    }
    
    // Return the application URL after a small delay
    return await simulateApiCall(job.applicationUrl, 300);
  } catch (error) {
    console.error('Error applying for job:', error);
    throw error;
  }
};

// Track job application - can be used for analytics
export const trackJobApplication = async (jobId: string, userId?: string): Promise<boolean> => {
  try {
    // In a real app, you'd store this in a database
    console.log(`User ${userId || 'anonymous'} applied for job ${jobId}`);
    return await simulateApiCall(true, 300);
  } catch (error) {
    console.error('Error tracking job application:', error);
    return false;
  }
};
