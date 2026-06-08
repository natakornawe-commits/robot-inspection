'use client';

import type { InspectionRecord } from '@/types';
import { getSections, makeItemKey } from '@/data';

interface Props {
  record: InspectionRecord;
  activeTab: string;
  onSetTab: (tab: string) => void;
}

export default function RecordDetailTabs({ record, activeTab, onSetTab }: Props) {
  return (
    <div className="record-detail">
      <div className="detail-tabs">
        {(['summary', 'items', 'photos'] as const).map(tab => (
          <div
            key={tab}
            className={`detail-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => onSetTab(tab)}
          >
            {tab === 'summary' ? '📊 สรุป' : tab === 'items' ? '📋 รายการ' : '📷 รูปภาพ'}
          </div>
        ))}
      </div>

      {activeTab === 'summary' && <SummaryTab record={record} />}
      {activeTab === 'items'   && <ItemsTab   record={record} />}
      {activeTab === 'photos'  && <PhotosTab  record={record} />}
    </div>
  );
}

/* ── Summary Tab ── */
function SummaryTab({ record }: { record: InspectionRecord }) {
  const { info, stats } = record;
  const passRate = stats.total > 0 ? Math.round(stats.done / stats.total * 100) : 0;

  return (
    <div className="detail-panel active">
      <div className="summary-grid">
        <div className="summary-box green">
          <div className="summary-box-val" style={{ color: 'var(--green)' }}>{stats.done}</div>
          <div className="summary-box-label">ผ่าน (V)</div>
        </div>
        <div className="summary-box red">
          <div className="summary-box-val" style={{ color: 'var(--red)' }}>{stats.bad}</div>
          <div className="summary-box-label">ไม่ผ่าน (/)</div>
        </div>
        <div className="summary-box yellow">
          <div className="summary-box-val" style={{ color: 'var(--yellow)' }}>{stats.na}</div>
          <div className="summary-box-label">N/A</div>
        </div>
        <div className="summary-box blue">
          <div className="summary-box-val" style={{ color: 'var(--accent)' }}>{passRate}%</div>
          <div className="summary-box-label">อัตราผ่าน</div>
        </div>
      </div>

      <div className="section-divider">
        <div className="section-divider-label">ข้อมูลการตรวจสอบ</div>
        <div className="section-divider-line" />
      </div>

      <div className="info-table">
        {[
          ['วันที่ตรวจสอบ', info.date],
          ['Robot No.', info.robotNo],
          ['ผู้ตรวจสอบ', info.inspector],
          ['Inspection Witness', info.witness],
        ].map(([label, value]) => (
          <div key={label} className="info-row">
            <div className="info-row-label">{label}</div>
            <div className="info-row-value">{value || '-'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Items Tab ── */
function ItemsTab({ record }: { record: InspectionRecord }) {
  const sections = getSections(record.robot);
  const items = record.items ?? {};

  return (
    <div className="detail-panel active">
      <table className="items-table">
        <thead>
          <tr>
            <th style={{ width: 44 }}>ลำดับ</th>
            <th>รายละเอียด</th>
            <th style={{ width: 70 }}>ค่าที่วัด</th>
            <th style={{ width: 60 }}>ผลลัพธ์</th>
            <th style={{ width: 60 }}>การกระทำ</th>
          </tr>
        </thead>
        <tbody>
          {sections.map(sec => (
            <>
              <tr key={`head-${sec.id}`}>
                <td colSpan={5} style={{ padding: 0 }}>
                  <div className="section-group-head">
                    {sec.icon} {sec.num}. {sec.title} — {sec.subtitle}
                  </div>
                </td>
              </tr>
              {sec.sub.map(sub =>
                sub.items.map((item, idx) => {
                  const key = makeItemKey(record.robot, sec.id, sub.id, item.id);
                  const s = items[key] ?? {};
                  const result = s.result;
                  const chipCls = result === 'good' ? 'good' : result === 'bad' ? 'bad' : result === 'na' ? 'na' : 'none';
                  const chipLabel = result === 'good' ? 'V' : result === 'bad' ? '/' : result === 'na' ? 'N/A' : '-';
                  return (
                    <tr key={key}>
                      <td style={{ color: 'var(--text3)', textAlign: 'center', fontFamily: 'monospace' }}>
                        {sec.num}.{idx + 1}
                      </td>
                      <td>
                        {item.label}
                        {item.ref && <><br /><span style={{ fontSize: 10, color: 'var(--yellow)' }}>{item.ref}</span></>}
                        {s.notes && <><br /><span style={{ fontSize: 11, color: 'var(--text3)' }}>📝 {s.notes}</span></>}
                      </td>
                      <td style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: 12 }}>
                        {s.value ? `${s.value}${item.unit ? ' ' + item.unit : ''}` : '-'}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span className={`result-chip ${chipCls}`}>{chipLabel}</span>
                      </td>
                      <td style={{ textAlign: 'center', color: 'var(--text3)', fontFamily: 'monospace' }}>
                        {s.action || '-'}
                      </td>
                    </tr>
                  );
                })
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Photos Tab ── */
function PhotosTab({ record }: { record: InspectionRecord }) {
  const sections = getSections(record.robot);
  const items = record.items ?? {};
  const photos: { src: string; label: string }[] = [];

  sections.forEach(sec =>
    sec.sub.forEach(sub =>
      sub.items.forEach(item => {
        const key = makeItemKey(record.robot, sec.id, sub.id, item.id);
        const s = items[key] ?? {};
        (s.photos ?? []).forEach(p => photos.push({ src: p, label: item.label }));
      })
    )
  );

  if (photos.length === 0) {
    return (
      <div className="detail-panel active" style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text3)' }}>
        📷 ไม่มีรูปภาพในรายการนี้
      </div>
    );
  }

  return (
    <div className="detail-panel active">
      <div className="photos-grid">
        {photos.map((p, i) => (
          <div key={i} className="photo-tile" onClick={() => window.open(p.src, '_blank')}>
            <img src={p.src} alt={p.label} loading="lazy" />
            <div className="photo-label">{p.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}