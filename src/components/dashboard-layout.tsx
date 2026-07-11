"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import { useSupabaseConfig } from "@/lib/supabase-config-inject";
import {
  LayoutDashboard,
  Phone,
  Users,
  MessageSquare,
  FileText,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  LogOut,
  User,
} from "lucide-react";
import type { User as SupabaseUser, AuthChangeEvent, Session } from "@supabase/supabase-js";

interface NavItem {
  name: string;
  icon: React.ElementType;
  href?: string;
  children?: { name: string; href: string }[];
}

const navItems: NavItem[] = [
  { name: "工作台", icon: LayoutDashboard, href: "/" },
  {
    name: "外呼任务",
    icon: Phone,
    children: [
      { name: "任务列表", href: "/tasks" },
      { name: "创建任务", href: "/tasks/create" },
    ],
  },
  {
    name: "号码管理",
    icon: Users,
    children: [
      { name: "号码库", href: "/customers" },
      { name: "黑名单", href: "/blacklist" },
    ],
  },
  { name: "话术场景", icon: MessageSquare, href: "/scenarios" },
  { name: "通话记录", icon: FileText, href: "/records" },
  { name: "数据报表", icon: BarChart3, href: "/reports" },
  {
    name: "系统配置",
    icon: Settings,
    children: [
      { name: "阿里云配置", href: "/config/aliyun" },
      { name: "账号管理", href: "/config/accounts" },
      { name: "操作日志", href: "/config/logs" },
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
  const { config, isLoading } = useSupabaseConfig();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  useEffect(() => {
    // Wait for config to be ready
    if (isLoading || !config) return;

    const supabase = getSupabaseBrowserClient();
    
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      if (!session?.user) {
        router.push("/login");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [router, config, isLoading]);

  const handleLogout = async () => {
    if (!config) return;
    
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  const toggleMenu = (name: string) => {
    setExpandedMenus((prev) =>
      prev.includes(name) ? prev.filter((m) => m !== name) : [...prev, name]
    );
  };

  const isMenuActive = (item: NavItem): boolean => {
    if (item.href === pathname) return true;
    if (item.children) {
      return item.children.some((child) => child.href === pathname);
    }
    return false;
  };

  const isChildActive = (child: { href: string }): boolean => {
    return child.href === pathname;
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* 左侧导航栏 */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* 系统标识 */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
            智
          </div>
          <div className="ml-3">
            <div className="font-semibold text-gray-900">智能推销外呼</div>
            <div className="text-xs text-gray-500">高效触达·智能筛选</div>
          </div>
        </div>

        {/* 导航菜单 */}
        <nav className="flex-1 overflow-y-auto py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = isMenuActive(item);
            const isExpanded = expandedMenus.includes(item.name);

            return (
              <div key={item.name}>
                {/* 主菜单项 */}
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`flex items-center px-6 py-2.5 mx-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-gray-500"}`} />
                    <span className="ml-3 font-medium">{item.name}</span>
                  </Link>
                ) : (
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className={`w-full flex items-center px-6 py-2.5 mx-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-gray-500"}`} />
                    <span className="ml-3 font-medium">{item.name}</span>
                    {item.children && (
                      <ChevronDown
                        className={`ml-auto w-4 h-4 transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>
                )}

                {/* 子菜单 */}
                {item.children && isExpanded && (
                  <div className="ml-2 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`flex items-center pl-14 pr-6 py-2 rounded-lg transition-colors ${
                          isChildActive(child)
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <span className="font-medium">{child.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* 底部登出按钮 */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 text-gray-500" />
            <span className="ml-3 font-medium">退出登录</span>
          </button>
        </div>
      </aside>

      {/* 右侧主内容区 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部用户栏 */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="text-sm text-gray-600">
            欢迎使用智能推销外呼系统
          </div>
          {user && (
            <div className="flex items-center gap-3">
              <div className="text-sm">
                <div className="font-medium text-gray-900">{user.email}</div>
                <div className="text-gray-500 text-xs">管理员</div>
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          )}
        </header>

        {/* 主内容区 */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}