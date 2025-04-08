import SidebarLayout from 'components/sidebar/sidebar';
import { SidebarProvider } from 'components/ui/sidebar';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex h-screen w-screen">
        <SidebarLayout />
        <main className="flex-col w-full h-full bg-background overflow-auto">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
