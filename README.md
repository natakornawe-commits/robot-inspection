# ACETEC Robot Inspection System

แอป Next.js 13+ (App Router) + TypeScript สำหรับ Robot Maintenance Checklist

## โครงสร้างโปรเจกต์

```
src/
├── app/
│   ├── layout.tsx          # Root layout + font setup
│   ├── page.tsx            # Entry point (Server Component)
│   ├── InspectionPage.tsx  # Main page (Client Component)
│   └── globals.css         # Global styles + CSS variables
├── components/
│   ├── Topbar.tsx          # Top navigation bar
│   ├── Sidebar.tsx         # Left sidebar + nav list
│   ├── InfoPanel.tsx       # Inspection info inputs
│   ├── Legend.tsx          # Symbol legend
│   ├── SectionCard.tsx     # Collapsible section card
│   ├── CheckItemRow.tsx    # Individual check item row
│   ├── PhotoModal.tsx      # Photo upload modal
│   └── ExportBar.tsx       # Bottom export bar
├── data/
│   ├── haipick.ts          # HAIPICK checklist data
│   ├── a71.ts              # A71 checklist data
│   └── index.ts            # Data utilities + getSections()
├── hooks/
│   └── useInspection.ts    # Core state management hook
├── lib/
│   └── exportPDF.ts        # PDF export utility
└── types/
    └── index.ts            # TypeScript types
```

## วิธีติดตั้งและรัน

```bash
# ติดตั้ง dependencies
npm install

# รัน development server
npm run dev

# Build production
npm run build
npm start
```

เปิดบราวเซอร์ที่ http://localhost:3000
