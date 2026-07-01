'use client';

import { useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';

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
  const [uploading, setUploading] = useState(false);

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    setUploading(true);
    const uploadedUrls: string[] = [];

    for (const file of files) {
      try {
        // สร้างชื่อไฟล์ unique
        const ext = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

        // อัปโหลดไป Supabase Storage
        const { error } = await supabase.storage
          .from('inspection-photos')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (error) {
          console.error('Upload error:', error);
          continue;
        }

        // ดึง public URL
        const { data } = supabase.storage
          .from('inspection-photos')
          .getPublicUrl(fileName);

        uploadedUrls.push(data.publicUrl);
      } catch (err) {
        console.error('Upload failed:', err);
      }
    }

    if (uploadedUrls.length > 0) {
      onAddPhotos(uploadedUrls);
    }

    setUploading(false);
    e.target.value = '';
  };

  const handleDeletePhoto = async (idx: number) => {
    const url = photos[idx];

    // ดึงชื่อไฟล์จาก URL
    const fileName = url.split('/').pop();
    if (fileName) {
      await supabase.storage
        .from('inspection-photos')
        .remove([fileName]);
    }

    onDeletePhoto(idx);
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
              <img
                src={src}
                alt={`photo-${idx}`}
                onClick={() => window.open(src, '_blank')}
              />
              <button
                className="photo-del"
                onClick={() => handleDeletePhoto(idx)}
              >✕</button>
            </div>
          ))}

          {/* ปุ่มเพิ่มรูป */}
          <div
            className={`photo-add-tile ${uploading ? 'uploading' : ''}`}
            onClick={() => !uploading && fileRef.current?.click()}
           >
            {uploading ? (
              <>
                <span>⏳</span>
                <p>กำลังอัปโหลด...</p>
              </>
            ) : (
              <>
                <span>📷</span>
                <p>เพิ่มรูป</p>
              </>
            )}
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