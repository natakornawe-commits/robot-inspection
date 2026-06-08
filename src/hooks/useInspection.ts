'use client';

import { useState, useCallback } from 'react';
import type { RobotType, InspectionState, InspectionInfo, ItemState, ResultType, ActionType } from '@/types';
import { getSections, makeItemKey } from '@/data';

const DEFAULT_ITEM_STATE: ItemState = {
  result: null,
  value: '',
  action: '',
  photos: [],
  notes: '',
};

function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

export function useInspection() {
  const [robot, setRobot] = useState<RobotType>('haipick');
  const [state, setState] = useState<InspectionState>({});
  const [info, setInfo] = useState<InspectionInfo>({
    date: getTodayDate(),
    robot: '',
    inspector: '',
    witness: '',
  });

  const getItemState = useCallback((key: string): ItemState => {
    return state[key] ?? { ...DEFAULT_ITEM_STATE };
  }, [state]);

  const setResult = useCallback((key: string, val: ResultType) => {
    setState(prev => {
      const current = prev[key] ?? { ...DEFAULT_ITEM_STATE };
      return {
        ...prev,
        [key]: { ...current, result: current.result === val ? null : val },
      };
    });
  }, []);

  const setValue = useCallback((key: string, val: string) => {
    setState(prev => {
      const current = prev[key] ?? { ...DEFAULT_ITEM_STATE };
      return { ...prev, [key]: { ...current, value: val } };
    });
  }, []);

  const setAction = useCallback((key: string, val: ActionType) => {
    setState(prev => {
      const current = prev[key] ?? { ...DEFAULT_ITEM_STATE };
      return { ...prev, [key]: { ...current, action: val } };
    });
  }, []);

  const addPhotos = useCallback((key: string, photos: string[]) => {
    setState(prev => {
      const current = prev[key] ?? { ...DEFAULT_ITEM_STATE };
      return { ...prev, [key]: { ...current, photos: [...current.photos, ...photos] } };
    });
  }, []);

  const deletePhoto = useCallback((key: string, idx: number) => {
    setState(prev => {
      const current = prev[key] ?? { ...DEFAULT_ITEM_STATE };
      const photos = current.photos.filter((_, i) => i !== idx);
      return { ...prev, [key]: { ...current, photos } };
    });
  }, []);

  const clearAll = useCallback(() => {
    setState({});
    setInfo({ date: getTodayDate(), robot: '', inspector: '', witness: '' });
  }, []);

  const saveLocal = useCallback(() => {
    if (typeof window === 'undefined') return;
    const data = { robot, state, info };
    localStorage.setItem('inspection_data', JSON.stringify(data));
  }, [robot, state, info]);

  const loadLocal = useCallback(() => {
    if (typeof window === 'undefined') return;
    const raw = localStorage.getItem('inspection_data');
    if (!raw) return;
    try {
      const data = JSON.parse(raw);
      if (data.robot) setRobot(data.robot);
      if (data.state) setState(data.state);
      if (data.info) setInfo(data.info);
    } catch { /* ignore */ }
  }, []);

  // Computed stats
  const sections = getSections(robot);
  let done = 0, bad = 0, na = 0, total = 0;
  sections.forEach(sec => {
    sec.sub.forEach(sub => {
      sub.items.forEach(item => {
        total++;
        const key = makeItemKey(robot, sec.id, sub.id, item.id);
        const s = getItemState(key);
        if (s.result === 'good') done++;
        else if (s.result === 'bad') bad++;
        else if (s.result === 'na') na++;
      });
    });
  });
  const answered = done + bad + na;
  const progress = total > 0 ? Math.round((answered / total) * 100) : 0;

  return {
    robot, setRobot,
    state, info, setInfo,
    getItemState, setResult, setValue, setAction,
    addPhotos, deletePhoto,
    clearAll, saveLocal, loadLocal,
    stats: { done, bad, na, total, progress },
  };
}
