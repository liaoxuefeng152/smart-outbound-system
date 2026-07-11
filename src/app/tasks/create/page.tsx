import DashboardLayout from '@/components/dashboard-layout';

export default function CreateTaskPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">创建外呼任务</h1>
          <p className="mt-1 text-sm text-gray-500">
            新建阿里云智能外呼推销任务
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <form className="space-y-6">
            {/* 基础信息 */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-900">基础信息</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    任务名称 *
                  </label>
                  <input
                    type="text"
                    className="px-4 py-2 border rounded-md w-full"
                    placeholder="请输入任务名称"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    AI话术场景 *
                  </label>
                  <select className="px-4 py-2 border rounded-md w-full">
                    <option>请选择话术场景</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    外呼模式 *
                  </label>
                  <select className="px-4 py-2 border rounded-md w-full">
                    <option>自动外呼</option>
                    <option>预测外呼</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 拨打规则配置 */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-900">拨打规则配置</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    允许外呼时间段
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="time"
                      className="px-4 py-2 border rounded-md"
                      placeholder="开始时间"
                    />
                    <input
                      type="time"
                      className="px-4 py-2 border rounded-md"
                      placeholder="结束时间"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    未接通重试次数
                  </label>
                  <select className="px-4 py-2 border rounded-md w-full">
                    <option>0次</option>
                    <option>1次</option>
                    <option>2次</option>
                    <option>3次</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    单号码拨打间隔（秒）
                  </label>
                  <input
                    type="number"
                    className="px-4 py-2 border rounded-md w-full"
                    placeholder="60"
                    defaultValue="60"
                  />
                </div>
              </div>
            </div>

            {/* 选择外呼号码资源 */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-900">选择外呼号码资源</h2>
              <div className="flex items-center space-x-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm">
                  选择已有号码分组
                </button>
                <button className="px-4 py-2 bg-white text-gray-700 border rounded-md text-sm">
                  Excel导入号码
                </button>
              </div>
            </div>

            {/* 底部按钮 */}
            <div className="flex items-center justify-end space-x-4">
              <button className="px-6 py-2 bg-white text-gray-700 border rounded-md text-sm font-medium">
                返回列表
              </button>
              <button className="px-6 py-2 bg-white text-gray-700 border rounded-md text-sm font-medium">
                保存草稿
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-medium">
                立即创建任务
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}