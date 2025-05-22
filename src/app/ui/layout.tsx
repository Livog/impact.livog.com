import { getUiIndex } from "@/lib/ui-index";
import Header from "@/components/header";
import SidebarNav from "@/components/sidebar-nav";

export default async function UiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const kits = await getUiIndex();
  return (
    <div className="flex min-h-screen">
      <SidebarNav kits={kits} />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}
