import type { Metadata } from 'next';
import AdminPage from './AdminPage';

export const metadata: Metadata = {
  title: 'Admin — ACETEC Checklist Editor',
};

export default function Page() {
  return <AdminPage />;
}