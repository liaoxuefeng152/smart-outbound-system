import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import './globals.css';
import { SupabaseConfigProvider } from '@/lib/supabase-config-inject';

export const metadata: Metadata = {
  title: {
    default: '智能推销外呼系统',
    template: '%s | 智能推销外呼系统',
  },
  description:
    '基于阿里云智能外呼的推销外呼管理系统，实现机器人自动外呼、智能话术推销、客户意向分级、通话数据留存与复盘',
  keywords: [
    '智能外呼',
    '推销系统',
    '阿里云',
    'AI外呼',
    '客户管理',
    '意向筛选',
    '通话记录',
  ],
  authors: [{ name: '智能推销外呼系统' }],
  generator: '智能推销外呼系统',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.COZE_PROJECT_ENV === 'DEV';

  return (
    <html lang="zh-CN">
      <body className={`antialiased`}>
        <SupabaseConfigProvider>
          {isDev && <Inspector />}
          {children}
        </SupabaseConfigProvider>
      </body>
    </html>
  );
}