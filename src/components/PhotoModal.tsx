'use client';

import { useRef } from 'react';

interface PhotoModalProps {
  isOpen: boolean;
  label: string;
  photos: string[];
  onClose: () => void;
  onAddPhotos: (photos: string[]) => void;
  onDeletePhoto: (idx: number) => void;
}

export default function PhotoModal({
  isOpen, label, photos, onClose, onAddPhotos, onDeletePhoto,
}: PhotoModalProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const results: string[] = [];
    let loaded = 0;
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => {
        results.push(ev.target!.result as string);
        loaded++;
        if (loaded === files.length) onAddPhotos(results);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay open">
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">📷 {label}</div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="photo-grid">
          {photos.map((src, idx) => (
            <div key={idx} className="photo-grid-item">
              <img src={src} alt={`photo-${idx}`} onClick={() => window.open(src, '_blank')} />
              <button className="photo-del" onClick={() => onDeletePhoto(idx)}>✕</button>
            </div>
          ))}
          <div
            className="photo-add-tile"
            onClick={() => fileRef.current?.click()}
          >
            <span>📷</span>
            <p>เพิ่มรูป</p>
          </div>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: 'none' }}
          onChange={handleFiles}
        />
      </div>
    </div>
  );
}
