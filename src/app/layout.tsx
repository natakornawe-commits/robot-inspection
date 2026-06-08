import type { Metadata } from 'next';
// @ts-ignore: side-effect import of CSS file
import './globals.css';

export const metadata: Metadata = {
  title: 'ACETEC Inspection System',
  description: 'Robot Maintenance Checklist',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
