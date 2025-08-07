import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, FileText, Users } from 'lucide-react';


const footerNavItems: NavItem[] = [
    {
        title: 'PPDB Online',
        href: '/',
        icon: Folder,
    },
    {
        title: 'Bantuan',
        href: '#',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const page = usePage();
    const auth = (page.props as { auth?: { user?: { id: number; name: string; email: string; role: 'applicant' | 'admin' } } }).auth;
    const user = auth?.user;

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
        },
        ...(user?.role === 'applicant' ? [
            {
                title: 'Pendaftaran Saya',
                href: '/my-application',
                icon: FileText,
            },
        ] : []),
        ...(user?.role === 'admin' ? [
            {
                title: 'Kelola Pendaftaran',
                href: '/applications',
                icon: Users,
            },
        ] : []),
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-white text-lg">
                                    🏫
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">PPDB Online</span>
                                    <span className="truncate text-xs">Pendaftaran Siswa</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}