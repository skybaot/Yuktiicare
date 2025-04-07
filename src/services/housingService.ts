
import { SeniorLiving, HousingFilter } from '@/types';
import { supabase } from '@/utils/supabase';

// Get all senior living options with pagination and filters
export const fetchSeniorLivings = async (
  page: number = 1,
  pageSize: number = 10,
  filters?: HousingFilter
): Promise<{ seniorLivings: SeniorLiving[], totalPages: number, totalItems: number }> => {
  try {
    let query = supabase
      .from('senior_livings')
      .select('*', { count: 'exact' });
    
    // Apply filters if they exist
    if (filters) {
      if (filters.location) {
        query = query.ilike('location', `%${filters.location}%`);
      }
      
      if (filters.type) {
        query = query.eq('type', filters.type);
      }
      
      if (filters.price) {
        // Handle price ranges like "1000-2000"
        const [min, max] = filters.price.split('-').map(Number);
        if (!isNaN(min) && !isNaN(max)) {
          query = query.gte('price_numeric', min).lte('price_numeric', max);
        } else if (!isNaN(min)) {
          query = query.gte('price_numeric', min);
        }
      }
      
      if (filters.amenities && filters.amenities.length > 0) {
        query = query.contains('amenities', filters.amenities);
      }
      
      if (filters.accessibility && filters.accessibility.length > 0) {
        query = query.contains('accessibility', filters.accessibility);
      }
    }
    
    // Apply pagination
    const startIndex = (page - 1) * pageSize;
    
    const { data, error, count } = await query
      .range(startIndex, startIndex + pageSize - 1)
      .order('rating', { ascending: false });
    
    if (error) throw error;
    
    return {
      seniorLivings: data as SeniorLiving[],
      totalPages: Math.ceil((count || 0) / pageSize),
      totalItems: count || 0
    };
  } catch (error) {
    console.error('Error fetching senior livings:', error);
    throw error;
  }
};

// Get senior living by ID
export const fetchSeniorLivingById = async (id: string): Promise<SeniorLiving | null> => {
  try {
    const { data, error } = await supabase
      .from('senior_livings')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return data as SeniorLiving;
  } catch (error) {
    console.error('Error fetching senior living by ID:', error);
    throw error;
  }
};

// Schedule a tour
export const scheduleTour = async (
  seniorLivingId: string, 
  userId: string, 
  date: string, 
  time: string, 
  notes: string
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('housing_tours')
      .insert({
        senior_living_id: seniorLivingId,
        user_id: userId,
        tour_date: date,
        tour_time: time,
        notes: notes,
        status: 'scheduled',
        created_at: new Date().toISOString()
      });
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error scheduling tour:', error);
    throw error;
  }
};
