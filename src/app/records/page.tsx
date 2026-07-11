import DashboardLayout from '@/components/dashboard-layout';

export default function RecordsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">通话记录与复盘</h1>
          <p className="mt-1 text-sm text-gray-500">
            全量通话数据复盘、质检、回访
          </p>
        </div>

        {/* 顶部筛选 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <input
              type="date"
              className="px-4 py-2 border rounded-md text-sm"
              placeholder="开始时间"
            />
            <input
              type="date"
              className="px-4 py-2 border rounded-md text-sm"
              placeholder="结束时间"
            />
            <select className="px-4 py-2 border rounded-md text-sm">
              <option>全部意向等级</option>
              <option>高意向</option>
              <option>观望</option>
              <option>无意向</option>
            </select>
            <select className="px-4 py-2 border rounded-md text-sm">
              <option>全部接通状态</option>
              <option>已接通</option>
              <option>未接通</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 bg-white text-gray-700 border rounded-md text-sm font-medium">
              导出数据
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 border rounded-md text-sm font-medium">
              刷新
            </button>
          </div>
        </div>

        {/* 通话记录列表 */}
        <div className="bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  手机号
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  拨打时间
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  通话时长
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  接通状态
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  意向标签
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  录音
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  暂无通话记录数据
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 空状态 */}
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-400 text-2xl">📊</span>
            </div>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">暂无通话记录</h3>
          <p className="text-sm text-gray-500 mb-6">
            开始创建外呼任务，系统将自动记录通话数据
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}