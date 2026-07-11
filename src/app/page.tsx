"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, CheckCircle, Target, TrendingUp, LineChart, PieChart } from "lucide-react";

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("今日");

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* 时间筛选栏 */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">时间维度：</span>
              {["今日", "昨日", "近7天", "近30天", "自定义"].map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeRange(range)}
                >
                  {range}
                </Button>
              ))}
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              创建任务
            </Button>
          </div>
        </div>

        {/* 数据统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* 累计外呼总量 */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-600 mb-1">累计外呼总量</div>
                  <div className="text-2xl font-bold text-gray-900">0</div>
                  <div className="text-xs text-gray-500 mt-1">较昨日 +0</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 接通量 & 接通率 */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-600 mb-1">接通量 & 接通率</div>
                  <div className="text-2xl font-bold text-gray-900">0 / 0%</div>
                  <div className="text-xs text-gray-500 mt-1">较昨日 +0</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 有效意向客户 */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-600 mb-1">有效意向客户</div>
                  <div className="text-2xl font-bold text-gray-900">0 / 0%</div>
                  <div className="text-xs text-gray-500 mt-1">较昨日 +0</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <Target className="w-5 h-5 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 今日进行中任务 */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-600 mb-1">今日进行中任务</div>
                  <div className="text-2xl font-bold text-gray-900">0</div>
                  <div className="text-xs text-gray-500 mt-1">待启动任务 0</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 图表模块 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* 外呼趋势折线图 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">外呼趋势</CardTitle>
                <LineChart className="w-5 h-5 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent className="h-48">
              <div className="h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <LineChart className="w-16 h-16 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">暂无数据</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 客户意向分布饼图 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">客户意向分布</CardTitle>
                <PieChart className="w-5 h-5 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent className="h-48">
              <div className="h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <PieChart className="w-16 h-16 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">暂无数据</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 最近外呼任务记录 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">最近外呼任务</CardTitle>
              <Button variant="link" className="text-blue-600">
                查看全部
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-400">
              <div className="text-sm mb-3">暂无外呼任务记录</div>
              <Button variant="outline" className="text-blue-600">
                创建第一个任务
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}