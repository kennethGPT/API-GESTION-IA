import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase credentials. Please click "Connect to Supabase" button.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Chat history functions
export const saveChatHistory = async (userId: string, messages: any[]) => {
  const { data, error } = await supabase
    .from('chat_history')
    .upsert({ 
      user_id: userId,
      messages: messages,
      updated_at: new Date().toISOString()
    })
    .select();

  if (error) {
    console.error('Error saving chat history:', error);
    return null;
  }
  return data;
};

export const getChatHistory = async (userId: string) => {
  const { data, error } = await supabase
    .from('chat_history')
    .select('messages')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching chat history:', error);
    return null;
  }
  return data?.messages || null;
};