
import { supabase } from '@/utils/supabase';
import { toast } from '@/hooks/use-toast';

export interface SuccessStory {
  id?: string;
  name: string;
  age: number;
  image: string;
  story: string;
  program: string;
  impact: string;
  published: boolean;
  submissionDate: string;
}

// Get published success stories
export const getSuccessStories = async (): Promise<SuccessStory[]> => {
  try {
    const { data, error } = await supabase
      .from('success_stories')
      .select('*')
      .eq('published', true)
      .order('submissionDate', { ascending: false });
    
    if (error) throw error;
    
    return data as SuccessStory[];
  } catch (error) {
    console.error('Error fetching success stories:', error);
    return [];
  }
};

// Submit a new success story
export const submitSuccessStory = async (story: Omit<SuccessStory, 'id' | 'published'>): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('success_stories')
      .insert({
        name: story.name,
        age: story.age,
        image: story.image,
        story: story.story,
        program: story.program,
        impact: story.impact,
        published: false, // Needs admin approval
        submissionDate: story.submissionDate
      });
    
    if (error) throw error;
    
    toast({
      title: "Story submitted!",
      description: "Thank you for sharing your story. It will be published after review."
    });
    
    return true;
  } catch (error) {
    console.error('Error submitting success story:', error);
    toast({
      title: "Submission failed",
      description: "There was an error submitting your story. Please try again.",
      variant: "destructive"
    });
    return false;
  }
};
