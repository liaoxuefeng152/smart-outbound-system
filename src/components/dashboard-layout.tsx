'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getSupabaseBrowserClientWithRetry } from '@/lib/supabase-browser';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  LayoutDashboard,
  Phone,
  Users,
  MessageSquare,
  BarChart3,
  Settings,
  Menu,
  X,
  LogOut,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

interface NavItem {
  title: string;
  icon: React.ReactNode;
  href?: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  {
    title: '工作台',
    icon: <LayoutDashboard className="h-4 w-4" />,
    href: '/',
  },
  {
    title: '外呼任务管理',
    icon: <Phone className="h-4 w-4" />,
    children: [
      { title: '任务列表', icon: <ChevronRight className="h-3 w-3" />, href: '/tasks' },
      { title: '创建外呼任务', icon: <ChevronRight className="h-3 w-3" />, href: '/tasks/create' },
    ],
  },
  {
    title: '客户号码管理',
    icon: <Users className="h-4 w-4" />,
    children: [
      { title: '号码库列表', icon: <ChevronRight className="h-3 w-3" />, href: '/customers' },
      { title: '黑名单管理', icon: <ChevronRight className="h-3 w-3" />, href: '/blacklist' },
    ],
  },
  {
    title: 'AI话术场景管理',
    icon: <MessageSquare className="h-4 w-4" />,
    href: '/scenarios',
  },
  {
    title: '通话记录与复盘',
    icon: <Phone className="h-4 w-4" />,
    href: '/records',
  },
  {
    title: '数据报表中心',
    icon: <BarChart3 className="h-4 w-4" />,
    href: '/reports',
  },
  {
    title: '系统配置',
    icon: <Settings className="h-4 w-4" />,
    children: [
      { title: '阿里云接口配置', icon: <ChevronRight className="h-3 w-3" />, href: '/config/aliyun' },
      { title: '账号权限管理', icon: <ChevronRight className="h-3 w-3" />, href: '/config/accounts' },
      { title: '操作日志', icon: <ChevronRight className="h-3 w-3" />, href: '/config/logs' },
    ],
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const supabase = await getSupabaseBrowserClientWithRetry();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUser({ email: user.email || '' });
        }
      } catch (err) {
        console.error('获取用户信息失败:', err);
      }
    };
    
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const supabase = await getSupabaseBrowserClientWithRetry();
      await supabase.auth.signOut();
      router.push('/login');
    } catch (err) {
      console.error('登出失败:', err);
    }
  };

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const isLoginPage = pathname === '/login' || pathname === '/register';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${
          sidebarOpen ? 'block' : 'hidden'
        }`}
      >
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">智</span>
              </div>
              <span className="ml-2 text-lg font-semibold">智能推销外呼系统</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <div key={item.title}>
                {item.children ? (
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => toggleExpanded(item.title)}
                  >
                    {item.icon}
                    <span className="ml-2">{item.title}</span>
                    <ChevronDown
                      className={`ml-auto h-4 w-4 ${
                        expandedItems.includes(item.title) ? 'rotate-180' : ''
                      }`}
                    />
                  </Button>
                ) : (
                  <Button
                    variant={pathname === item.href ? 'secondary' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => {
                      if (item.href) router.push(item.href);
                      setSidebarOpen(false);
                    }}
                  >
                    {item.icon}
                    <span className="ml-2">{item.title}</span>
                  </Button>
                )}
                {item.children && expandedItems.includes(item.title) && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Button
                        key={child.title}
                        variant={pathname === child.href ? 'secondary' : 'ghost'}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => {
                          if (child.href) router.push(child.href);
                          setSidebarOpen(false);
                        }}
                      >
                        {child.icon}
                        <span className="ml-2">{child.title}</span>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="w-64 flex flex-col bg-white border-r">
          <div className="h-16 flex items-center px-4 border-b">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">智</span>
              </div>
              <span className="ml-2 text-lg font-semibold">智能推销外呼系统</span>
            </div>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <div key={item.title}>
                {item.children ? (
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => toggleExpanded(item.title)}
                  >
                    {item.icon}
                    <span className="ml-2">{item.title}</span>
                    <ChevronDown
                      className={`ml-auto h-4 w-4 ${
                        expandedItems.includes(item.title) ? 'rotate-180' : ''
                      }`}
                    />
                  </Button>
                ) : (
                  <Button
                    variant={pathname === item.href ? 'secondary' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => {
                      if (item.href) router.push(item.href);
                    }}
                  >
                    {item.icon}
                    <span className="ml-2">{item.title}</span>
                  </Button>
                )}
                {item.children && expandedItems.includes(item.title) && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Button
                        key={child.title}
                        variant={pathname === child.href ? 'secondary' : 'ghost'}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => {
                          if (child.href) router.push(child.href);
                        }}
                      >
                        {child.icon}
                        <span className="ml-2">{child.title}</span>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Top bar */}
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white border-b shadow-sm">
          <Button
            variant="ghost"
            size="sm"
            className="px-4 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-4 w-4" />
          </Button>
          <div className="flex-1 flex items-center px-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Phone className="h-4 w-4 text-blue-600" />
              </div>
              <div className="hidden lg:block">
                <p className="text-sm font-medium text-gray-900">智能推销外呼系统</p>
                <p className="text-xs text-gray-500">高效触达 · 智能筛选 · 数据驱动</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4 px-4">
            {user && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 text-sm font-medium">
                    {user.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-medium text-gray-900">{user.email}</p>
                  <p className="text-xs text-gray-500">管理员</p>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowLogoutDialog(true)}
              title="退出登录"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>

      {/* Logout dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认登出</DialogTitle>
            <DialogDescription>
              您确定要退出登录吗？
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLogoutDialog(false)}>
              取消
            </Button>
            <Button onClick={handleLogout}>
              确认登出
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}