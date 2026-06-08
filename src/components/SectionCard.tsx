'use client';

import { useState } from 'react';
import type { Section, InspectionState, ResultType, ActionType, RobotType } from '@/types';
import { makeItemKey } from '@/data';
import CheckItemRow from './CheckItemRow';

interface SectionCardProps {
  section: Section;
  robot: RobotType;
  state: InspectionState;
  getItemState: (key: string) => NonNullable<InspectionState[string]>;
  onSetResult: (key: string, val: ResultType) => void;
  onSetValue: (key: string, val: string) => void;
  onSetAction: (key: string, val: ActionType) => void;
  onOpenPhoto: (key: string, label: string) => void;
}

export default function SectionCard({
  section, robot, state, getItemState,
  onSetResult, onSetValue, onSetAction, onOpenPhoto,
}: SectionCardProps) {
  const [open, setOpen] = useState(true);

  let total = 0, doneCount = 0;
  section.sub.forEach(sub => sub.items.forEach(item => {
    total++;
    const key = makeItemKey(robot, section.id, sub.id, item.id);
    const s = state[key];
    if (s?.result !== null && s?.result !== undefined) doneCount++;
  }));

  return (
    <div className={`section-card ${open ? 'open' : ''}`} id={`card-${section.id}`}>
      <div
        className={`section-head ${!open ? 'collapsed' : ''}`}
        onClick={() => setOpen(v => !v)}
      >
        <div className="section-num">{section.num}</div>
        <div style={{ flex: 1 }}>
          <div className="section-title">
            {section.title}{' '}
            <span style={{ color: 'var(--text3)', fontWeight: 400, fontSize: 12 }}>
              — {section.subtitle}
            </span>
          </div>
        </div>
        <div className="section-meta">
          <div className="section-count">{doneCount}/{total}</div>
          <div className="chevron">▾</div>
        </div>
      </div>

      <div className="section-body">
        {section.sub.map(sub => (
          <div key={sub.id} className="subsection">
            <div className="subsection-head">
              <div className="subsection-dot" />
              <div className="subsection-title">{sub.title}</div>
            </div>
            {sub.items.map((item, idx) => {
              const key = makeItemKey(robot, section.id, sub.id, item.id);
              return (
                <CheckItemRow
                  key={item.id}
                  item={item}
                  num={idx + 1}
                  itemKey={key}
                  itemState={getItemState(key)}
                  onSetResult={onSetResult}
                  onSetValue={onSetValue}
                  onSetAction={onSetAction}
                  onOpenPhoto={onOpenPhoto}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
