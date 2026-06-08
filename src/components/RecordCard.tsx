'use client';

import type { InspectionRecord } from '@/types';
import RecordDetailTabs from './RecordDetailTabs';

interface RecordCardProps {
  record: InspectionRecord;
  isExpanded: boolean;
  activeTab: string;
  onToggle: (id: string) => void;
  onSetTab: (id: string, tab: string) => void;
  onDelete: (id: string) => void;
  onExportPDF: (id: string) => void;
}

export default function RecordCard({
  record, isExpanded, activeTab,
  onToggle, onSetTab, onDelete, onExportPDF,
}: RecordCardProps) {
  const { id, robot, info = {} as InspectionRecord['info'], stats, savedAt } = record;

  const savedDate = new Date(savedAt);
  const dateStr = savedDate.toLocaleDateString('th-TH', { day: '2-digit', month: 'short', year: 'numeric' });
  const timeStr = savedDate.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

  const pct = stats.total > 0
    ? Math.round((stats.done + stats.bad + stats.na) / stats.total * 100) : 0;
  const passRate = stats.total > 0
    ? Math.round(stats.done / stats.total * 100) : 0;

  return (
    <div className={`record-card ${isExpanded ? 'expanded' : ''}`} id={`card-${id}`}>

      {/* HEAD */}
      <div className="record-head" onClick={() => onToggle(id)}>
        <div className={`record-robot-badge ${robot === 'a71' ? 'a71' : ''}`}>
          {robot.toUpperCase()}
        </div>

        <div className="record-info">
          <div className="record-title">
            {info.robotNo
              ? <strong>{info.robotNo}</strong>
              : <span style={{ color: 'var(--text3)' }}>ไม่ระบุ Robot No.</span>
            }
            {stats.bad > 0
              ? <span className="badge-fail">❌ มีไม่ผ่าน {stats.bad} รายการ</span>
              : stats.done > 0
              ? <span className="badge-pass">✅ ผ่านทั้งหมด</span>
              : null
            }
          </div>
          <div className="record-meta">
            👤 <span>{info.inspector || 'ไม่ระบุ'}</span> &nbsp;·&nbsp;
            📅 <span>{info.date || '-'}</span> &nbsp;·&nbsp;
            🕐 บันทึก {dateStr} {timeStr}
          </div>
        </div>

        <div className="record-mini-stats">
          <div className="mini-stat">
            <div className="mini-stat-val" style={{ color: 'var(--green)' }}>{stats.done}</div>
            <div className="mini-stat-label">ผ่าน</div>
          </div>
          <div className="mini-stat">
            <div className="mini-stat-val" style={{ color: 'var(--red)' }}>{stats.bad}</div>
            <div className="mini-stat-label">ไม่ผ่าน</div>
          </div>
          <div className="mini-stat">
            <div className="mini-stat-val" style={{ color: 'var(--text3)' }}>{stats.na}</div>
            <div className="mini-stat-label">N/A</div>
          </div>
          <div className="badge-pct">{passRate}%</div>
        </div>

        <div className="record-actions" onClick={e => e.stopPropagation()}>
          <button className="btn btn-ghost btn-sm" onClick={() => onExportPDF(id)}>📄 PDF</button>
          <button className="btn-icon" onClick={() => onDelete(id)} title="ลบ">🗑</button>
        </div>
      </div>

      {/* MINI PROGRESS BAR */}
      <div className="mini-progress">
        <div className="mini-progress-fill" style={{ width: `${pct}%` }} />
      </div>

      {/* EXPANDED DETAIL */}
      {isExpanded && (
        <RecordDetailTabs
          record={record}
          activeTab={activeTab}
          onSetTab={(tab) => onSetTab(id, tab)}
        />
      )}
    </div>
  );
}