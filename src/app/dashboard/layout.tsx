'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Bell,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Shield,
  Users,
} from 'lucide-react';

import Logo from '@/components/Logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useEffect } from 'react';

const NavItem = ({
  href,
  children,
  icon,
}: {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <SidebarMenuItem>
      <Link href={href} legacyBehavior passHref>
        <SidebarMenuButton isActive={isActive}>
          {icon}
          <span className="truncate">{children}</span>
        </SidebarMenuButton>
      </Link>
    </SidebarMenuItem>
  );
};

function DashboardHeader() {
  const { isMobile } = useSidebar();
  const auth = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      {isMobile && <SidebarTrigger />}
      <div className="flex-1">
        <h1 className="font-headline text-xl font-semibold capitalize text-primary">
          {usePathname().split('/').pop()?.replace('-', ' ') || 'Dashboard'}
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.photoURL ?? `https://picsum.photos/seed/${user?.uid}/100/100`} alt={user?.displayName ?? 'User'} data-ai-hint="person portrait"/>
                <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline">{user?.displayName || user?.email}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>
              <Users className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace('/');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <div className="w-full max-w-md text-center">
          <Logo />
          <h1 className="mt-4 animate-pulse text-lg">Loading Dashboard...</h1>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="border-b">
            <div className="flex items-center gap-2 p-2">
              <Logo className="h-10 w-10" />
              <span className="font-headline text-xl font-bold text-primary">eStores WorkHub</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <NavItem href="/dashboard" icon={<LayoutDashboard className="h-5 w-5" />}>
                Dashboard
              </NavItem>
              <NavItem href="/dashboard/employees" icon={<Users className="h-5 w-5" />}>
                Employee Directory
              </NavItem>
              <NavItem href="/dashboard/admin" icon={<Shield className="h-5 w-5" />}>
                Admin Panel
              </NavItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <div className="flex flex-1 flex-col">
          <DashboardHeader />
          <main className="flex-1 bg-muted/30 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
