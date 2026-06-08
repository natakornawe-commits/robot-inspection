import type { Metadata } from 'next';
import HistoryPage from './HistoryPage';

export const metadata: Metadata = {
  title: 'Inspection History — ACETEC',
  description: 'ประวัติการตรวจสอบหุ่นยนต์',
};

export default function Page() {
  return <HistoryPage />;
}