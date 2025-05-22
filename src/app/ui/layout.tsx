import { getUiIndex } from "@/lib/ui-index";
import Header from "@/components/header";
import SidebarNav from "@/components/sidebar-nav";
import Container from "@/components/ui/container";

export default async function UiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const kits = await getUiIndex();
  return (
    <div className="relative flex min-h-svh flex-col bg-background">
      <div className="border-grid flex flex-1 flex-col">
        <Header />
        <Container className="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
          <SidebarNav kits={kits} />
          <main className="flex-1">{children}</main>
        </Container>
      </div>
    </div>
  );
}
