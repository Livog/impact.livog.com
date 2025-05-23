import Header from "@/components/header";
import SidebarNav from "@/components/sidebar-nav";
import { Container } from "@/components/container";
import { cn } from "@/lib/utils";

export default async function UiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hasSidebar = false;
  return (
    <div className="relative flex min-h-svh flex-col bg-background">
      <div className="border-grid flex flex-1 flex-col">
        <Header />
        <Container className={cn("flex-1 items-start md:grid md:gap-6 lg:gap-10", hasSidebar ? "md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)]" : "md:grid-cols-[minmax(0,1fr)]")}>
          {hasSidebar && <SidebarNav />}
          <main className="flex-1">{children}</main>
        </Container>
      </div>
    </div>
  );
}
