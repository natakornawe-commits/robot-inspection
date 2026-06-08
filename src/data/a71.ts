import type { Section } from '@/types';

export const A71_SECTIONS: Section[] = [
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
        { id: 'i3', label: 'ตรวจสอบการสึกหรอของล้อ', ref: 'ค่าอ้างอิง > 37 mm.', hasValue: true, unit: 'mm' },
      ]},
      { id: 'sub2', title: '2) Driving Wheel — ล้อขับเคลื่อน', items: [
        { id: 'i1', label: 'ตรวจสอบสิ่งแปลกปลอมที่ติดมากับล้อ', hasValue: false },
        { id: 'i2', label: 'ตรวจสอบการสึกหรอของล้อ', ref: 'ค่าอ้างอิง > 127 mm.', hasValue: true, unit: 'mm' },
      ]},
      { id: 'sub3', title: '3) Chassis Camera', items: [
        { id: 'i1', label: 'ตรวจสอบความสะอาดของกล้อง Chassis Camera', hasValue: false },
        { id: 'i2', label: 'ตรวจสอบการชำรุดหรือเสียหายและความสะอาด', hasValue: false },
        { id: 'i3', label: 'ตรวจสอบน็อตหลวมหรือสูญหาย', hasValue: false },
      ]},
    ]
  },
  {
    id: 's3', num: '3', icon: '🏗', title: 'Lifting Unit',
    subtitle: 'ชุดควบคุมการยก',
    sub: [
      { id: 'sub1', title: '1) Scissor Lift Unit — ชุดลิฟต์ขากรรไกร', items: [
        { id: 'i1', label: 'ตรวจสอบเสียงผิดปกติ', hasValue: false },
        { id: 'i2', label: 'ตรวจสอบโครงสร้างขากรรไกร ไม่บิดงอหรือแตกร้าว', hasValue: false },
        { id: 'i3', label: 'ตรวจสอบลิมิต สวิตซ์ด้านบน', hasValue: false },
        { id: 'i4', label: 'ตรวจสอบลิมิต สวิตซ์ด้านล่าง', hasValue: false },
        { id: 'i5', label: 'ตรวจสอบสารหล่อลื่นชุดรางนำทาง (Driving Guide rail)', hasValue: false },
        { id: 'i6', label: 'ตรวจสอบสารหล่อลื่นชุดเฟืองคอสะพาน', hasValue: false },
        { id: 'i7', label: 'ตรวจสอบสารหล่อลื่นชุดรางเลื่อน (Driving Gear)', hasValue: false },
      ]},
    ]
  },
  {
    id: 's4', num: '4', icon: '🤏', title: 'Finger Unit',
    subtitle: 'ชุดหยิบจับตะกร้า',
    sub: [
      { id: 'sub1', title: '1) Finger Unit — ชุดหยิบจับตะกร้า', items: [
        { id: 'i1', label: 'ตรวจสอบเสียงผิดปกติ', hasValue: false },
        { id: 'i2', label: 'ตรวจสอบตะขอจับตะกร้า ไม่บิดงอหรือแตกร้าว', hasValue: false },
        { id: 'i3', label: 'ตรวจสอบเซนเซอร์ตรวจจับการเกี่ยวตะกร้า', hasValue: false },
        { id: 'i4', label: 'ตรวจสอบเซนเซอร์ตรวจจับตะกร้า', hasValue: false },
        { id: 'i5', label: 'ตรวจความตึงของโซ่', ref: 'ไม่ควรเกิน 3 mm.', hasValue: true, unit: 'mm' },
        { id: 'i6', label: 'ตรวจสอบสารหล่อลื่นโซ่', hasValue: false },
        { id: 'i7', label: 'ตรวจสอบสารหล่อลื่นชุดรางนำทาง (Driving Guide rail)', hasValue: false },
      ]},
    ]
  },
  {
    id: 's5', num: '5', icon: '🧗', title: 'Climbing Unit',
    subtitle: 'ชุดปีนราง',
    sub: [
      { id: 'sub1', title: '1) Climbing Unit — ชุดปีนราง', items: [
        { id: 'i1', label: 'ตรวจสอบเสียงผิดปกติ', hasValue: false },
        { id: 'i2', label: 'ตรวจสอบการสึกหรอของล้อประคอง ขนาด 42 mm. ตัวที่ 1', ref: 'ค่าอ้างอิง > 41 mm.', hasValue: true, unit: 'mm' },
        { id: 'i3', label: 'ตรวจสอบการสึกหรอของล้อประคอง ขนาด 42 mm. ตัวที่ 2', ref: 'ค่าอ้างอิง > 41 mm.', hasValue: true, unit: 'mm' },
        { id: 'i4', label: 'ตรวจสอบการสึกหรอของล้อประคอง ขนาด 36 mm.', ref: 'ค่าอ้างอิง > 35 mm.', hasValue: true, unit: 'mm' },
        { id: 'i5', label: 'ตรวจสอบเซนเซอร์ตรวจจับรางสำหรับปีน', hasValue: false },
        { id: 'i6', label: 'ตรวจสอบความเสียหายอุปกรณ์ป้องกันการตก', hasValue: false },
        { id: 'i7', label: 'ตรวจสอบความเสียหายสายพานไทม์มิ่งสำหรับปีน', hasValue: false },
      ]},
    ]
  },
  {
    id: 's6', num: '6', icon: '🔋', title: 'Electrical Unit',
    subtitle: 'ชุดไฟฟ้า',
    sub: [
      { id: 'sub1', title: '1) Battery — แบตเตอรี่', items: [
        { id: 'i1', label: 'คุณภาพของแบตเตอรี่', hasValue: false },
      ]},
      { id: 'sub2', title: '2) Illumination Lamp', items: [
        { id: 'i1', label: 'ตรวจสอบการทำงาน', hasValue: false },
        { id: 'i2', label: 'การขาดของสายไฟ', hasValue: false },
      ]},
      { id: 'sub3', title: '3) Alarm Voice', items: [
        { id: 'i1', label: 'ตรวจสอบสถานะการทำงาน', hasValue: false },
        { id: 'i2', label: 'การขาดของสายไฟ', hasValue: false },
      ]},
      { id: 'sub4', title: '4) Obstacle Avoidance Sensor', items: [
        { id: 'i1', label: 'เซ็นเซอร์หลีกเลี่ยงสิ่งกีดขวางด้านหน้า', hasValue: false },
        { id: 'i2', label: 'การขาดของสายไฟ', hasValue: false },
      ]},
      { id: 'sub5', title: '5) Start Button', items: [
        { id: 'i1', label: 'ตรวจสอบการชำรุดหรือเสียหายและความสะอาด', hasValue: false },
        { id: 'i2', label: 'ตรวจสอบสถานะการทำงาน', hasValue: false },
      ]},
      { id: 'sub6', title: '6) Charger Socket', items: [
        { id: 'i1', label: 'ตรวจสอบการชำรุดหรือเสียหายและความสะอาด', hasValue: false },
        { id: 'i2', label: 'ตรวจสอบสถานะการทำงาน', hasValue: false },
      ]},
    ]
  },
  {
    id: 's7', num: '7', icon: '🛡', title: 'Safety Unit',
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
    id: 's8', num: '8', icon: '🔍', title: 'Overall Inspection',
    subtitle: 'ภาพรวม',
    sub: [
      { id: 'sub1', title: '1) Chassis — โครงสร้างช่วงล่าง', items: [
        { id: 'i1', label: 'ตรวจสอบการชำรุดหรือเสียหายและความสะอาด', hasValue: false },
        { id: 'i2', label: 'ตรวจสอบน็อตหลวมหรือสูญหาย', hasValue: false },
      ]},
      { id: 'sub2', title: '2) Scissor Lift — ชุดลิฟต์ขากรรไกร', items: [
        { id: 'i1', label: 'ตรวจสอบการชำรุดหรือเสียหายและความสะอาด', hasValue: false },
        { id: 'i2', label: 'ตรวจสอบน็อตหลวมหรือสูญหาย', hasValue: false },
      ]},
      { id: 'sub3', title: '3) Top Panel — ชุดแผงด้านบน', items: [
        { id: 'i1', label: 'ตรวจสอบการชำรุดหรือเสียหายและความสะอาด', hasValue: false },
        { id: 'i2', label: 'ตรวจสอบน็อตหลวมหรือสูญหาย', hasValue: false },
        { id: 'i3', label: 'ตรวจสอบความสึกหรอของยางบนถาด', hasValue: false },
        { id: 'i4', label: 'ตรวจสอบความเสียหายของถาด', hasValue: false },
      ]},
    ]
  }
];
