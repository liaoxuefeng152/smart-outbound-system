import DashboardLayout from '@/components/dashboard-layout';
import { TrendingUp, PieChart, Phone, CheckCircle, Target, Activity, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        {/* 顶部筛选栏 */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">时间维度：</span>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium">
                  今日
                </button>
                <button className="px-4 py-2 bg-white text-gray-700 border rounded-md text-sm font-medium hover:bg-gray-50">
                  昨日
                </button>
                <button className="px-4 py-2 bg-white text-gray-700 border rounded-md text-sm font-medium hover:bg-gray-50">
                  近7天
                </button>
                <button className="px-4 py-2 bg-white text-gray-700 border rounded-md text-sm font-medium hover:bg-gray-50">
                  近30天
                </button>
                <button className="px-4 py-2 bg-white text-gray-700 border rounded-md text-sm font-medium hover:bg-gray-50">
                  自定义
                </button>
              </div>
            </div>
            <Link
              href="/tasks/create"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              创建任务
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* 数据卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">累计外呼总量</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">0</p>
                <p className="text-xs text-gray-400 mt-1">较昨日 +0</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Phone className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">接通量 & 接通率</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">0 / 0%</p>
                <p className="text-xs text-gray-400 mt-1">较昨日 +0</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">有效意向客户</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">0 / 0%</p>
                <p className="text-xs text-gray-400 mt-1">较昨日 +0</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">今日进行中任务</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">0</p>
                <p className="text-xs text-gray-400 mt-1">待启动任务 0</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* 图表模块 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-gray-900">外呼趋势折线图</h2>
              <TrendingUp className="h-5 w-5 text-gray-400" />
            </div>
            <div className="h-40 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-500">暂无数据</p>
                <p className="text-xs text-gray-400 mt-1">创建任务后即可查看趋势</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-gray-900">客户意向分布饼图</h2>
              <PieChart className="h-5 w-5 text-gray-400" />
            </div>
            <div className="h-40 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-500">暂无数据</p>
                <p className="text-xs text-gray-400 mt-1">任务完成后自动统计</p>
              </div>
            </div>
          </div>
        </div>

        {/* 最近外呼任务记录 */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-900">最近外呼任务记录</h2>
              <Link
                href="/tasks"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                查看全部 →
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Phone className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-sm font-medium text-gray-500 mb-2">暂无外呼任务记录</p>
              <p className="text-xs text-gray-400 mb-3">创建任务后即可在此查看执行进度</p>
              <Link
                href="/tasks/create"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
              >
                立即创建任务
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}