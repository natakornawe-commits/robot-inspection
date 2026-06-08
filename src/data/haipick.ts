import type { Section } from '@/types';

export const HAIPICK_SECTIONS: Section[] = [
  {
    id: 's1', num: '1', icon: '⚡', title: 'Functional Testing',
    subtitle: 'ทดสอบการทำงาน',
    sub: [
      { id: 'sub1', title: 'ภาพรวม (General)', items: [
        { id: 'i1', label: 'ดำเนินการทดลองใช้งานก่อนเริ่มตรวจสอบ', hasValue: false },
        { id: 'i2', label: 'ดำเนินการทดลองใช้งานหลังการตรวจสอบ', hasValue: false },
      ]}
    ]
  },
  {
    id: 's2', num: '2', icon: '🔧', title: 'Traveling Unit',
    subtitle: 'ชุดขับเคลื่อน',
    sub: [
      { id: 'sub1', title: '1) Driven Wheel — ล้อตาม', items: [
        { id: 'i1', label: 'ตรวจสอบสิ่งแปลกปลอมที่ติดมากับล้อ', hasValue: false },
        { id: 'i2', label: 'ตรวจสอบการหมุนของล้อ', hasValue: false },
        { id: 'i3', label: 'ตรวจสอบการสึกหรอของล้อ', ref: 'ค่าอ้างอิง > 74 mm.', hasValue: true, unit: 'mm' },
      ]},
      { id: 'sub2', title: '2) Driving Wheel — ล้อขับเคลื่อน', items: [
        { id: 'i1', label: 'ตรวจสอบสิ่งแปลกปลอมที่ติดมากับล้อ', hasValue: false },
        { id: 'i2', label: 'ตรวจสอบการสึกหรอของล้อ', ref: 'ค่าอ้างอิง > 4 mm.', hasValue: true, unit: 'mm' },
      ]},
      { id: 'sub3', title: '3) Chassis Camera — กล้องตรวจจับ DM Code', items: [
        { id: 'i1', label: 'ตรวจสอบความสะอาดของกล้อง Chassis Camera', hasValue: false },
      ]},
    ]
  },
  {
    id: 's3', num: '3', icon: '🏗', title: 'LHD Unit',
    subtitle: 'ชุด LHD',
    sub: [
      { id: 'sub1', title: '1) Lifting Unit — ชุดควบคุมการยก', items: [
        { id: 'i1', label: 'ตรวจสอบเสียงผิดปกติ', hasValue: false },
        { id: 'i2', label: 'ตรวจสอบเคเบิลลวดเหล็ก', ref: 'ค่าอ้างอิง > 6 mm.', hasValue: true, unit: 'mm' },
        { id: 'i3', label: 'ตรวจสอบกระดูกงูรางไฟ', hasValue: false },
        { id: 'i4', label: 'ตรวจสอบลิมิต สวิตซ์ด้านบน', hasValue: false },
        { id: 'i5', label: 'ตรวจสอบลิมิต สวิตซ์ด้านล่าง', hasValue: false },
        { id: 'i6', label: 'ตรวจสอบการทำงานของตัวล็อคตำแหน่งยกของ LHD', hasValue: false },
        { id: 'i7', label: 'ตรวจสอบการทำงานของขาค้ำ Rack', hasValue: false },
      ]},
      { id: 'sub2', title: '2) Telescopic Unit — ชุดควบคุมการยืด', items: [
        { id: 'i1', label: 'ตรวจสอบความตึงของสายพานไทม์มิ่งควบคุมการยืดของ LHD', hasValue: false },
        { id: 'i2', label: 'ตรวจสอบความเสียหายของสายพานไทม์มิ่ง', hasValue: false },
        { id: 'i3', label: 'ตรวจสอบความเสียหายของรางประครอง', hasValue: false },
        { id: 'i4', label: 'ตรวจสอบแขนจับตะกร้า', hasValue: false },
        { id: 'i5', label: 'ตรวจสอบความเสียหายของถาด', hasValue: false },
        { id: 'i6', label: 'ตรวจสอบกล้องตรวจเช็คตะกร้า', hasValue: false },
        { id: 'i7', label: 'ตรวจสอบความสะอาดของกล้อง LHD', hasValue: false },
      ]},
      { id: 'sub3', title: '3) Rotation Unit — ชุดควบคุมการหมุน', items: [
        { id: 'i1', label: 'ตรวจสอบความตึงของโซ่ควบคุมการหมุนของ LHD', hasValue: false },
        { id: 'i2', label: 'ตรวจสอบการหล่อลื่นของโซ่', hasValue: false },
      ]},
    ]
  },
  {
    id: 's4', num: '4', icon: '🔋', title: 'Electrical Unit',
    subtitle: 'ชุดไฟฟ้า',
    sub: [
      { id: 'sub1', title: '1) Battery — แบตเตอรี่', items: [
        { id: 'i1', label: 'คุณภาพของแบตเตอรี่', hasValue: false },
      ]},
      { id: 'sub2', title: '2) Illumination Lamp — แสงแสดงผล', items: [
        { id: 'i1', label: 'ตรวจสอบการทำงาน', hasValue: false },
        { id: 'i2', label: 'การขาดของสายไฟ', hasValue: false },
      ]},
      { id: 'sub3', title: '3) Alarm Voice — การแจ้งเตือนเสียง', items: [
        { id: 'i1', label: 'ตรวจสอบสถานะการทำงาน', hasValue: false },
      ]},
      { id: 'sub4', title: '4) Obstacle Avoidance Sensor — เซ็นเซอร์หลีกเลี่ยงสิ่งกีดขวาง', items: [
        { id: 'i1', label: 'เซ็นเซอร์หลีกเลี่ยงสิ่งกีดขวางด้านหน้า', hasValue: false },
        { id: 'i2', label: 'เซ็นเซอร์หลีกเลี่ยงสิ่งกีดขวางด้านหลัง', hasValue: false },
      ]},
      { id: 'sub5', title: '5) Start Button — ปุ่มเริ่มต้นการทำงาน', items: [
        { id: 'i1', label: 'ตรวจสอบการชำรุดหรือเสียหายและความสะอาด', hasValue: false },
        { id: 'i2', label: 'ตรวจสอบสถานะการทำงาน', hasValue: false },
      ]},
      { id: 'sub6', title: '6) Charger Socket — จุดต่อชาร์จ', items: [
        { id: 'i1', label: 'ตรวจสอบการชำรุดหรือเสียหายและความสะอาด', hasValue: false },
        { id: 'i2', label: 'ตรวจสอบสถานะการทำงาน', hasValue: false },
      ]},
    ]
  },
  {
    id: 's5', num: '5', icon: '🛡', title: 'Safety Unit',
    subtitle: 'ชุดตรวจจับด้านความปลอดภัย',
    sub: [
      { id: 'sub1', title: '1) Bumper — กันชน', items: [
        { id: 'i1', label: 'ตรวจสอบการชำรุดหรือเสียหายและความสะอาด', hasValue: false },
        { id: 'i2', label: 'ตรวจสอบสถานะการทำงาน', hasValue: false },
      ]},
      { id: 'sub2', title: '2) Emergency Button — ปุ่มฉุกเฉิน', items: [
        { id: 'i1', label: 'ตรวจสอบการชำรุดหรือเสียหายและความสะอาด', hasValue: false },
        { id: 'i2', label: 'ตรวจสอบสถานะการทำงาน', hasValue: false },
      ]},
    ]
  },
  {
    id: 's6', num: '6', icon: '🔍', title: 'Overall Inspection',
    subtitle: 'ภาพรวม',
    sub: [
      { id: 'sub1', title: '1) Chassis — โครงสร้างช่วงล่าง', items: [
        { id: 'i1', label: 'ตรวจสอบการชำรุดหรือเสียหายและความสะอาด', hasValue: false },
        { id: 'i2', label: 'ตรวจสอบน็อตหลวมหรือสูญหาย', hasValue: false },
      ]},
      { id: 'sub2', title: '2) Upright — เสา', items: [
        { id: 'i1', label: 'ตรวจสอบการชำรุดหรือเสียหายและความสะอาด', hasValue: false },
        { id: 'i2', label: 'ตรวจสอบน็อตหลวมหรือสูญหาย', hasValue: false },
      ]},
      { id: 'sub3', title: '3) LHD', items: [
        { id: 'i1', label: 'ตรวจสอบการชำรุดหรือเสียหายและความสะอาด', hasValue: false },
        { id: 'i2', label: 'ตรวจสอบน็อตหลวมหรือสูญหาย', hasValue: false },
      ]},
    ]
  }
];
