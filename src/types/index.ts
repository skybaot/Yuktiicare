
// Job Portal Types
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote' | 'Internship';
  salary: string;
  postedDate: string;
  logo: string;
  description: string;
  requirements: string[];
  benefits: string[];
  accessibility: string[];
  featured: boolean;
  applicationUrl: string;
}

export interface JobFilter {
  location?: string;
  type?: string;
  keyword?: string;
  accessibility?: string[];
}

// Housing Directory Types
export interface SeniorLiving {
  id: string;
  name: string;
  type: 'Independent Living' | 'Assisted Living' | 'Nursing Home' | 'Memory Care' | 'Retirement Community';
  location: string;
  address: string;
  price: string;
  image: string;
  amenities: string[];
  accessibility: string[];
  rating: number;
  reviewCount: number;
  description: string;
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  openings: boolean;
  featured: boolean;
}

export interface HousingFilter {
  location?: string;
  type?: string;
  price?: string;
  amenities?: string[];
  accessibility?: string[];
}

// Matchmaking Types
export interface MatchProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  location: string;
  about: string;
  lookingFor: string[];
  interests: string[];
  photos: string[];
  lastActive: string;
  compatibilityScore?: number;
}

export interface MatchPreference {
  ageRange: {
    min: number;
    max: number;
  };
  gender: string[];
  lookingFor: string[];
  interests?: string[];
}
