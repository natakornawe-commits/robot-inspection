'use client';

import { useState, useCallback, useEffect } from 'react';
import type { InspectionRecord } from '@/types';

export type SortOrder = 'desc' | 'asc';
export type FilterRobot = '' | 'haipick' | 'a71';
export type FilterResult = '' | 'pass' | 'fail';

export function useHistory() {
  const [records, setRecords] = useState<InspectionRecord[]>([]);
  const [search, setSearch] = useState('');
  const [filterRobot, setFilterRobot] = useState<FilterRobot>('');
  const [filterResult, setFilterResult] = useState<FilterResult>('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Record<string, string>>({});

  // โหลดจาก localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('inspection_history') || '[]';
      setRecords(JSON.parse(raw));
    } catch { setRecords([]); }
  }, []);

  const saveRecords = useCallback((updated: InspectionRecord[]) => {
    setRecords(updated);
    localStorage.setItem('inspection_history', JSON.stringify(updated));
  }, []);

  const deleteRecord = useCallback((id: string) => {
    setRecords(prev => {
      const updated = prev.filter(r => r.id !== id);
      localStorage.setItem('inspection_history', JSON.stringify(updated));
      return updated;
    });
    setExpandedId(prev => prev === id ? null : prev);
  }, []);

  const toggleExpand = useCallback((id: string) => {
    setExpandedId(prev => prev === id ? null : id);
    setActiveTab(prev => ({ ...prev, [id]: prev[id] ?? 'summary' }));
  }, []);

  const setTab = useCallback((id: string, tab: string) => {
    setActiveTab(prev => ({ ...prev, [id]: tab }));
  }, []);

  const toggleSort = useCallback(() => {
    setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
  }, []);

  // Computed: filtered + sorted
  const filtered = records
    .filter(r => {
      const q = search.toLowerCase();
      const info = r.info ?? {};
      const matchQ = !q ||
        (info.inspector ?? '').toLowerCase().includes(q) ||
        (info.robotNo ?? '').toLowerCase().includes(q) ||
        (info.date ?? '').includes(q) ||
        r.robot.toLowerCase().includes(q);
      const matchRobot = !filterRobot || r.robot === filterRobot;
      const matchResult = !filterResult ||
        (filterResult === 'pass' && r.stats.bad === 0 && r.stats.done > 0) ||
        (filterResult === 'fail' && r.stats.bad > 0);
      return matchQ && matchRobot && matchResult;
    })
    .sort((a, b) => {
      const da = new Date(a.savedAt).getTime();
      const db = new Date(b.savedAt).getTime();
      return sortOrder === 'desc' ? db - da : da - db;
    });

  // Summary stats
  const summaryStats = {
    total: records.length,
    thisMonth: records.filter(r => {
      const d = new Date(r.savedAt);
      const now = new Date();
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length,
    inspectors: new Set(records.map(r => r.info?.inspector).filter(Boolean)).size,
    passRate: (() => {
      let done = 0, total = 0;
      records.forEach(r => { done += r.stats.done; total += r.stats.total; });
      return total > 0 ? Math.round(done / total * 100) + '%' : '-';
    })(),
  };

  return {
    records, filtered, summaryStats,
    search, setSearch,
    filterRobot, setFilterRobot,
    filterResult, setFilterResult,
    sortOrder, toggleSort,
    expandedId, toggleExpand,
    activeTab, setTab,
    deleteRecord,
  };
}