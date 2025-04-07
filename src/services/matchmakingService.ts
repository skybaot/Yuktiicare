
import { MatchProfile, MatchPreference } from '@/types';
import { simulateApiCall, getPaginatedData } from '@/utils/mockApi';

// Mock data for Indian matrimony profiles for differently-abled persons
const mockProfiles: MatchProfile[] = [
  {
    id: "1",
    name: "Raj Sharma",
    age: 32,
    gender: "male",
    location: "Mumbai, Maharashtra",
    about: "I'm a software developer with a hearing impairment. I love reading, traveling, and exploring new cuisines. Looking for someone who shares similar interests and values family.",
    lookingFor: ["marriage", "companionship"],
    interests: ["technology", "reading", "travel", "cooking"],
    photos: ["https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&h=400&auto=format&fit=crop"],
    lastActive: new Date().toISOString()
  },
  {
    id: "2",
    name: "Priya Patel",
    age: 28,
    gender: "female",
    location: "Ahmedabad, Gujarat",
    about: "I'm an artist with partial visual impairment. I enjoy painting, classical music, and spending time with friends. Seeking a caring partner who appreciates art and culture.",
    lookingFor: ["marriage"],
    interests: ["art", "music", "culture", "yoga"],
    photos: ["https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop"],
    lastActive: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "3",
    name: "Vikram Singh",
    age: 35,
    gender: "male",
    location: "Delhi NCR",
    about: "I'm a government employee with a mobility disability. I enjoy watching cricket, reading history books, and attending cultural events. Looking for a life partner who is understanding and supportive.",
    lookingFor: ["marriage", "friendship"],
    interests: ["cricket", "history", "politics", "movies"],
    photos: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&auto=format&fit=crop"],
    lastActive: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "4",
    name: "Anjali Desai",
    age: 30,
    gender: "female",
    location: "Bangalore, Karnataka",
    about: "I work in digital marketing and have a speech impairment. I'm passionate about travel, photography, and learning new languages. Looking for someone who is patient, kind, and adventurous.",
    lookingFor: ["marriage", "companionship"],
    interests: ["travel", "photography", "languages", "hiking"],
    photos: ["https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&auto=format&fit=crop"],
    lastActive: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "5",
    name: "Arjun Reddy",
    age: 33,
    gender: "male",
    location: "Hyderabad, Telangana",
    about: "I'm a teacher with a mild learning disability. I enjoy reading philosophy, playing chess, and volunteering. Seeking a compassionate partner who values education and community service.",
    lookingFor: ["marriage", "friendship"],
    interests: ["philosophy", "chess", "volunteering", "teaching"],
    photos: ["https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&auto=format&fit=crop"],
    lastActive: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "6",
    name: "Meera Iyer",
    age: 29,
    gender: "female",
    location: "Chennai, Tamil Nadu",
    about: "I'm an accountant with a physical disability. I love classical dance, reading Tamil literature, and exploring spirituality. Looking for someone who respects traditions and has a positive outlook.",
    lookingFor: ["marriage"],
    interests: ["dance", "literature", "spirituality", "music"],
    photos: ["https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&auto=format&fit=crop"],
    lastActive: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Find matches based on user preferences
export const findMatches = async (
  preferences: MatchPreference,
  page: number = 1,
  pageSize: number = 10
): Promise<{ matches: MatchProfile[], totalPages: number, totalItems: number }> => {
  try {
    // Filter profiles based on preferences
    let filteredProfiles = [...mockProfiles];
    
    if (preferences) {
      // Filter by age range
      if (preferences.ageRange) {
        filteredProfiles = filteredProfiles.filter(profile => 
          profile.age >= preferences.ageRange.min && profile.age <= preferences.ageRange.max
        );
      }
      
      // Filter by gender
      if (preferences.gender && preferences.gender.length > 0) {
        filteredProfiles = filteredProfiles.filter(profile => 
          preferences.gender.includes(profile.gender)
        );
      }
      
      // Filter by looking for
      if (preferences.lookingFor && preferences.lookingFor.length > 0) {
        filteredProfiles = filteredProfiles.filter(profile => 
          profile.lookingFor.some(item => preferences.lookingFor.includes(item))
        );
      }
      
      // Filter by interests (if provided)
      if (preferences.interests && preferences.interests.length > 0) {
        filteredProfiles = filteredProfiles.filter(profile => 
          profile.interests.some(interest => preferences.interests!.includes(interest))
        );
      }
    }
    
    // Sort by last active (most recent first)
    filteredProfiles.sort((a, b) => new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime());
    
    // Calculate compatibility scores
    filteredProfiles = filteredProfiles.map(profile => ({
      ...profile,
      compatibilityScore: calculateCompatibilityScore(profile, preferences)
    }));
    
    // Get paginated data
    const paginatedData = getPaginatedData(filteredProfiles, page, pageSize);
    
    // Simulate API call with delay
    return await simulateApiCall({
      matches: paginatedData.data,
      totalPages: paginatedData.totalPages,
      totalItems: paginatedData.totalItems
    }, 600);
    
  } catch (error) {
    console.error('Error finding matches:', error);
    throw error;
  }
};

// Get user profile
export const getUserProfile = async (userId: string): Promise<MatchProfile | null> => {
  try {
    // For demo purposes, return the first profile
    return await simulateApiCall(mockProfiles[0], 300);
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

// Create or update user profile
export const saveUserProfile = async (profile: Partial<MatchProfile>, userId: string): Promise<MatchProfile> => {
  try {
    // Simulate saving profile
    const updatedProfile: MatchProfile = {
      id: userId,
      name: profile.name || "User",
      age: profile.age || 30,
      gender: profile.gender || "other",
      location: profile.location || "India",
      about: profile.about || "",
      lookingFor: profile.lookingFor || ["marriage"],
      interests: profile.interests || [],
      photos: profile.photos || [],
      lastActive: new Date().toISOString()
    };
    
    return await simulateApiCall(updatedProfile, 800);
  } catch (error) {
    console.error('Error saving user profile:', error);
    throw error;
  }
};

// Helper function to calculate compatibility score
const calculateCompatibilityScore = (profile: MatchProfile, preferences: MatchPreference): number => {
  let score = 0;
  let totalFactors = 0;
  
  // Age match
  if (preferences.ageRange) {
    if (profile.age >= preferences.ageRange.min && profile.age <= preferences.ageRange.max) {
      score += 25;
    }
    totalFactors += 25;
  }
  
  // Gender match
  if (preferences.gender && preferences.gender.length > 0) {
    if (preferences.gender.includes(profile.gender)) {
      score += 25;
    }
    totalFactors += 25;
  }
  
  // Looking for match
  if (preferences.lookingFor && preferences.lookingFor.length > 0 && profile.lookingFor) {
    const lookingForMatch = preferences.lookingFor.filter(item => profile.lookingFor.includes(item));
    if (lookingForMatch.length > 0) {
      score += 25 * (lookingForMatch.length / preferences.lookingFor.length);
    }
    totalFactors += 25;
  }
  
  // Interests match
  if (preferences.interests && preferences.interests.length > 0 && profile.interests) {
    const interestsMatch = preferences.interests.filter(item => profile.interests.includes(item));
    if (interestsMatch.length > 0) {
      score += 25 * (interestsMatch.length / preferences.interests.length);
    }
    totalFactors += 25;
  }
  
  // Calculate final percentage
  return totalFactors > 0 ? Math.round((score / totalFactors) * 100) : 50;
};
