'use client';

import type { InspectionInfo } from '@/types';

interface InfoPanelProps {
  info: InspectionInfo;
  onChange: (info: InspectionInfo) => void;
}

export default function InfoPanel({ info, onChange }: InfoPanelProps) {
  const set = (field: keyof InspectionInfo, value: string) =>
    onChange({ ...info, [field]: value });

  return (
    <div className="info-panel fade-in">
      <div className="info-field">
        <label className="info-label">วันที่ตรวจสอบ</label>
        <input
          className="info-input"
          type="date"
          value={info.date}
          onChange={e => set('date', e.target.value)}
        />
      </div>
      <div className="info-field">
        <label className="info-label">Robot No.</label>
        <input
          className="info-input"
          type="text"
          placeholder="เช่น HAIPICK-001"
          value={info.robot}
          onChange={e => set('robot', e.target.value)}
        />
      </div>
      <div className="info-field">
        <label className="info-label">ชื่อผู้ตรวจสอบ</label>
        <input
          className="info-input"
          type="text"
          placeholder="ชื่อ-นามสกุล"
          value={info.inspector}
          onChange={e => set('inspector', e.target.value)}
        />
      </div>
      <div className="info-field">
        <label className="info-label">รับทราบโดย (Witness)</label>
        <input
          className="info-input"
          type="text"
          placeholder="ชื่อ-นามสกุล"
          value={info.witness}
          onChange={e => set('witness', e.target.value)}
        />
      </div>
    </div>
  );
}
