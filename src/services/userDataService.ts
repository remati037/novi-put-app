import { supabase } from '../lib/supabase';
import { UserData } from '../types';

export const userDataService = {
  // Get user data from Supabase
  async getUserData(userId: string): Promise<UserData | null> {
    const { data, error } = await supabase
      .from('user_data')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No data found, return null
        return null;
      }
      console.error('Error fetching user data:', error);
      return null;
    }

    if (data) {
      return {
        name: data.name || '',
        streakStart: data.streak_start,
        lastCheckIn: data.last_check_in,
        relapseDate: data.relapse_date,
        urgeHistory: data.urge_history || [],
        quizAnswers: data.quiz_answers || {},
        planProgress: data.plan_progress || [],
        isOnboarded: data.is_onboarded || false,
      };
    }

    return null;
  },

  // Save user data to Supabase
  async saveUserData(userId: string, userData: UserData): Promise<boolean> {
    const { error } = await supabase
      .from('user_data')
      .upsert({
        user_id: userId,
        name: userData.name,
        streak_start: userData.streakStart,
        last_check_in: userData.lastCheckIn,
        relapse_date: userData.relapseDate,
        urge_history: userData.urgeHistory,
        quiz_answers: userData.quizAnswers,
        plan_progress: userData.planProgress,
        is_onboarded: userData.isOnboarded,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id'
      });

    if (error) {
      console.error('Error saving user data:', error);
      return false;
    }

    return true;
  },

  // Delete user data (for account deletion)
  async deleteUserData(userId: string): Promise<boolean> {
    const { error } = await supabase
      .from('user_data')
      .delete()
      .eq('user_id', userId);

    if (error) {
      console.error('Error deleting user data:', error);
      return false;
    }

    return true;
  },
};

