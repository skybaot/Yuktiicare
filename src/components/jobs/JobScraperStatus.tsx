
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Loader2, RefreshCw, CheckCircle2, XCircle } from "lucide-react";
import { triggerJobScraping } from "@/services/jobScraperService";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function JobScraperStatus() {
  const [isLoading, setIsLoading] = useState(false);
  const [lastScrapedTime, setLastScrapedTime] = useState<string | null>(null);
  const [scrapingStatus, setScrapingStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleScrapeJobs = async () => {
    setIsLoading(true);
    setScrapingStatus('idle');

    try {
      const result = await triggerJobScraping();
      
      if (result.success) {
        setScrapingStatus('success');
        setLastScrapedTime(new Date().toLocaleString());
        toast({
          title: "Job scraping complete",
          description: "New jobs have been added to the database",
        });
      } else {
        setScrapingStatus('error');
        toast({
          title: "Job scraping failed",
          description: result.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error triggering job scraping:', error);
      setScrapingStatus('error');
      toast({
        title: "An error occurred",
        description: "Failed to scrape jobs. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5" />
          Job Scraper
        </CardTitle>
        <CardDescription>
          Scrape new job listings for differently-abled people from various sources
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">
              Status: {' '}
              {scrapingStatus === 'success' ? (
                <span className="text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" /> Success
                </span>
              ) : scrapingStatus === 'error' ? (
                <span className="text-red-600 dark:text-red-400 font-medium flex items-center gap-1">
                  <XCircle className="h-4 w-4" /> Failed
                </span>
              ) : (
                <span className="text-muted-foreground">Idle</span>
              )}
            </p>
            {lastScrapedTime && (
              <p className="text-sm text-muted-foreground mt-1">
                Last scraped: {lastScrapedTime}
              </p>
            )}
          </div>
          <Button 
            onClick={handleScrapeJobs} 
            disabled={isLoading}
            className="min-w-[140px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Scraping...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Scrape Jobs
              </>
            )}
          </Button>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 px-6 py-3">
        <p className="text-xs text-muted-foreground">
          The scraper checks multiple sources for job listings suitable for differently-abled individuals.
        </p>
      </CardFooter>
    </Card>
  );
}
