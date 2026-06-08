import type { Metadata } from 'next';
import { IBM_Plex_Sans_Thai, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ACETEC Inspection System',
  description: 'Robot Maintenance Checklist',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={`${ibmPlexSansThai.variable} ${ibmPlexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
