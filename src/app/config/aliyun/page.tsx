import DashboardLayout from '@/components/dashboard-layout';

export default function AliyunConfigPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">阿里云接口配置</h1>
          <p className="mt-1 text-sm text-gray-500">
            统一配置阿里云对接参数，全局生效
          </p>
        </div>

        {/* 配置表单 */}
        <div className="bg-white rounded-lg shadow p-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  阿里云AccessKey ID *
                </label>
                <input
                  type="text"
                  className="px-4 py-2 border rounded-md w-full"
                  placeholder="请输入阿里云AccessKey ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  阿里云AccessKey Secret *
                </label>
                <input
                  type="password"
                  className="px-4 py-2 border rounded-md w-full"
                  placeholder="请输入阿里云AccessKey Secret"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  外呼主号码 *
                </label>
                <input
                  type="text"
                  className="px-4 py-2 border rounded-md w-full"
                  placeholder="请输入外呼主号码"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  回调地址（HTTPS）*
                </label>
                <input
                  type="text"
                  className="px-4 py-2 border rounded-md w-full"
                  placeholder="请输入回调地址"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  接口超时时间（秒）
                </label>
                <input
                  type="number"
                  className="px-4 py-2 border rounded-md w-full"
                  placeholder="30"
                  defaultValue="30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  重试次数
                </label>
                <input
                  type="number"
                  className="px-4 py-2 border rounded-md w-full"
                  placeholder="3"
                  defaultValue="3"
                />
              </div>
            </div>

            {/* 底部按钮 */}
            <div className="flex items-center justify-end space-x-4">
              <button className="px-6 py-2 bg-white text-gray-700 border rounded-md text-sm font-medium">
                测试连接
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-medium">
                保存配置
              </button>
            </div>
          </form>
        </div>

        {/* 配置说明 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-900 mb-2">配置说明</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• 请确保阿里云账号已完成实名认证和电信资质审核</li>
            <li>• 请确保已开通阿里云语音服务并申请了正规外呼号码</li>
            <li>• 回调地址必须是HTTPS协议，且可公网访问</li>
            <li>• 配置保存后系统会自动校验阿里云接口连通性</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}