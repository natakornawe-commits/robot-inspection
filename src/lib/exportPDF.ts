import type { RobotType, InspectionState, InspectionInfo } from '@/types';
import { getSections, makeItemKey } from '@/data';

export function exportPDF(
  robot: RobotType,
  state: InspectionState,
  info: InspectionInfo,
  stats: { done: number; bad: number; na: number; total: number }
) {
  const sections = getSections(robot);

  let rows = '';
  sections.forEach(sec => {
    sec.sub.forEach(sub => {
      sub.items.forEach((item, idx) => {
        const key = makeItemKey(robot, sec.id, sub.id, item.id);
        const s = state[key] ?? { result: null, value: '', action: '', photos: [], notes: '' };
        const resultLabel = s.result === 'good' ? 'V' : s.result === 'bad' ? '/' : s.result === 'na' ? 'N/A' : '-';
        const resultColor = s.result === 'good' ? '#22c55e' : s.result === 'bad' ? '#ef4444' : '#94a3b8';
        rows += `
          <tr>
            <td style="color:#94a3b8;font-size:11px;text-align:center">${sec.num}.${idx + 1}</td>
            <td style="color:#64748b;font-size:11px">${sec.title} — ${sub.title.split('—')[0].trim()}</td>
            <td>${item.label}${item.ref ? `<br><span style="font-size:10px;color:#f59e0b">${item.ref}</span>` : ''}</td>
            <td style="text-align:center;font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace">${s.value || '-'}</td>
            <td style="text-align:center;color:${resultColor};font-weight:700;font-size:14px">${resultLabel}</td>
            <td style="text-align:center;color:#94a3b8">${s.action || '-'}</td>
            <td>${s.photos && s.photos.length > 0
            ? s.photos.map(p => `<img src="${p}" style="width:48px;height:48px;object-fit:cover;border-radius:4px;margin:2px;">`).join('')
            : '-'}</td>
          </tr>`;
      });
    });
  });

  const html = `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<title>Inspection Report</title>
<style>
  body { font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif; background:#fff; color:#1e293b; margin:0; padding:20px; font-size:12px; }
  .header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:20px; padding-bottom:16px; border-bottom:2px solid #3b82f6; }
  .company { font-size:18px; font-weight:700; color:#1e293b; }
  .report-title { font-size:13px; color:#64748b; margin-top:4px; }
  .badge { background:#3b82f6; color:#fff; padding:4px 12px; border-radius:20px; font-size:11px; font-weight:600; }
  .info-grid { display:grid; grid-template-columns:1fr 1fr 1fr 1fr; gap:12px; margin-bottom:16px; }
  .info-box { background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:10px; }
  .info-label { font-size:10px; color:#94a3b8; text-transform:uppercase; letter-spacing:.05em; }
  .info-value { font-size:13px; font-weight:600; color:#1e293b; margin-top:2px; }
  .summary { display:flex; gap:16px; margin-bottom:16px; }
  .sum-box { flex:1; text-align:center; padding:12px; border-radius:8px; }
  .sum-box.green { background:#f0fdf4; border:1px solid #86efac; }
  .sum-box.red   { background:#fef2f2; border:1px solid #fca5a5; }
  .sum-box.gray  { background:#f8fafc; border:1px solid #e2e8f0; }
  .sum-val { font-size:24px; font-weight:700; }
  .sum-label { font-size:10px; color:#64748b; margin-top:2px; }
  table { width:100%; border-collapse:collapse; }
  th { background:#1e293b; color:#fff; padding:8px 10px; font-size:11px; font-weight:600; text-align:left; }
  td { padding:8px 10px; border-bottom:1px solid #f1f5f9; vertical-align:middle; }
  tr:nth-child(even) td { background:#f8fafc; }
  .footer { margin-top:24px; padding-top:16px; border-top:1px solid #e2e8f0; display:flex; justify-content:space-between; }
  .sign-box { text-align:center; }
  .sign-line { width:160px; border-bottom:1px solid #94a3b8; margin:24px auto 4px; }
  .sign-label { font-size:10px; color:#94a3b8; }
  @media print { body { padding:10px; } }
</style>
</head><body>
  <div class="header">
    <div>
      <div class="company">ACETEC TECHNOLOGY CO.,LTD.</div>
      <div class="report-title">General Inspection and Maintenance Report — ${robot.toUpperCase()} Robot</div>
    </div>
    <div class="badge">Inspection Report</div>
  </div>
  <div class="info-grid">
    <div class="info-box"><div class="info-label">วันที่ตรวจสอบ</div><div class="info-value">${info.date || '-'}</div></div>
    <div class="info-box"><div class="info-label">Robot No.</div><div class="info-value">${info.robot || '-'}</div></div>
    <div class="info-box"><div class="info-label">ผู้ตรวจสอบ</div><div class="info-value">${info.inspector || '-'}</div></div>
    <div class="info-box"><div class="info-label">Inspection Witness</div><div class="info-value">${info.witness || '-'}</div></div>
  </div>
  <div class="summary">
    <div class="sum-box green"><div class="sum-val" style="color:#16a34a">${stats.done}</div><div class="sum-label">ผ่าน (V)</div></div>
    <div class="sum-box red"><div class="sum-val" style="color:#dc2626">${stats.bad}</div><div class="sum-label">ไม่ผ่าน (/)</div></div>
    <div class="sum-box gray"><div class="sum-val" style="color:#64748b">${stats.na}</div><div class="sum-label">N/A</div></div>
    <div class="sum-box gray"><div class="sum-val" style="color:#3b82f6">${stats.total}</div><div class="sum-label">รายการทั้งหมด</div></div>
  </div>
  <table>
    <thead>
      <tr>
        <th style="width:40px">ลำดับ</th>
        <th style="width:120px">ชุดชิ้นส่วน</th>
        <th>รายละเอียด</th>
        <th style="width:70px">ค่าที่วัด</th>
        <th style="width:50px">ผลลัพธ์</th>
        <th style="width:60px">การกระทำ</th>
        <th style="width:120px">รูปภาพ</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>
  <div class="footer">
    <div class="sign-box">
      <div class="sign-line"></div>
      <div class="sign-label">ผู้ตรวจสอบ / Inspector</div>
      <div style="font-size:11px;margin-top:2px;color:#1e293b">(${info.inspector || '-'})</div>
    </div>
    <div class="sign-box">
      <div class="sign-line"></div>
      <div class="sign-label">รับทราบโดย / Witness</div>
      <div style="font-size:11px;margin-top:2px;color:#1e293b">(${info.witness || '-'})</div>
    </div>
  </div>
</body></html>`;

  const win = window.open('', '_blank');
  if (!win) return;
  win.document.write(html);
  win.document.close();
  win.onload = () => win.print();
}
