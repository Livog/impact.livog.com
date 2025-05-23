import type { ReactNode } from "react";

interface DefaultLayoutProps {
  children: ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <header className="top-0 z-2 w-full text-black dark:text-white sticky h-0">
        {/* Header content will go here */}
      </header>
      <main className="grow">
        {children}
      </main>
      <footer>
        {/* Footer content will go here */}
      </footer>
    </div>
  );
}
