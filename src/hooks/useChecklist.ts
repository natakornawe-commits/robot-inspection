'use client';

import { useState, useEffect } from 'react';
import { fetchChecklist } from '@/lib/checklistService';
import { HAIPICK_SECTIONS } from '@/data/haipick';
import { A71_SECTIONS } from '@/data/a71';
import type { RobotType, Section } from '@/types';

function getFallback(robot: RobotType): Section[] {
  if (robot === 'haipick') return HAIPICK_SECTIONS;
  if (robot === 'a71') return A71_SECTIONS;
  return []; // robot ใหม่ดึงจาก Supabase อย่างเดียว
}

export function useChecklist(robot: RobotType) {
  const [sections, setSections] = useState<Section[]>(getFallback(robot));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchChecklist(robot);
      if (data && data.length > 0) {
        setSections(data);
      } else {
        setSections(getFallback(robot));
      }
      setLoading(false);
    };
    load();
  }, [robot]);

  return { sections, setSections, loading };
}