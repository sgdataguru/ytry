/**
 * @file onboarding/layout.tsx
 * @description Layout for onboarding flow - minimal chrome, focused experience
 */

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-10 bg-[var(--bg-primary)]/80 backdrop-blur-md border-b border-[var(--border-primary)]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🚀</span>
            <span className="text-xl font-bold text-[var(--text-primary)]">Ytry</span>
          </div>
          <span className="text-sm text-[var(--text-muted)]">
            Setting up your innovation platform
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16">{children}</main>
    </div>
  );
}
