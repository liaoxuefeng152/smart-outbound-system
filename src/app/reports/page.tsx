import DashboardLayout from '@/components/dashboard-layout';

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">数据报表中心</h1>
          <p className="mt-1 text-sm text-gray-500">
            推销业务数据统计、效果复盘、数据导出
          </p>
        </div>

        {/* 顶部筛选 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium">
                日
              </button>
              <button className="px-4 py-2 bg-white text-gray-700 border rounded-md text-sm font-medium">
                周
              </button>
              <button className="px-4 py-2 bg-white text-gray-700 border rounded-md text-sm font-medium">
                月
              </button>
              <button className="px-4 py-2 bg-white text-gray-700 border rounded-md text-sm font-medium">
                自定义
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium">
              导出报表
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 border rounded-md text-sm font-medium">
              刷新
            </button>
          </div>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-500">外呼总量</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">0</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-500">接通率</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">0%</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-500">有效率</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">0%</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-500">意向转化率</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">0%</p>
          </div>
        </div>

        {/* 报表内容 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">外呼总体指标统计</h2>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded">
            <p className="text-gray-500">暂无数据</p>
          </div>
        </div>

        {/* 空状态 */}
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-400 text-2xl">📈</span>
            </div>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">暂无报表数据</h3>
          <p className="text-sm text-gray-500 mb-6">
            开始创建外呼任务后，系统将自动生成数据报表
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}