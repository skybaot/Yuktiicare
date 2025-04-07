import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Job, SeniorLiving, MatchProfile } from '@/types';
import { fetchJobs } from '@/services/jobService';
import { fetchSeniorLivings } from '@/services/housingService';
import { findMatches, getUserProfile, saveUserProfile } from '@/services/matchmakingService';
import { supabase } from '@/utils/supabase';
import { toast } from '@/hooks/use-toast';

interface AppContextType {
  // Jobs
  jobs: Job[];
  jobsLoading: boolean;
  jobsError: string | null;
  totalJobsPages: number;
  fetchJobsWithFilters: (page: number, filters?: any) => Promise<void>;
  
  // Housing
  seniorLivings: SeniorLiving[];
  housingLoading: boolean;
  housingError: string | null;
  totalHousingPages: number;
  fetchHousingWithFilters: (page: number, filters?: any) => Promise<void>;
  
  // Matchmaking
  matches: MatchProfile[];
  matchesLoading: boolean;
  matchesError: string | null;
  totalMatchesPages: number;
  findMatchesWithPreferences: (preferences: any, page: number) => Promise<void>;
  userProfile: MatchProfile | null;
  setUserProfile: (profile: MatchProfile) => void;
  saveProfile: (profileData: any) => Promise<void>;
  
  // User
  user: any | null;
  isAuthenticated: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // User state
  const [user, setUser] = useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  // Jobs state
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [jobsError, setJobsError] = useState<string | null>(null);
  const [totalJobsPages, setTotalJobsPages] = useState(0);
  
  // Housing state
  const [seniorLivings, setSeniorLivings] = useState<SeniorLiving[]>([]);
  const [housingLoading, setHousingLoading] = useState(false);
  const [housingError, setHousingError] = useState<string | null>(null);
  const [totalHousingPages, setTotalHousingPages] = useState(0);
  
  // Matchmaking state
  const [matches, setMatches] = useState<MatchProfile[]>([]);
  const [matchesLoading, setMatchesLoading] = useState(false);
  const [matchesError, setMatchesError] = useState<string | null>(null);
  const [totalMatchesPages, setTotalMatchesPages] = useState(0);
  const [userProfile, setUserProfile] = useState<MatchProfile | null>(null);
  
  // Check for authentication changes
  useEffect(() => {
    // Skip auth listener if Supabase credentials are missing
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      console.warn('Skipping auth listener - Supabase credentials missing');
      return;
    }
    
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setUser(session.user);
        setIsAuthenticated(true);
        toast({
          title: "Welcome back!",
          description: "You are now signed in.",
        });
        
        // Get user profile if authenticated
        if (session.user?.id) {
          getUserProfile(session.user.id)
            .then(profile => {
              if (profile) {
                setUserProfile(profile);
              }
            })
            .catch(error => {
              console.error('Error fetching user profile:', error);
            });
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setIsAuthenticated(false);
        setUserProfile(null);
      }
    });
    
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
        setIsAuthenticated(true);
        
        // Get user profile if authenticated
        if (session.user?.id) {
          getUserProfile(session.user.id)
            .then(profile => {
              if (profile) {
                setUserProfile(profile);
              }
            })
            .catch(error => {
              console.error('Error fetching user profile:', error);
            });
        }
      }
    });
    
    return () => {
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);
  
  // Jobs fetch function
  const fetchJobsWithFilters = async (page: number = 1, filters?: any) => {
    setJobsLoading(true);
    setJobsError(null);
    
    try {
      const result = await fetchJobs(page, 5, filters);
      setJobs(result.jobs);
      setTotalJobsPages(result.totalPages);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobsError('Failed to load jobs. Please try again later.');
    } finally {
      setJobsLoading(false);
    }
  };
  
  // Housing fetch function
  const fetchHousingWithFilters = async (page: number = 1, filters?: any) => {
    setHousingLoading(true);
    setHousingError(null);
    
    try {
      const result = await fetchSeniorLivings(page, 5, filters);
      setSeniorLivings(result.seniorLivings);
      setTotalHousingPages(result.totalPages);
    } catch (error) {
      console.error('Error fetching housing:', error);
      setHousingError('Failed to load senior living options. Please try again later.');
    } finally {
      setHousingLoading(false);
    }
  };
  
  // Matchmaking fetch function
  const findMatchesWithPreferences = async (preferences: any, page: number = 1) => {
    setMatchesLoading(true);
    setMatchesError(null);
    
    try {
      const result = await findMatches(preferences, page, 5);
      setMatches(result.matches);
      setTotalMatchesPages(result.totalPages);
    } catch (error) {
      console.error('Error finding matches:', error);
      setMatchesError('Failed to find matches. Please try again later.');
    } finally {
      setMatchesLoading(false);
    }
  };
  
  // Save user profile
  const saveProfile = async (profileData: any) => {
    if (!user?.id) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save your profile",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const savedProfile = await saveUserProfile(profileData, user.id);
      setUserProfile(savedProfile);
      toast({
        title: "Profile saved!",
        description: "Your profile has been updated successfully"
      });
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Error",
        description: "Failed to save your profile. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  // Load initial data when the app starts
  useEffect(() => {
    fetchJobsWithFilters(1);
    fetchHousingWithFilters(1);
  }, []);
  
  const value = {
    // User
    user,
    isAuthenticated,
    
    // Jobs
    jobs,
    jobsLoading,
    jobsError,
    totalJobsPages,
    fetchJobsWithFilters,
    
    // Housing
    seniorLivings,
    housingLoading,
    housingError,
    totalHousingPages,
    fetchHousingWithFilters,
    
    // Matchmaking
    matches,
    matchesLoading,
    matchesError,
    totalMatchesPages,
    findMatchesWithPreferences,
    userProfile,
    setUserProfile,
    saveProfile
  };
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
