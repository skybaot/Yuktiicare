
import { Job, JobFilter } from '@/types';
import { supabase } from '@/utils/supabase';

// Job sources to scrape from
const JOB_SOURCES = [
  { name: 'Ability Jobs', url: 'https://www.abilityjobs.com' },
  { name: 'Disability Jobs', url: 'https://www.disabilityjobs.org' },
  { name: 'Inclusive Jobs India', url: 'https://inclusivejobsindia.com' },
];

// Function to scrape jobs from multiple sources
export const scrapeJobs = async (): Promise<boolean> => {
  try {
    console.log('Starting job scraper...');
    
    // For each job source, scrape jobs and store in Supabase
    for (const source of JOB_SOURCES) {
      console.log(`Scraping jobs from ${source.name}...`);
      
      // In a real implementation, you would use a web scraping library
      // like Puppeteer, Cheerio, or call an external API
      
      // For demo purposes, we're generating mock jobs based on the source
      const scrapedJobs = await mockScrapeJobsFromSource(source);
      
      // Store scraped jobs in Supabase
      for (const job of scrapedJobs) {
        // Check if job already exists
        const { data: existingJob } = await supabase
          .from('jobs')
          .select('id')
          .eq('source_id', job.id)
          .eq('source_name', source.name)
          .single();
        
        if (!existingJob) {
          // Insert new job
          await supabase.from('jobs').insert([{
            title: job.title,
            company: job.company,
            location: job.location,
            type: job.type,
            salary: job.salary,
            posted_date: job.postedDate,
            description: job.description,
            requirements: job.requirements,
            benefits: job.benefits,
            accessibility: job.accessibility,
            featured: job.featured,
            application_url: job.applicationUrl,
            source_name: source.name,
            source_id: job.id,
            created_at: new Date().toISOString()
          }]);
        }
      }
      
      console.log(`Successfully scraped ${scrapedJobs.length} jobs from ${source.name}`);
    }
    
    console.log('Job scraping completed successfully');
    return true;
  } catch (error) {
    console.error('Error scraping jobs:', error);
    return false;
  }
};

// Mock function to simulate scraping jobs from a source
const mockScrapeJobsFromSource = async (source: { name: string, url: string }): Promise<Job[]> => {
  // In a real implementation, this would scrape the actual website
  // For demo purposes, we'll return some mock data
  
  // Simulating network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const currentDate = new Date();
  const getRandomDate = (daysAgo: number) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
    return date.toISOString();
  };
  
  // Mock data with Indian context and focus on differently-abled persons
  const mockData: Job[] = [
    {
      id: `${source.name}-${Math.random().toString(36).substring(2, 10)}`,
      title: "Accessibility Specialist",
      company: source.name === 'Inclusive Jobs India' ? "Tech Mahindra" : "Wipro Digital",
      location: "Bangalore, Karnataka",
      type: "Full-time",
      salary: "₹60,000 - ₹90,000/month",
      postedDate: getRandomDate(5),
      logo: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=64&h=64&auto=format&fit=crop",
      description: "Looking for an Accessibility Specialist to evaluate digital products and ensure they meet WCAG guidelines and are accessible to people with disabilities.",
      requirements: ["Knowledge of WCAG 2.1", "Experience with screen readers", "Understanding of assistive technologies"],
      benefits: ["Health insurance", "Remote work options", "Professional development budget"],
      accessibility: ["Remote work", "Flexible hours", "Assistive technology provided"],
      featured: Math.random() > 0.7,
      applicationUrl: `${source.url}/jobs/accessibility-specialist`
    },
    {
      id: `${source.name}-${Math.random().toString(36).substring(2, 10)}`,
      title: "Diversity & Inclusion Manager",
      company: source.name === 'Disability Jobs' ? "Infosys" : "Tata Consultancy Services",
      location: "Hyderabad, Telangana",
      type: "Full-time",
      salary: "₹80,000 - ₹120,000/month",
      postedDate: getRandomDate(10),
      logo: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=64&h=64&auto=format&fit=crop",
      description: "We're looking for a Diversity & Inclusion Manager to lead our initiatives to create a more inclusive workplace for differently-abled employees.",
      requirements: ["5+ years HR experience", "Knowledge of disability employment laws", "Program management skills"],
      benefits: ["Comprehensive benefits", "Career advancement", "Work-life balance"],
      accessibility: ["Wheelchair accessible office", "Sign language interpreters", "Inclusive hiring process"],
      featured: Math.random() > 0.7,
      applicationUrl: `${source.url}/jobs/diversity-inclusion-manager`
    },
    {
      id: `${source.name}-${Math.random().toString(36).substring(2, 10)}`,
      title: "Data Entry Specialist",
      company: source.name === 'Ability Jobs' ? "HCL Technologies" : "Cognizant",
      location: "Remote (India)",
      type: "Part-time",
      salary: "₹18,000 - ₹25,000/month",
      postedDate: getRandomDate(3),
      logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=64&h=64&auto=format&fit=crop",
      description: "Data entry role suitable for persons with mobility challenges. Work from home with flexible hours.",
      requirements: ["Attention to detail", "Basic computer skills", "Good typing speed"],
      benefits: ["Work from home", "Flexible schedule", "Training provided"],
      accessibility: ["Remote work", "Accessible software", "Assistive technology compatible"],
      featured: Math.random() > 0.7,
      applicationUrl: `${source.url}/jobs/data-entry-specialist`
    }
  ];
  
  return mockData;
};

