'use client';

interface ExportBarProps {
  stats: { done: number; bad: number; na: number; total: number };
  onSave: () => void;
  onExport: () => void;
}

export default function ExportBar({ stats, onSave, onExport }: ExportBarProps) {
  return (
    <div className="export-bar">
      <div className="export-stats">
        <div className="export-stat">
          <div className="stat-val green">{stats.done}</div>
          <div className="stat-label">ผ่าน ✓</div>
        </div>
        <div className="export-stat">
          <div className="stat-val" style={{ color: 'var(--red)' }}>{stats.bad}</div>
          <div className="stat-label">ไม่ผ่าน ✗</div>
        </div>
        <div className="export-stat">
          <div className="stat-val yellow">{stats.na}</div>
          <div className="stat-label">N/A</div>
        </div>
        <div className="export-stat">
          <div className="stat-val blue">{stats.total}</div>
          <div className="stat-label">รายการทั้งหมด</div>
        </div>
      </div>
      <div className="export-actions">
        <button className="btn btn-ghost" onClick={onSave}>💾 บันทึก</button>
        <button className="btn btn-success" onClick={onExport}>📄 Export PDF Report</button>
      </div>
    </div>
  );
}
