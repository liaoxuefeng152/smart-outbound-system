import DashboardLayout from '@/components/dashboard-layout';

export default function ScenariosPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI话术场景管理</h1>
          <p className="mt-1 text-sm text-gray-500">
            绑定阿里云外呼话术脚本，管理推销对话场景
          </p>
        </div>

        {/* 顶部功能区 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="搜索场景名称"
              className="px-4 py-2 border rounded-md text-sm w-64"
            />
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium">
              新增场景
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 border rounded-md text-sm font-medium">
              刷新
            </button>
          </div>
        </div>

        {/* 话术场景列表 */}
        <div className="bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  场景名称
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  阿里云InstanceId
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ScriptId
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  状态
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
                  暂无话术场景数据
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 空状态 */}
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-400 text-2xl">💬</span>
            </div>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">暂无话术场景</h3>
          <p className="text-sm text-gray-500 mb-6">
            创建AI话术场景，配置推销对话脚本
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
            新增场景
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}