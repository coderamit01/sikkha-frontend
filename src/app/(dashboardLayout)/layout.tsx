import { AppSidebar } from "@/components/layout/app-sidebar";
import { ModeToggle } from "@/components/layout/ModeToggle";
import { DropdownMenuAvatar } from "@/components/layout/ProfileAvatar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getMe } from "@/lib/getMe";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { data: user } = await getMe();

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-3">
            <ModeToggle />
            <DropdownMenuAvatar profile={user} />
          </div>
        </header>
        <div className="p-5">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
