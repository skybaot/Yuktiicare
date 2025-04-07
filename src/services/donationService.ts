
import { supabase } from '@/utils/supabase';
import { toast } from '@/hooks/use-toast';

export interface DonationData {
  amount: number;
  fullName: string;
  email: string;
  anonymous: boolean;
  message?: string;
  donationDate: string;
}

export interface DonationFormData {
  amount: string;
  custom_amount?: string;
  donor_name: string;
  donor_email: string;
  is_monthly: boolean;
  message?: string;
}

export interface RecentDonor {
  name: string;
  amount: string;
  timestamp: string;
  message?: string;
}

// Submit a donation
export const submitDonation = async (donationData: DonationFormData): Promise<{ success: boolean; id?: string; message: string }> => {
  try {
    // Parse the amount
    const amount = donationData.custom_amount && donationData.amount === 'custom' 
      ? parseInt(donationData.custom_amount) 
      : parseInt(donationData.amount);

    if (isNaN(amount) || amount <= 0) {
      return { 
        success: false, 
        message: "Please enter a valid donation amount." 
      };
    }

    // Insert the donation into the database
    const { data, error } = await supabase
      .from('donations')
      .insert({
        amount: amount,
        full_name: donationData.donor_name,
        email: donationData.donor_email,
        anonymous: false,
        message: donationData.message || null,
        donation_date: new Date().toISOString(),
        is_monthly: donationData.is_monthly
      })
      .select('id')
      .single();
    
    if (error) throw error;
    
    return { 
      success: true, 
      id: data.id,
      message: "Thank you for your donation! Your generosity makes a difference."
    };
  } catch (error) {
    console.error('Error submitting donation:', error);
    toast({
      title: "Donation failed",
      description: "There was an error processing your donation. Please try again.",
      variant: "destructive"
    });
    return { 
      success: false,
      message: "There was an error processing your donation. Please try again." 
    };
  }
};

// Get recent donations
export const getRecentDonations = async (limit: number = 3): Promise<Array<{name: string, amount: string, time: string}>> => {
  try {
    const { data, error } = await supabase
      .from('donations')
      .select('full_name, amount, anonymous, donation_date')
      .order('donation_date', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    
    return data.map(donation => {
      const donationTime = new Date(donation.donation_date);
      const now = new Date();
      
      // Calculate the time difference
      const diffInHours = Math.floor((now.getTime() - donationTime.getTime()) / (1000 * 60 * 60));
      
      let timeDisplay;
      if (diffInHours < 1) {
        timeDisplay = 'Just now';
      } else if (diffInHours === 1) {
        timeDisplay = '1 hour ago';
      } else if (diffInHours < 24) {
        timeDisplay = `${diffInHours} hours ago`;
      } else {
        const days = Math.floor(diffInHours / 24);
        timeDisplay = days === 1 ? '1 day ago' : `${days} days ago`;
      }
      
      return {
        name: donation.anonymous ? 'Anonymous' : donation.full_name,
        amount: `₹${donation.amount}`,
        time: timeDisplay
      };
    });
  } catch (error) {
    console.error('Error fetching recent donations:', error);
    return [];
  }
};

// Function to get recent donors (formatted differently for the Donate page)
export const getRecentDonors = async (limit: number = 5): Promise<RecentDonor[]> => {
  try {
    const { data, error } = await supabase
      .from('donations')
      .select('full_name, amount, anonymous, donation_date, message')
      .order('donation_date', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    
    return data.map(donation => ({
      name: donation.anonymous ? 'Anonymous' : donation.full_name,
      amount: `₹${donation.amount}`,
      timestamp: donation.donation_date,
      message: donation.message
    }));
  } catch (error) {
    console.error('Error fetching recent donors:', error);
    return [];
  }
};

// Get total donations for the month
export const getMonthlyDonations = async (): Promise<{ total: number; target: number }> => {
  try {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    
    const { data, error } = await supabase
      .from('donations')
      .select('amount')
      .gte('donation_date', firstDayOfMonth);
    
    if (error) throw error;
    
    const total = data.reduce((sum, donation) => sum + donation.amount, 0);
    const target = 100000; // ₹100,000 monthly target
    
    return { total, target };
  } catch (error) {
    console.error('Error calculating monthly donations:', error);
    return { total: 0, target: 100000 };
  }
};

// Get donation impact statistics
export const getDonationImpactStats = async (): Promise<{
  jobsSecured: number;
  housingPlacements: number;
  eventsOrganized: number;
  totalRaised: number;
  goalAmount: number;
}> => {
  try {
    // For total raised, get sum of all donations
    const { data: donationData, error: donationError } = await supabase
      .from('donations')
      .select('amount');
    
    if (donationError) throw donationError;
    
    const totalRaised = donationData.reduce((sum, donation) => sum + donation.amount, 0);
    
    // For now, we'll use simulated impact metrics based on donation total
    // In a real app, these would come from separate tables tracking actual impact
    const jobsSecured = Math.floor(totalRaised / 10000); // 1 job per ₹10,000
    const housingPlacements = Math.floor(totalRaised / 20000); // 1 housing placement per ₹20,000
    const eventsOrganized = Math.floor(totalRaised / 5000); // 1 event per ₹5,000
    
    return {
      jobsSecured: Math.max(jobsSecured, 5), // Minimum 5 for demonstration
      housingPlacements: Math.max(housingPlacements, 3), // Minimum 3 for demonstration
      eventsOrganized: Math.max(eventsOrganized, 12), // Minimum 12 for demonstration
      totalRaised,
      goalAmount: 100000 // ₹100,000 goal
    };
  } catch (error) {
    console.error('Error calculating impact stats:', error);
    return {
      jobsSecured: 5,
      housingPlacements: 3,
      eventsOrganized: 12,
      totalRaised: 0,
      goalAmount: 100000
    };
  }
};
