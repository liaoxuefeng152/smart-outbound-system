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
    icon: <LayoutDashboard className="h-5 w-5" />,
    href: '/',
  },
  {
    title: '外呼任务',
    icon: <Phone className="h-5 w-5" />,
    children: [
      { title: '任务列表', icon: <ChevronRight className="h-4 w-4" />, href: '/tasks' },
      { title: '创建任务', icon: <ChevronRight className="h-4 w-4" />, href: '/tasks/create' },
    ],
  },
  {
    title: '号码管理',
    icon: <Users className="h-5 w-5" />,
    children: [
      { title: '号码库', icon: <ChevronRight className="h-4 w-4" />, href: '/customers' },
      { title: '黑名单', icon: <ChevronRight className="h-4 w-4" />, href: '/blacklist' },
    ],
  },
  {
    title: '话术场景',
    icon: <MessageSquare className="h-5 w-5" />,
    href: '/scenarios',
  },
  {
    title: '通话记录',
    icon: <Phone className="h-5 w-5" />,
    href: '/records',
  },
  {
    title: '数据报表',
    icon: <BarChart3 className="h-5 w-5" />,
    href: '/reports',
  },
  {
    title: '系统配置',
    icon: <Settings className="h-5 w-5" />,
    children: [
      { title: '阿里云配置', icon: <ChevronRight className="h-4 w-4" />, href: '/config/aliyun' },
      { title: '账号管理', icon: <ChevronRight className="h-4 w-4" />, href: '/config/accounts' },
      { title: '操作日志', icon: <ChevronRight className="h-4 w-4" />, href: '/config/logs' },
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
          <nav className="flex-1 px-3 py-4 space-y-2">
            {navItems.map((item) => (
              <div key={item.title}>
                {item.children ? (
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-10 px-3 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    onClick={() => toggleExpanded(item.title)}
                  >
                    <span className="mr-3 text-gray-500">{item.icon}</span>
                    <span>{item.title}</span>
                    <ChevronDown
                      className={`ml-auto h-4 w-4 text-gray-400 ${
                        expandedItems.includes(item.title) ? 'rotate-180' : ''
                      }`}
                    />
                  </Button>
                ) : (
                  <Button
                    variant={pathname === item.href ? 'secondary' : 'ghost'}
                    className={`w-full justify-start h-10 px-3 text-sm font-medium ${
                      pathname === item.href 
                        ? 'bg-blue-50 text-blue-700 hover:bg-blue-100' 
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                    onClick={() => {
                      if (item.href) router.push(item.href);
                      setSidebarOpen(false);
                    }}
                  >
                    <span className={`mr-3 ${pathname === item.href ? 'text-blue-600' : 'text-gray-500'}`}>
                      {item.icon}
                    </span>
                    <span>{item.title}</span>
                  </Button>
                )}
                {item.children && expandedItems.includes(item.title) && (
                  <div className="ml-3 mt-1 space-y-1 pl-6 border-l border-gray-200">
                    {item.children.map((child) => (
                      <Button
                        key={child.title}
                        variant={pathname === child.href ? 'secondary' : 'ghost'}
                        size="sm"
                        className={`w-full justify-start h-8 px-3 text-xs font-medium ${
                          pathname === child.href 
                            ? 'bg-blue-50 text-blue-700 hover:bg-blue-100' 
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                        onClick={() => {
                          if (child.href) router.push(child.href);
                          setSidebarOpen(false);
                        }}
                      >
                        <span className={`mr-2 ${pathname === child.href ? 'text-blue-600' : 'text-gray-400'}`}>
                          {child.icon}
                        </span>
                        <span>{child.title}</span>
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
          <nav className="flex-1 px-3 py-4 space-y-2">
            {navItems.map((item) => (
              <div key={item.title}>
                {item.children ? (
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-10 px-3 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    onClick={() => toggleExpanded(item.title)}
                  >
                    <span className="mr-3 text-gray-500">{item.icon}</span>
                    <span>{item.title}</span>
                    <ChevronDown
                      className={`ml-auto h-4 w-4 text-gray-400 ${
                        expandedItems.includes(item.title) ? 'rotate-180' : ''
                      }`}
                    />
                  </Button>
                ) : (
                  <Button
                    variant={pathname === item.href ? 'secondary' : 'ghost'}
                    className={`w-full justify-start h-10 px-3 text-sm font-medium ${
                      pathname === item.href 
                        ? 'bg-blue-50 text-blue-700 hover:bg-blue-100' 
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                    onClick={() => {
                      if (item.href) router.push(item.href);
                    }}
                  >
                    <span className={`mr-3 ${pathname === item.href ? 'text-blue-600' : 'text-gray-500'}`}>
                      {item.icon}
                    </span>
                    <span>{item.title}</span>
                  </Button>
                )}
                {item.children && expandedItems.includes(item.title) && (
                  <div className="ml-3 mt-1 space-y-1 pl-6 border-l border-gray-200">
                    {item.children.map((child) => (
                      <Button
                        key={child.title}
                        variant={pathname === child.href ? 'secondary' : 'ghost'}
                        size="sm"
                        className={`w-full justify-start h-8 px-3 text-xs font-medium ${
                          pathname === child.href 
                            ? 'bg-blue-50 text-blue-700 hover:bg-blue-100' 
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                        onClick={() => {
                          if (child.href) router.push(child.href);
                        }}
                      >
                        <span className={`mr-2 ${pathname === child.href ? 'text-blue-600' : 'text-gray-400'}`}>
                          {child.icon}
                        </span>
                        <span>{child.title}</span>
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
        <div className="sticky top-0 z-10 flex h-14 flex-shrink-0 bg-white border-b shadow-sm">
          <Button
            variant="ghost"
            size="sm"
            className="px-4 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-4 w-4" />
          </Button>
          <div className="flex-1 flex items-center justify-end px-4">
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
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">{children}</main>
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