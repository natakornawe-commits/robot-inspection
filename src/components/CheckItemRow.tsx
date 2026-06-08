'use client';

import type { CheckItem as CheckItemType, ItemState, ResultType, ActionType } from '@/types';

interface CheckItemProps {
  item: CheckItemType;
  num: number;
  itemKey: string;
  itemState: ItemState;
  onSetResult: (key: string, val: ResultType) => void;
  onSetValue: (key: string, val: string) => void;
  onSetAction: (key: string, val: ActionType) => void;
  onOpenPhoto: (key: string, label: string) => void;
}

const ACTION_OPTIONS: { value: ActionType; label: string }[] = [
  { value: '', label: '— การกระทำ —' },
  { value: 'CL', label: 'CL ทำความสะอาด' },
  { value: 'O', label: 'O ใส่น้ำมัน' },
  { value: 'G', label: 'G ใส่จาระบี' },
  { value: 'A', label: 'A ปรับ' },
  { value: 'W', label: 'W ถอดชิ้นส่วน' },
  { value: 'X', label: 'X เปลี่ยน' },
  { value: 'R', label: 'R ซ่อมแซม' },
  { value: 'N/A', label: 'N/A ไม่ได้ตราจสอบ'},
];

export default function CheckItemRow({
  item, num, itemKey, itemState,
  onSetResult, onSetValue, onSetAction, onOpenPhoto,
}: CheckItemProps) {
  const { result, value, action, photos } = itemState;

  return (
    <div className="check-item" id={`item-${itemKey}`}>
      <div className="item-num">{num}</div>
      <div className="item-detail">
        <div className="item-label">{item.label}</div>
        {item.ref && <div className="item-ref">📐 {item.ref}</div>}
      </div>

      {item.hasValue ? (
        <input
          className="value-input"
          type="number"
          placeholder={item.unit ?? 'ค่า'}
          value={value}
          onChange={e => onSetValue(itemKey, e.target.value)}
          step={0.1}
        />
      ) : <div />}

      <select
        className="action-select"
        value={action}
        onChange={e => onSetAction(itemKey, e.target.value as ActionType)}
      >
        {ACTION_OPTIONS.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <div className="result-btns">
          <button
            className={`result-btn ${result === 'good' ? 'good' : ''}`}
            onClick={() => onSetResult(itemKey, 'good')}
          >V</button>
          <button
            className={`result-btn ${result === 'bad' ? 'bad' : ''}`}
            onClick={() => onSetResult(itemKey, 'bad')}
          >/</button>
          
        </div>
        <div className="photo-col">
          <button
            className="photo-btn"
            onClick={() => onOpenPhoto(itemKey, item.label)}
          >📷</button>
          {photos.length > 0 && (
            <div className="photo-count">{photos.length} รูป</div>
          )}
        </div>
      </div>
    </div>
  );
}
