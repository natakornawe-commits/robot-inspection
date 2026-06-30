'use client';

import type { RobotType, Section, InspectionState } from '@/types';
// ลบ define makeItemKey ออก แล้วเปลี่ยนเป็น
import { makeItemKey } from '@/lib/utils';


interface SidebarProps {
  robot: RobotType;
  sections: Section[];
  state: InspectionState;
  progress: number;
  onSwitchRobot: (r: RobotType) => void;
  onNavClick: (sectionId: string) => void;
}



export default function Sidebar({
  robot, sections, state, progress, onSwitchRobot, onNavClick
}: SidebarProps) {
  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <div className="sidebar">
        <div className="sidebar-header">เลือกประเภทหุ่นยนต์</div>

        <div className="robot-selector" style={{ flexDirection: 'column', gap: 4 }}>
          {([
            { key: 'haipick',        label: 'HAIPICK' },
            { key: 'a71',            label: 'A71' },
            { key: 'a71_v2',         label: 'A71 (v2)' },
            { key: 'rack_charging',  label: 'Rack & Charging' },
            { key: 'server_cabinet', label: 'Server Cabinet' },
            { key: 'station',        label: 'Station' },
          ] as { key: RobotType; label: string }[]).map(r => (
            <button
              key={r.key}
              className={`robot-tab ${robot === r.key ? 'active' : ''}`}
              onClick={() => onSwitchRobot(r.key)}
            >
              {r.label}
            </button>
          ))}
        </div>

        <div className="progress-bar-wrap">
          <div className="progress-bar-row">
            <span className="progress-bar-label">ความคืบหน้าทั้งหมด</span>
            <span className="progress-bar-pct">{progress}%</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div style={{ height: 1, background: 'var(--border)', margin: '8px 0 10px' }} />

        <div id="nav-list">
          {sections.map(sec => {
            let total = 0, doneCount = 0;
            sec.sub.forEach(sub => sub.items.forEach(item => {
              total++;
              const key = makeItemKey(robot, sec.id, sub.id, item.id);
              const s = state[key];
              if (s?.result !== null && s?.result !== undefined) doneCount++;
            }));
            const pct = total > 0 ? Math.round(doneCount / total * 100) : 0;
            const badgeCls = pct === 100 ? 'done' : pct > 0 ? 'partial' : '';

            return (
              <div key={sec.id} className="nav-item" onClick={() => onNavClick(sec.id)}>
                <div className="nav-icon">{sec.icon}</div>
                <div className="nav-label">{sec.num}. {sec.title}</div>
                <div className={`nav-badge ${badgeCls}`}>{doneCount}/{total}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Mobile: Robot Switcher + Progress (แถบบนสุด ใต้ topbar) ── */}
      <div className="mobile-header">
        <div className="mobile-robot-selector">
          {([
            { key: 'haipick',        label: 'HAIPICK' },
            { key: 'a71',            label: 'A71' },
            { key: 'a71_v2',         label: 'A71 v2' },
            { key: 'rack_charging',  label: 'Rack' },
            { key: 'server_cabinet', label: 'Server' },
            { key: 'station',        label: 'Station' },
          ] as { key: RobotType; label: string }[]).map(r => (
            <button
              key={r.key}
              className={`robot-tab ${robot === r.key ? 'active' : ''}`}
              onClick={() => onSwitchRobot(r.key)}
            >
              {r.label}
            </button>
          ))}
        </div>
        <div className="mobile-progress">
          <div className="progress-track" style={{ flex: 1 }}>
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="progress-bar-pct">{progress}%</span>
        </div>
      </div>
    </>
  );
}