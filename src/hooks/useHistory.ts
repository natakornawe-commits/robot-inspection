'use client';

import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { InspectionRecord } from '@/types';

export type SortOrder = 'desc' | 'asc';
export type FilterRobot = '' | 'haipick' | 'a71';
export type FilterResult = '' | 'pass' | 'fail';

// แปลง row จาก Supabase → InspectionRecord
function rowToRecord(row: any): InspectionRecord {
  return {
    id: row.id,
    robot: row.robot,
    savedAt: row.saved_at,
    info: row.info,
    items: row.items,
    stats: row.stats,
  };
}

export function useHistory() {
  const [records, setRecords] = useState<InspectionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterRobot, setFilterRobot] = useState<FilterRobot>('');
  const [filterResult, setFilterResult] = useState<FilterResult>('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Record<string, string>>({});

  // โหลดข้อมูลครั้งแรก
  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('inspection_records')
        .select('*')
        .order('saved_at', { ascending: false });

      if (error) {
        console.error('Fetch error:', error);
      } else {
        setRecords((data ?? []).map(rowToRecord));
      }
      setLoading(false);
    };

    fetchRecords();

    // Realtime — เมื่อมี record ใหม่เข้ามาจากคนอื่น
    const channel = supabase
      .channel('inspection_records_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'inspection_records' },
        payload => {
          if (payload.eventType === 'INSERT') {
            setRecords(prev => [rowToRecord(payload.new), ...prev]);
          }
          if (payload.eventType === 'DELETE') {
            setRecords(prev => prev.filter(r => r.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    // cleanup เมื่อออกจากหน้า
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // ลบ record
  const deleteRecord = useCallback(async (id: string) => {
    const { error } = await supabase
      .from('inspection_records')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Delete error:', error);
      return;
    }
    // Realtime จะ update UI อัตโนมัติ ไม่ต้อง setRecords เอง
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

  // Filter + Sort
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
    records, filtered, loading, summaryStats,
    search, setSearch,
    filterRobot, setFilterRobot,
    filterResult, setFilterResult,
    sortOrder, toggleSort,
    expandedId, toggleExpand,
    activeTab, setTab,
    deleteRecord,
  };
}  