// Function to fetch jobs from Supabase with pagination and filters
export const fetchJobsFromDatabase = async (
  page: number = 1,
  pageSize: number = 10,
  filters?: JobFilter
): Promise<{ jobs: Job[], totalPages: number, totalItems: number }> => {
  try {
    let query = supabase.from('jobs').select('*', { count: 'exact' });
    
    // Apply filters
    if (filters) {
      if (filters.location) {
        query = query.ilike('location', `%${filters.location}%`);
      }
      
      if (filters.type) {
        query = query.eq('type', filters.type);
      }
      
      if (filters.keyword) {
        query = query.or(`title.ilike.%${filters.keyword}%,description.ilike.%${filters.keyword}%`);
      }
      
      if (filters.accessibility && filters.accessibility.length > 0) {
        // This is a simplified approach - in a real app, you'd need a more sophisticated way
        // to search within the accessibility array
        query = query.contains('accessibility', filters.accessibility);
      }
    }
    
    // Add pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    
    // Execute query
    const { data, error, count } = await query
      .order('posted_date', { ascending: false })
      .range(from, to);
    
    if (error) {
      console.error('Error fetching jobs from database:', error);
      throw error;
    }
    
    // Transform database records to Job objects
    const jobs: Job[] = data.map(record => ({
      id: record.id,
      title: record.title,
      company: record.company,
      location: record.location,
      type: record.type,
      salary: record.salary,
      postedDate: record.posted_date,
      logo: record.logo || "https://images.unsplash.com/photo-1560472355-536de3962603?w=64&h=64&auto=format&fit=crop",
      description: record.description,
      requirements: record.requirements || [],
      benefits: record.benefits || [],
      accessibility: record.accessibility || [],
      featured: record.featured || false,
      applicationUrl: record.application_url
    }));
    
    const totalItems = count || 0;
    const totalPages = Math.ceil(totalItems / pageSize);
    
    return { jobs, totalPages, totalItems };
  } catch (error) {
    console.error('Error fetching jobs from database:', error);
    throw error;
  }
};

// Function to trigger job scraping and return status
export const triggerJobScraping = async (): Promise<{ success: boolean, message: string }> => {
  try {
    const success = await scrapeJobs();
    return {
      success,
      message: success 
        ? 'Job scraping completed successfully' 
        : 'Failed to scrape jobs. Please try again later.'
    };
  } catch (error) {
    console.error('Error triggering job scraping:', error);
    return {
      success: false,
      message: 'An error occurred while scraping jobs.'
    };
  }
};
