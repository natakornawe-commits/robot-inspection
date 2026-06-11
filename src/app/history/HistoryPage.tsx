'use client';

import { useState  } from 'react';
import Link from 'next/link';
import { useHistory } from '@/hooks/useHistory';
import RecordCard from '@/components/RecordCard';
import { exportPDF } from '@/lib/exportPDF';
import type { InspectionRecord } from '@/types';
import { supabase } from '@/lib/supabase'; 


export default function HistoryPage() {
  const {
    filtered, summaryStats,
    search, setSearch,
    filterRobot, setFilterRobot,
    filterResult, setFilterResult,
    sortOrder, toggleSort,
    expandedId, toggleExpand,
    activeTab, setTab,
    deleteRecord,
  } = useHistory();

  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const handleExportPDF = (id: string) => {
    const record = filtered.find(r => r.id === id);
    if (!record) return;
    exportPDF(record.robot, record.items, {
      date: record.info.date,
      robot: record.info.robotNo,
      inspector: record.info.inspector,
      witness: record.info.witness,
    }, record.stats);
  };

  const confirmDelete = (id: string) => setDeleteTarget(id);
  const closeConfirm = () => setDeleteTarget(null);
  const executeDelete = () => {
    if (!deleteTarget) return;
    deleteRecord(deleteTarget);
    closeConfirm();
  };

  return (
    <>
      {/* TOPBAR */}
      <div className="topbar">
        <div className="topbar-left">
          <div className="logo-badge">AI</div>
          <div>
            <div className="logo-text">ACETEC Inspection System</div>
            <div className="logo-sub">ประวัติการตรวจสอบ</div>
          </div>
        </div>
        <div className="topbar-right">
          <Link href="/" className="btn btn-ghost">← กลับ Checklist</Link>
        </div>
      </div>

      <div className="page">

        {/* SUMMARY STATS */}
        <div className="stats-row fade-in">
          <div className="stat-card">
            <div className="stat-card-val" style={{ color: 'var(--accent)' }}>{summaryStats.total}</div>
            <div className="stat-card-label">รายการทั้งหมด</div>
          </div>
          {/*<div className="stat-card">
            <div className="stat-card-val" style={{ color: 'var(--purple)' }}>{summaryStats.thisMonth}</div>
            <div className="stat-card-label">เดือนนี้</div>
          </div>*/}
          <div className="stat-card">
            <div className="stat-card-val" style={{ color: 'var(--yellow)' }}>{summaryStats.inspectors}</div>
            <div className="stat-card-label">ผู้ตรวจสอบ</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-val" style={{ color: 'var(--green)' }}>{summaryStats.passRate}</div>
            <div className="stat-card-label">อัตราผ่าน (เฉลี่ย)</div>
          </div>
        </div>

        {/* TOOLBAR */}
        <div className="toolbar fade-in">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              className="search-input"
              type="text"
              placeholder="ค้นหา ชื่อผู้ตรวจสอบ, Robot No., วันที่..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select className="filter-select" value={filterRobot} onChange={e => setFilterRobot(e.target.value as any)}>
            <option value="">🤖 ทุกประเภท</option>
            <option value="haipick">HAIPICK</option>
            <option value="a71">A71</option>
          </select>
          <select className="filter-select" value={filterResult} onChange={e => setFilterResult(e.target.value as any)}>
            <option value="">📋 ทุกสถานะ</option>
            <option value="pass">✅ ผ่านทั้งหมด</option>
            <option value="fail">❌ มีรายการไม่ผ่าน</option>
          </select>
          <button className={`sort-btn ${sortOrder === 'asc' ? 'active' : ''}`} onClick={toggleSort}>
            <span>{sortOrder === 'desc' ? '↓' : '↑'}</span>
            {sortOrder === 'desc' ? ' ใหม่สุด' : ' เก่าสุด'}
          </button>
        </div>

        {/* RECORD LIST */}
        <div className="record-list fade-in">
          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <div className="empty-title">
                {summaryStats.total === 0 ? 'ยังไม่มีรายการ' : 'ไม่พบรายการที่ค้นหา'}
              </div>
              <div className="empty-sub">
                {summaryStats.total === 0
                  ? 'กลับไปกรอก Checklist แล้วกด "บันทึก" เพื่อเพิ่มรายการ'
                  : 'ลองเปลี่ยนคำค้นหาหรือตัวกรอง'}
              </div>
            </div>
          ) : (
            filtered.map(record => (
              <RecordCard
                key={record.id}
                record={record}
                isExpanded={expandedId === record.id}
                activeTab={activeTab[record.id] ?? 'summary'}
                onToggle={toggleExpand}
                onSetTab={setTab}
                onDelete={confirmDelete}
                onExportPDF={handleExportPDF}
              />
            ))
          )}
        </div>
      </div>

      {/* DELETE CONFIRM DIALOG */}
      {deleteTarget && (
        <div className="confirm-overlay open">
          <div className="confirm-box">
            <div className="confirm-title">🗑 ลบรายการนี้?</div>
            <div className="confirm-sub">การลบไม่สามารถกู้คืนได้ ต้องการดำเนินการต่อหรือไม่?</div>
            <div className="confirm-actions">
              <button className="btn btn-ghost" onClick={closeConfirm}>ยกเลิก</button>
              <button className="btn btn-danger" onClick={executeDelete}>ลบ</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}