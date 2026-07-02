'use client';

import Link from 'next/link';

interface TopbarProps {
  onClear: () => void;
  onExport: () => void;
}

export default function Topbar({ onClear, onExport }: TopbarProps) {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="logo-badge">AIS</div>
        <div className="logo-text-wrap">
          <div className="logo-text">ACETEC Inspection System</div>
          <div className="logo-sub">Robot Maintenance Checklist</div>
        </div>
      </div>
      <div className="topbar-right">
        <Link href="/history" className="btn btn-ghost">
          <span className="btn-icon-only">🕐</span>
          <span className="btn-text">History</span>
        </Link>
        <Link href="/admin" className="btn btn-ghost">
          <span className="btn-icon-only">⚙️</span>
          <span className="btn-text">Admin</span>
        </Link>
        <button className="btn btn-ghost" onClick={onClear}>
          <span className="btn-icon-only">🗑</span>
          <span className="btn-text">ล้างข้อมูล</span>
        </button>
        <button className="btn btn-primary" onClick={onExport}>
          <span className="btn-icon-only">⬇</span>
          <span className="btn-text">Export PDF</span>
        </button>
      </div>
    </div>
  );
}