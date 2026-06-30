'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchChecklist, saveChecklist } from '@/lib/checklistService';
import type { RobotType, Section, SubSection, CheckItem } from '@/types';


export default function AdminPage() {
  const [robot, setRobot] = useState<RobotType>('haipick');
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');
  
  // โหลด checklist
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchChecklist(robot);
      setSections(data);
      setLoading(false);
    };
    load();
  }, [robot]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  // บันทึก
  const handleSave = async () => {
    setSaving(true);
    const ok = await saveChecklist(robot, sections);
    setSaving(false);
    showToast(ok ? '✅ บันทึกสำเร็จ' : '❌ บันทึกไม่สำเร็จ');
  };

  // ── Section ──
  const addSection = () => {
    const newSec: Section = {
      id: `s${Date.now()}`,
      num: String(sections.length + 1),
      icon: '🔧',
      title: 'Section ใหม่',
      subtitle: '',
      sub: [],
    };
    setSections(prev => [...prev, newSec]);
  };

  const deleteSection = (sIdx: number) => {
    if (!confirm('ลบ Section นี้?')) return;
    setSections(prev => prev.filter((_, i) => i !== sIdx));
  };

  const updateSection = (sIdx: number, field: keyof Section, value: string) => {
    setSections(prev => prev.map((sec, i) =>
      i === sIdx ? { ...sec, [field]: value } : sec
    ));
  };

  // ── SubSection ──
  const addSubSection = (sIdx: number) => {
    const newSub: SubSection = {
      id: `sub${Date.now()}`,
      title: 'SubSection ใหม่',
      items: [],
    };
    setSections(prev => prev.map((sec, i) =>
      i === sIdx ? { ...sec, sub: [...sec.sub, newSub] } : sec
    ));
  };

  const deleteSubSection = (sIdx: number, subIdx: number) => {
    if (!confirm('ลบ SubSection นี้?')) return;
    setSections(prev => prev.map((sec, i) =>
      i === sIdx
        ? { ...sec, sub: sec.sub.filter((_, j) => j !== subIdx) }
        : sec
    ));
  };

  const updateSubSection = (sIdx: number, subIdx: number, value: string) => {
    setSections(prev => prev.map((sec, i) =>
      i === sIdx
        ? {
            ...sec,
            sub: sec.sub.map((sub, j) =>
              j === subIdx ? { ...sub, title: value } : sub
            ),
          }
        : sec
    ));
  };

  // ── Item ──
  const addItem = (sIdx: number, subIdx: number) => {
    const newItem: CheckItem = {
      id: `i${Date.now()}`,
      label: 'รายการใหม่',
      hasValue: false,
    };
    setSections(prev => prev.map((sec, i) =>
      i === sIdx
        ? {
            ...sec,
            sub: sec.sub.map((sub, j) =>
              j === subIdx
                ? { ...sub, items: [...sub.items, newItem] }
                : sub
            ),
          }
        : sec
    ));
  };

  const deleteItem = (sIdx: number, subIdx: number, itemIdx: number) => {
    setSections(prev => prev.map((sec, i) =>
      i === sIdx
        ? {
            ...sec,
            sub: sec.sub.map((sub, j) =>
              j === subIdx
                ? { ...sub, items: sub.items.filter((_, k) => k !== itemIdx) }
                : sub
            ),
          }
        : sec
    ));
  };

  const updateItem = (
    sIdx: number,
    subIdx: number,
    itemIdx: number,
    field: keyof CheckItem,
    value: string | boolean
  ) => {
    setSections(prev => prev.map((sec, i) =>
      i === sIdx
        ? {
            ...sec,
            sub: sec.sub.map((sub, j) =>
              j === subIdx
                ? {
                    ...sub,
                    items: sub.items.map((item, k) =>
                      k === itemIdx ? { ...item, [field]: value } : item
                    ),
                  }
                : sub
            ),
          }
        : sec
    ));
  };

  return (
    <>
      {/* TOPBAR */}
      <div className="topbar">
        <div className="topbar-left">
          <div className="logo-badge">AI</div>
          <div>
            <div className="logo-text">ACETEC Inspection System</div>
            <div className="logo-sub">Admin — Checklist Editor</div>
          </div>
        </div>
        <div className="topbar-right">
          <Link href="/" className="btn btn-ghost">← กลับ Checklist</Link>
          <button
            className="btn btn-success"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? '⏳ กำลังบันทึก...' : '💾 บันทึก'}
          </button>
        </div>
      </div>

      <div className="page">

        {/* Robot Selector */}
        <div className="admin-robot-selector">
          {(['haipick', 'a71', 'a71_v2', 'rack_charging', 'server_cabinet', 'station'] as RobotType[]).map(r => (
            <button
              key={r}
              className={`robot-tab ${robot === r ? 'active' : ''}`}
              onClick={() => setRobot(r)}
            >
              {r.toUpperCase()}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="empty-state">
            <div className="empty-icon">⏳</div>
            <div className="empty-title">กำลังโหลด...</div>
          </div>
        ) : (
          <>
            {/* SECTIONS */}
            {sections.map((sec, sIdx) => (
              <div key={sec.id} className="admin-section">

                {/* Section Header */}
                <div className="admin-section-head">
                  <input
                    className="admin-input"
                    value={sec.icon}
                    onChange={e => updateSection(sIdx, 'icon', e.target.value)}
                    style={{ width: 48, textAlign: 'center' }}
                  />
                  <input
                    className="admin-input"
                    value={sec.title}
                    onChange={e => updateSection(sIdx, 'title', e.target.value)}
                    placeholder="ชื่อ Section"
                    style={{ flex: 1 }}
                  />
                  <input
                    className="admin-input"
                    value={sec.subtitle}
                    onChange={e => updateSection(sIdx, 'subtitle', e.target.value)}
                    placeholder="คำอธิบาย"
                    style={{ flex: 1 }}
                  />
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteSection(sIdx)}
                  >🗑 ลบ Section</button>
                </div>

                {/* SubSections */}
                {sec.sub.map((sub, subIdx) => (
                  <div key={sub.id} className="admin-subsection">

                    {/* SubSection Header */}
                    <div className="admin-subsection-head">
                      <span className="admin-sub-dot" />
                      <input
                        className="admin-input"
                        value={sub.title}
                        onChange={e => updateSubSection(sIdx, subIdx, e.target.value)}
                        placeholder="ชื่อ SubSection"
                        style={{ flex: 1 }}
                      />
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteSubSection(sIdx, subIdx)}
                      >🗑</button>
                    </div>

                    {/* Items */}
                    {sub.items.map((item, itemIdx) => (
                      <div key={item.id} className="admin-item">
                        <span className="admin-item-num">{itemIdx + 1}</span>
                        <input
                          className="admin-input"
                          value={item.label}
                          onChange={e => updateItem(sIdx, subIdx, itemIdx, 'label', e.target.value)}
                          placeholder="ชื่อรายการ"
                          style={{ flex: 1 }}
                        />
                        <input
                          className="admin-input"
                          value={item.ref ?? ''}
                          onChange={e => updateItem(sIdx, subIdx, itemIdx, 'ref', e.target.value)}
                          placeholder="ค่าอ้างอิง (ถ้ามี)"
                          style={{ width: 160 }}
                        />
                        <label className="admin-checkbox">
                          <input
                            type="checkbox"
                            checked={item.hasValue}
                            onChange={e => updateItem(sIdx, subIdx, itemIdx, 'hasValue', e.target.checked)}
                          />
                          ใส่ค่า
                        </label>
                        {item.hasValue && (
                          <input
                            className="admin-input"
                            value={item.unit ?? ''}
                            onChange={e => updateItem(sIdx, subIdx, itemIdx, 'unit', e.target.value)}
                            placeholder="หน่วย เช่น mm"
                            style={{ width: 80 }}
                          />
                        )}
                        <button
                          className="btn-icon"
                          onClick={() => deleteItem(sIdx, subIdx, itemIdx)}
                        >🗑</button>
                      </div>
                    ))}

                    {/* เพิ่ม Item */}
                    <button
                      className="admin-add-btn"
                      onClick={() => addItem(sIdx, subIdx)}
                    >+ เพิ่มรายการ</button>

                  </div>
                ))}

                {/* เพิ่ม SubSection */}
                <button
                  className="admin-add-btn admin-add-sub"
                  onClick={() => addSubSection(sIdx)}
                >+ เพิ่ม SubSection</button>

              </div>
            ))}

            {/* เพิ่ม Section */}
            <button className="admin-add-section-btn" onClick={addSection}>
              + เพิ่ม Section ใหม่
            </button>
          </>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className="admin-toast">{toast}</div>
      )}
    </>
  );
}