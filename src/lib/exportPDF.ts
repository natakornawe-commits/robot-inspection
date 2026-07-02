import type { RobotType, InspectionState, InspectionInfo } from '@/types';
import { getSectionsStatic } from '@/lib/utils';

function stripEmoji(str: string): string {
  return str.replace(/[\u{1F000}-\u{1FFFF}|\u{2600}-\u{26FF}|\u{2700}-\u{27BF}|\u{FE00}-\u{FE0F}|\u{1F900}-\u{1F9FF}|\u{1FA00}-\u{1FA6F}|\u{1FA70}-\u{1FAFF}|\u2600-\u26FF|\u2700-\u27BF]/gu, '').trim();
}
export function exportPDF(
  robot: RobotType,
  state: InspectionState,
  info: InspectionInfo,
  stats: { done: number; bad: number; na: number; total: number },
  sections?: any[]
) {
  const secs = sections && sections.length > 0 ? sections : getSectionsStatic(robot);

  // สร้าง rows แบบละเอียด พร้อมรูปภาพ
  let itemsHTML = '';
  secs.forEach(sec => {
    // Section Header
    itemsHTML += `
      <tr class="section-header-row">
        <td colspan="6">
          <div class="section-header">
           
            <span>${sec.num}. ${stripEmoji(sec.title)}</span>
            <span class="section-sub">— ${stripEmoji(sec.subtitle)}</span>
          </div>
        </td>
      </tr>`;

    sec.sub.forEach((sub: any) => {
      // SubSection Header
      itemsHTML += `
        <tr class="subsection-row">
          <td colspan="6">
            <div class="subsection-title">◆ ${stripEmoji(sub.title)}</div>
          </td>
        </tr>`;

      sub.items.forEach((item: any, idx: number) => {
        const key = `${robot}_${sec.id}_${sub.id}_${item.id}`;
        const s = state[key] ?? { result: null, value: '', action: '', photos: [], notes: '' };

        const resultLabel = s.result === 'good' ? 'V' : s.result === 'bad' ? '/' : s.result === 'na' ? 'N/A' : '-';
        const resultClass = s.result === 'good' ? 'result-good' : s.result === 'bad' ? 'result-bad' : s.result === 'na' ? 'result-na' : 'result-none';

        // รูปภาพ
        const photosHTML = s.photos && s.photos.length > 0
          ? `<div class="photo-row">${s.photos.map((p: string) =>
              `<img src="${p}" class="item-photo">`
            ).join('')}</div>`
          : '';

        // ค่าที่วัดได้
        const valueHTML = s.value
          ? `<div class="measured-value">ค่าที่วัดได้ : <strong>${s.value}${item.unit ? ' ' + item.unit : ''}</strong>
             ${item.ref ? `<span class="ref-value">(${item.ref})</span>` : ''}</div>`
          : item.ref ? `<div class="ref-only">${item.ref}</div>` : '';

        // หมายเหตุ
        const notesHTML = s.notes
          ? `<div class="item-notes"> ${s.notes}</div>`
          : '';

        itemsHTML += `
          <tr class="item-row ${idx % 2 === 0 ? 'even' : ''}">
            <td class="item-num">${sec.num}.${idx + 1}</td>
            <td class="item-label">
              <div>${stripEmoji(item.label)}</div>
              ${valueHTML}
              ${notesHTML}
              ${photosHTML}
            </td>
            <td class="item-action">${s.action || '-'}</td>
            <td class="item-result ${resultClass}">${resultLabel}</td>
          </tr>`;
      });
    });
  });

  const passRate = stats.total > 0 ? Math.round(stats.done / stats.total * 100) : 0;

  const html = `<!DOCTYPE html>
<html><head>
<meta charset="UTF-8">
<title>Inspection Report — ${robot.toUpperCase()}</title>
<style>
  @page { size: A4; margin: 15mm 12mm; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Sarabun', 'TH Sarabun New', Arial, sans-serif; font-size: 11px; color: #1e293b; background: #fff; }

  /* ── HEADER ── */
  .doc-header {
    border: 2px solid #1e3a5f; border-radius: 4px;
    margin-bottom: 10px; overflow: hidden;
  }
  .doc-header-top {
    background: #1e3a5f; color: white;
    padding: 10px 16px;
    display: flex; justify-content: space-between; align-items: center;
  }
  .company-name { font-size: 16px; font-weight: 700; }
  .report-title { font-size: 13px; opacity: 0.9; margin-top: 2px; }
  .doc-header-logo {
    width: 60px; height: 60px; background: white;
    border-radius: 4px; display: flex; align-items: center;
    justify-content: center; font-size: 24px; font-weight: 900;
    color: #1e3a5f;
  }
  .doc-header-bottom {
    padding: 8px 16px;
    display: grid; grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 8px; background: #f8fafc;
  }
  .info-cell { display: flex; flex-direction: column; }
  .info-cell-label {
    font-size: 9px; color: #64748b; text-transform: uppercase;
    letter-spacing: .05em; font-weight: 600;
  }
  .info-cell-value { font-size: 12px; font-weight: 600; color: #1e293b; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-top: 2px; }

  /* ── SUMMARY BAR ── */
  .summary-bar {
    display: grid; grid-template-columns: repeat(5,1fr);
    gap: 6px; margin-bottom: 10px;
  }
  .sum-cell {
    border: 1px solid; border-radius: 4px;
    padding: 8px; text-align: center;
  }
  .sum-cell.green  { background: #f0fdf4; border-color: #86efac; }
  .sum-cell.red    { background: #fef2f2; border-color: #fca5a5; }
  .sum-cell.yellow { background: #fffbeb; border-color: #fcd34d; }
  .sum-cell.gray   { background: #f8fafc; border-color: #e2e8f0; }
  .sum-cell.blue   { background: #eff6ff; border-color: #93c5fd; }
  .sum-val  { font-size: 20px; font-weight: 700; }
  .sum-label{ font-size: 9px; color: #64748b; margin-top: 2px; }

  /* ── TABLE ── */
  table { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
  th {
    background: #1e3a5f; color: white;
    padding: 7px 8px; font-size: 10px; font-weight: 600;
    text-align: left; border: 1px solid #1e3a5f;
  }
  td { padding: 6px 8px; border: 1px solid #e2e8f0; vertical-align: top; }

  .section-header-row td { padding: 0; border: none; }
  .section-header {
    background: #1e3a5f; color: white;
    padding: 7px 10px; font-size: 12px; font-weight: 700;
    display: flex; align-items: center; gap: 8px;
    margin-top: 8px;
  }
  .section-icon { font-size: 14px; }
  .section-sub  { font-weight: 400; font-size: 10px; opacity: 0.85; }

  .subsection-row td { padding: 0; border-left: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; }
  .subsection-title {
    background: #e8edf5; color: #1e3a5f;
    padding: 5px 12px; font-size: 11px; font-weight: 600;
  }

  .item-row.even td { background: #f8fafc; }
  .item-num  { width: 40px; text-align: center; color: #64748b; font-size: 10px; font-weight: 600; }
  .item-label{ font-size: 11px; }
  .item-action{ width: 50px; text-align: center; color: #64748b; font-size: 11px; }
  .item-result{ width: 45px; text-align: center; font-weight: 700; font-size: 14px; }

  .result-good { color: #16a34a; background: #f0fdf4; }
  .result-bad  { color: #dc2626; background: #fef2f2; }
  .result-na   { color: #64748b; background: #f8fafc; }
  .result-none { color: #94a3b8; }

  /* ── VALUES & PHOTOS ── */
  .measured-value {
    margin-top: 4px; padding: 4px 8px;
    background: #fffbeb; border-left: 3px solid #f59e0b;
    font-size: 10px; border-radius: 0 4px 4px 0;
  }
  .ref-value { color: #64748b; font-size: 9px; margin-left: 6px; }
  .ref-only  { margin-top: 3px; font-size: 10px; color: #f59e0b; }
  .item-notes{ margin-top: 3px; font-size: 10px; color: #64748b; font-style: italic; }

  .photo-row {
    display: flex; flex-wrap: wrap; gap: 6px;
    margin-top: 6px; padding-top: 6px;
    border-top: 1px dashed #e2e8f0;
  }
  .item-photo {
    width: 300px; height: 300px; object-fit: cover;
    border-radius: 4px; border: 1px solid #e2e8f0;
  }

  /* ── SIGNATURE ── */
  .signature-section {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 40px; margin-top: 20px;
    border-top: 2px solid #1e3a5f; padding-top: 16px;
  }
  .sign-box { text-align: center; }
  .sign-line { border-bottom: 1px solid #94a3b8; margin: 32px auto 4px; width: 80%; }
  .sign-label { font-size: 10px; color: #64748b; }
  .sign-name  { font-size: 11px; font-weight: 600; margin-top: 2px; }

  /* ── FOOTER ── */
  .doc-footer {
    margin-top: 12px; padding-top: 8px;
    border-top: 1px solid #e2e8f0;
    display: flex; justify-content: space-between;
    font-size: 9px; color: #94a3b8;
  }

  @media print {
    body { font-size: 10px; }
    .item-photo { width: 200px; height: 200px; }
    .section-header { margin-top: 4px; }
  }
</style>
</head>
<body>

  <!-- HEADER -->
  <div class="doc-header">
    <div class="doc-header-top">
      <div>
        <div class="company-name">ACETEC TECHNOLOGY CO., LTD.</div>
        <div class="report-title">General Inspection and Maintenance Report — ${robot.toUpperCase()} Robot</div>
      </div>
      <div class="doc-header-logo">AI</div>
    </div>
    <div class="doc-header-bottom">
      <div class="info-cell">
        <div class="info-cell-label">วันที่ตรวจสอบ</div>
        <div class="info-cell-value">${info.date || '-'}</div>
      </div>
      <div class="info-cell">
        <div class="info-cell-label">Robot No.</div>
        <div class="info-cell-value">${info.robot || '-'}</div>
      </div>
      <div class="info-cell">
        <div class="info-cell-label">ผู้ตรวจสอบ / Inspector</div>
        <div class="info-cell-value">${info.inspector || '-'}</div>
      </div>
      <div class="info-cell">
        <div class="info-cell-label">รับทราบโดย / Witness</div>
        <div class="info-cell-value">${info.witness || '-'}</div>
      </div>
    </div>
  </div>

  <!-- SUMMARY -->
  <div class="summary-bar">
    <div class="sum-cell green">
      <div class="sum-val" style="color:#16a34a">${stats.done}</div>
      <div class="sum-label">ผ่าน (V)</div>
    </div>
    <div class="sum-cell red">
      <div class="sum-val" style="color:#dc2626">${stats.bad}</div>
      <div class="sum-label">ไม่ผ่าน (/)</div>
    </div>
    <div class="sum-cell yellow">
      <div class="sum-val" style="color:#d97706">${stats.na}</div>
      <div class="sum-label">N/A</div>
    </div>
    <div class="sum-cell gray">
      <div class="sum-val" style="color:#475569">${stats.total}</div>
      <div class="sum-label">รายการทั้งหมด</div>
    </div>
    <div class="sum-cell blue">
      <div class="sum-val" style="color:#2563eb">${passRate}%</div>
      <div class="sum-label">อัตราผ่าน</div>
    </div>
  </div>

  <!-- CHECKLIST TABLE -->
  <table>
    <thead>
      <tr>
        <th style="width:40px">ลำดับ</th>
        <th>รายละเอียด / ผลการตรวจสอบ</th>
        <th style="width:50px">การกระทำ</th>
        <th style="width:45px">ผลลัพธ์</th>
      </tr>
    </thead>
    <tbody>${itemsHTML}</tbody>
  </table>

  <!-- LEGEND -->
  <table style="margin-bottom:12px">
    <thead>
      <tr>
        <th colspan="7">สัญลักษณ์ที่ใช้ในการตรวจสอบ</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#f8fafc;text-align:center">
        <td><strong>CL</strong><br><span style="font-size:9px">ทำความสะอาด</span></td>
        <td><strong>O</strong><br><span style="font-size:9px">ใส่น้ำมัน</span></td>
        <td><strong>G</strong><br><span style="font-size:9px">ใส่จาระบี</span></td>
        <td><strong>A</strong><br><span style="font-size:9px">ปรับ</span></td>
        <td><strong>W</strong><br><span style="font-size:9px">ถอดชิ้นส่วน</span></td>
        <td><strong>X</strong><br><span style="font-size:9px">เปลี่ยน</span></td>
        <td><strong>R</strong><br><span style="font-size:9px">ซ่อมแซม</span></td>
      </tr>
      <tr style="text-align:center">
        <td colspan="3" style="background:#f0fdf4;color:#16a34a;font-weight:700">V = ดี / ผ่าน</td>
        <td colspan="2" style="background:#fef2f2;color:#dc2626;font-weight:700">/ = ไม่ดี / ไม่ผ่าน</td>
        <td colspan="2" style="background:#f8fafc;color:#64748b;font-weight:700">N/A = ไม่เกี่ยวข้อง</td>
      </tr>
    </tbody>
  </table>

  <!-- SIGNATURE -->
  <div class="signature-section">
    <div class="sign-box">
      <div class="sign-line"></div>
      <div class="sign-label">ผู้ตรวจสอบ / Inspector</div>
      <div class="sign-name">(${info.inspector || '...................................'})</div>
    </div>
    <div class="sign-box">
      <div class="sign-line"></div>
      <div class="sign-label">รับทราบโดย / Witness</div>
      <div class="sign-name">(${info.witness || '...................................'})</div>
    </div>
  </div>

  <!-- FOOTER -->
  <div class="doc-footer">
    <span>ACETEC TECHNOLOGY CO., LTD. — Inspection Report</span>
    <span>วันที่พิมพ์: ${new Date().toLocaleDateString('th-TH', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
  </div>

</body></html>`;

  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, '_blank');
  if (!win) {
    alert('กรุณาอนุญาต Popup ในบราวเซอร์ก่อนครับ');
    return;
  }
  win.onload = () => {
    win.print();
    URL.revokeObjectURL(url);
  };
}