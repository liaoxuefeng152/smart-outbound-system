import DashboardLayout from '@/components/dashboard-layout';

export default function CustomersPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">号码库列表</h1>
          <p className="mt-1 text-sm text-gray-500">
            管理所有待外呼客户资源
          </p>
        </div>

        {/* 顶部功能区 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="搜索手机号"
              className="px-4 py-2 border rounded-md text-sm w-64"
            />
            <select className="px-4 py-2 border rounded-md text-sm">
              <option>全部状态</option>
              <option>未拨打</option>
              <option>已拨打</option>
              <option>已接通</option>
              <option>有意向</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium">
              导入号码
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 border rounded-md text-sm font-medium">
              新增号码
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 border rounded-md text-sm font-medium">
              刷新
            </button>
          </div>
        </div>

        {/* 客户号码列表 */}
        <div className="bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  手机号
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  客户姓名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  备注
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  来源渠道
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  外呼状态
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  意向标签
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  创建时间
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  暂无号码数据
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 空状态 */}
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-gray-400 text-2xl">📱</span>
            </div>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">暂无客户号码</h3>
          <p className="text-sm text-gray-500 mb-6">
            开始导入您的客户号码资源
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
            导入号码
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}