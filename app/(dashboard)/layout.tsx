/**
 * @file layout.tsx
 * @description Dashboard route group layout
 */

import { DashboardLayout } from '@/app/components/layout';
import { AIAssistant } from '@/app/components/features/AIAssistant';

export default function DashboardRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout>
      {children}
      <AIAssistant />
    </DashboardLayout>
  );
}
