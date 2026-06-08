import type { Metadata } from 'next';
import InspectionPage from './InspectionPage';

export const metadata: Metadata = {
  title: 'ACETEC Inspection System',
  description: 'Robot Maintenance Checklist — HAIPICK & A71',
};

export default function Page() {
  return <InspectionPage />;
}
