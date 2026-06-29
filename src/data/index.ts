import { supabase } from '@/lib/supabase';
import type { Section, RobotType } from '@/types';

// ดึง checklist จาก Supabase
export async function fetchChecklist(robot: RobotType): Promise<Section[]> {
  const { data, error } = await supabase
    .from('checklist_templates')
    .select('sections')
    .eq('robot', robot)
    .single();

  if (error || !data) {
    console.error('fetchChecklist error:', error);
    return [];
  }

  return data.sections as Section[];
}

// บันทึก checklist ลง Supabase
export async function saveChecklist(
  robot: RobotType,
  sections: Section[]
): Promise<boolean> {
  const { error } = await supabase
    .from('checklist_templates')
    .update({ sections, updated_at: new Date().toISOString() })
    .eq('robot', robot);

  if (error) {
    console.error('saveChecklist error:', error);
    return false;
  }

  return true;
}