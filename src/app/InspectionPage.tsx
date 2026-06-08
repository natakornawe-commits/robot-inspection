'use client';

import { useState, useCallback } from 'react';
import { useInspection } from '@/hooks/useInspection';
import { getSections } from '@/data';
import { exportPDF } from '@/lib/exportPDF';
import type { RobotType, ResultType, ActionType } from '@/types';

import Topbar from '@/components/Topbar';
import Sidebar from '@/components/Sidebar';
import InfoPanel from '@/components/InfoPanel';
import Legend from '@/components/Legend';
import SectionCard from '@/components/SectionCard';
import PhotoModal from '@/components/PhotoModal';
import ExportBar from '@/components/ExportBar';

export default function InspectionPage() {
  const {
    robot, setRobot,
    state, info, setInfo,
    getItemState, setResult, setValue, setAction,
    addPhotos, deletePhoto,
    clearAll, saveLocal,
    stats,
  } = useInspection();

  const [photoModal, setPhotoModal] = useState<{ key: string; label: string } | null>(null);

  const sections = getSections(robot);

  const handleSwitchRobot = useCallback((r: RobotType) => setRobot(r), [setRobot]);

  const handleNavClick = useCallback((sectionId: string) => {
    document.getElementById(`card-${sectionId}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleOpenPhoto = useCallback((key: string, label: string) => {
    setPhotoModal({ key, label });
  }, []);

  const handleClosePhoto = useCallback(() => {
    setPhotoModal(null);
  }, []);

  const handleClearAll = useCallback(() => {
    if (window.confirm('ต้องการล้างข้อมูลทั้งหมดหรือไม่?')) {
      clearAll();
      showToast('ล้างข้อมูลแล้ว');
    }
  }, [clearAll]);

  const handleSave = useCallback(() => {
    saveLocal();
    showToast('บันทึกข้อมูลแล้ว ✓');
  }, [saveLocal]);

  const handleExport = useCallback(() => {
    exportPDF(robot, state, info, stats);
  }, [robot, state, info, stats]);

  const photoKey = photoModal?.key ?? '';
  const photoState = photoKey ? getItemState(photoKey) : null;
  
  return (
    <>
      <Topbar onClear={handleClearAll} onExport={handleExport} />

      <div className="app-layout">
        <Sidebar
          robot={robot}
          sections={sections}
          state={state}
          progress={stats.progress}
          onSwitchRobot={handleSwitchRobot}
          onNavClick={handleNavClick}
        />

        <div className="main" id="main-content">
          <InfoPanel info={info} onChange={setInfo} />
          <Legend />

          <div id="checklist-container" className="fade-in">
            {sections.map(sec => (
              <SectionCard
                key={`${robot}-${sec.id}`}
                section={sec}
                robot={robot}
                state={state}
                getItemState={getItemState}
                onSetResult={setResult as (key: string, val: ResultType) => void}
                onSetValue={setValue}
                onSetAction={setAction as (key: string, val: ActionType) => void}
                onOpenPhoto={handleOpenPhoto}
              />
            ))}
          </div>
        </div>
      </div>

      <ExportBar stats={stats} onSave={handleSave} onExport={handleExport} />

      <PhotoModal
        isOpen={!!photoModal}
        label={photoModal?.label ?? ''}
        photos={photoState?.photos ?? []}
        onClose={handleClosePhoto}
        onAddPhotos={photos => addPhotos(photoKey, photos)}
        onDeletePhoto={idx => deletePhoto(photoKey, idx)}
      />
    </>
  );
}

function showToast(msg: string) {
  if (typeof document === 'undefined') return;
  const t = document.createElement('div');
  t.style.cssText = `position:fixed;bottom:80px;right:24px;z-index:999;
    background:var(--surface2);border:1px solid var(--border2);
    border-radius:8px;padding:10px 16px;font-size:13px;color:var(--text);
    box-shadow:0 4px 12px rgba(0,0,0,.4);animation:fadeIn .2s ease;`;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}
