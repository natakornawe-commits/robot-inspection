export default function Legend() {
  return (
    <div className="legend fade-in">
      <div className="legend-group">
        <div className="legend-title">ผลลัพธ์ (Result)</div>
        <div className="legend-items">
          <div className="legend-chip good-chip"><span className="code">V</span> ดี / ผ่าน</div>
          <div className="legend-chip bad-chip"><span className="code">/</span> ไม่ดี / ไม่ผ่าน</div>
          <div className="legend-chip na-chip"><span className="code">N/A</span> -</div>
        </div>
      </div>
      <div className="legend-group">
        <div className="legend-title">การกระทำ (Action)</div>
        <div className="legend-items">
          {[
            ['CL', 'ทำความสะอาด'], ['O', 'ใส่น้ำมัน'], ['G', 'ใส่จาระบี'],
            ['A', 'ปรับ'], ['W', 'ถอดชิ้นส่วน'], ['X', 'เปลี่ยน'], ['R', 'ซ่อมแซม'],
          ].map(([code, label]) => (
            <div key={code} className="legend-chip">
              <span className="code">{code}</span> {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
