'use client';

import type { RobotType, Section, InspectionState } from '@/types';
import { makeItemKey } from '@/data';

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

        <div className="robot-selector">
          <button
            className={`robot-tab ${robot === 'haipick' ? 'active' : ''}`}
            onClick={() => onSwitchRobot('haipick')}
          >HAIPICK</button>
          <button
            className={`robot-tab ${robot === 'a71' ? 'active' : ''}`}
            onClick={() => onSwitchRobot('a71')}
          >A71</button>
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
          <button
            className={`robot-tab ${robot === 'haipick' ? 'active' : ''}`}
            onClick={() => onSwitchRobot('haipick')}
          >HAIPICK</button>
          <button
            className={`robot-tab ${robot === 'a71' ? 'active' : ''}`}
            onClick={() => onSwitchRobot('a71')}
          >A71</button>
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