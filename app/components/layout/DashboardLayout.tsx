/**
 * @file DashboardLayout.tsx
 * @description Main dashboard layout wrapper component
 */

import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Sidebar />
      <div className="ml-64">
        <Header title={title} />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
