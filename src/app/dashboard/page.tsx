'use client';

import { useState } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Phone,
  CheckCircle,
  Target,
  Activity,
  TrendingUp,
  Calendar,
  ListTodo,
  FileText,
} from 'lucide-react';

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState('today');

  const stats = [
    {
      title: '累计外呼总量',
      value: '0',
      sub: '较昨日 +0',
      icon: Phone,
      color: 'blue',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
    },
    {
      title: '接通量 & 接通率',
      value: '0 / 0%',
      sub: '较昨日 +0',
      icon: CheckCircle,
      color: 'green',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
    },
    {
      title: '有效意向客户',
      value: '0 / 0%',
      sub: '较昨日 +0',
      icon: Target,
      color: 'orange',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600',
    },
    {
      title: '今日进行中任务',
      value: '0',
      sub: '待启动任务 0',
      icon: Activity,
      color: 'purple',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600',
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
        {/* 页面标题和操作 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">工作台</h1>
            <p className="text-gray-500 mt-1">整体外呼业务数据概览，快速查看今日/累计外呼情况</p>
          </div>
          <Link href="/tasks/create">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Phone className="w-4 h-4 mr-2" />
              创建任务
            </Button>
          </Link>
        </div>

        {/* 时间筛选 */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600 flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            时间维度：
          </span>
          <div className="flex gap-2">
            {[
              { key: 'today', label: '今日' },
              { key: 'yesterday', label: '昨日' },
              { key: '7days', label: '近7天' },
              { key: '30days', label: '近30天' },
              { key: 'custom', label: '自定义' },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setTimeRange(item.key)}
                className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                  timeRange === item.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* 数据卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <p className="text-sm text-gray-400 mt-2 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {stat.sub}
                    </p>
                  </div>
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 图表区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 外呼趋势图 */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">外呼趋势</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                <div className="text-center text-gray-400">
                  <TrendingUp className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p>外呼趋势折线图</p>
                  <p className="text-sm mt-1">每日拨打、接通数据走势</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 意向分布图 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">客户意向分布</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                <div className="text-center text-gray-400">
                  <Target className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p>意向分布饼图</p>
                  <p className="text-sm mt-1">高意向/观望/无意向/无效</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 最近任务 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">最近外呼任务</CardTitle>
            <Link href="/tasks">
              <Button variant="ghost" size="sm" className="text-blue-600">
                查看全部
                <TrendingUp className="w-4 h-4 ml-1 rotate-90" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-gray-400">
              <ListTodo className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="mb-4">暂无外呼任务</p>
              <Link href="/tasks/create">
                <Button variant="outline" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  立即创建任务
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
