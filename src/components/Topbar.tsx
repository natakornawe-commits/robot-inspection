'use client';

interface TopbarProps {
  onClear: () => void;
  onExport: () => void;
}

export default function Topbar({ onClear, onExport }: TopbarProps) {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="logo-badge">AI</div>
        <div>
          <div className="logo-text">ACETEC Inspection System</div>
          <div className="logo-sub">Robot Maintenance Checklist</div>
        </div>
      </div>
      <div className="topbar-right">
        <button className="btn btn-ghost" onClick={onClear}>🗑 ล้างข้อมูล</button>
        <button className="btn btn-primary" onClick={onExport}>⬇ Export PDF</button>
      </div>
    </div>
  );
}
