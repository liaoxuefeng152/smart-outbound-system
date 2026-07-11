import Link from 'next/link';
import { Phone, BarChart3, Users, MessageSquare, Target, Clock, Shield, Zap, ChevronRight, CheckCircle2, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 导航栏 */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">智能推销外呼系统</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">功能特性</a>
            <a href="#advantages" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">产品优势</a>
            <a href="#scenarios" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">适用场景</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-gray-700">登录</Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">立即注册</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero区域 */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-blue-50/50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                基于阿里云智能外呼能力
              </div>
              <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
                AI驱动的智能外呼
                <br />
                <span className="text-blue-600">让推销效率提升10倍</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                替代人工首轮推销触达，机器人全自动拨打、标准化话术推销、客户意向自动分级，
                全程录音留存，让外呼更高效、更智能、更合规。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/register">
                  <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 h-12 px-8 text-base">
                    免费试用
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 text-base">
                  <Play className="w-4 h-4 mr-2" />
                  观看演示
                </Button>
              </div>
              <div className="flex items-center gap-8">
                <div>
                  <div className="text-2xl font-bold text-gray-900">10000+</div>
                  <div className="text-sm text-gray-500">日呼量</div>
                </div>
                <div className="w-px h-10 bg-gray-200"></div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">98%</div>
                  <div className="text-sm text-gray-500">接通率</div>
                </div>
                <div className="w-px h-10 bg-gray-200"></div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">30%</div>
                  <div className="text-sm text-gray-500">意向转化率</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl shadow-blue-100 border border-gray-100 p-6 relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-700">外呼数据概览</span>
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">实时</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-2xl font-bold text-blue-600">3,247</div>
                      <div className="text-xs text-gray-500">今日拨打</div>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-2xl font-bold text-green-600">1,856</div>
                      <div className="text-xs text-gray-500">已接通</div>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-2xl font-bold text-orange-600">289</div>
                      <div className="text-xs text-gray-500">高意向</div>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-2xl font-bold text-purple-600">57%</div>
                      <div className="text-xs text-gray-500">接通率</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Phone className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-700">产品推销任务A</div>
                        <div className="text-xs text-gray-500">进行中 · 1245/2000</div>
                      </div>
                    </div>
                    <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">外呼中</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-700">客户回访任务B</div>
                        <div className="text-xs text-gray-500">已完成 · 856/856</div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">已完成</span>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-green-200/30 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 功能特性 */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">核心功能</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              覆盖外呼全流程，从任务创建到数据复盘，一站式智能外呼解决方案
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: '批量智能外呼', desc: '支持批量导入客户号码，机器人全自动拨打，单任务支持万级号码并发', color: 'blue' },
              { icon: MessageSquare, title: 'AI智能对话', desc: '基于阿里云大模型，智能识别客户意图，自动应答产品相关问题', color: 'green' },
              { icon: Target, title: '意向自动分级', desc: '自动识别客户意向（高意向/观望/无意向/无效），精准筛选有效客户', color: 'orange' },
              { icon: Users, title: '号码资源管理', desc: '客户号码库管理、自动去重、黑名单拦截，避免重复骚扰', color: 'purple' },
              { icon: BarChart3, title: '数据统计报表', desc: '全方位数据统计，接通率、意向转化率、话术效果分析一目了然', color: 'cyan' },
              { icon: Shield, title: '合规安全保障', desc: '严格遵循隐私保护法规，全程录音留存，操作日志可追溯', color: 'red' },
            ].map((feature, index) => (
              <div key={index} className="group p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${
                  feature.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  feature.color === 'green' ? 'bg-green-100 text-green-600' :
                  feature.color === 'orange' ? 'bg-orange-100 text-orange-600' :
                  feature.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                  feature.color === 'cyan' ? 'bg-cyan-100 text-cyan-600' :
                  'bg-red-100 text-red-600'
                }`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 产品优势 */}
      <section id="advantages" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">为什么选择我们</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              相比传统人工外呼，智能外呼系统带来革命性的效率提升
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { value: '10x', label: '效率提升', desc: '机器人日呼量是人工的10倍' },
              { value: '70%', label: '成本降低', desc: '大幅减少人力成本投入' },
              { value: '24h', label: '持续工作', desc: '全天候不间断外呼服务' },
              { value: '100%', label: '标准话术', desc: '统一话术，避免人为偏差' },
            ].map((item, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-sm">
                <div className="text-4xl font-bold text-blue-600 mb-2">{item.value}</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">{item.label}</div>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 适用场景 */}
      <section id="scenarios" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">适用场景</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              广泛适用于各类需要电话触达客户的业务场景
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: '产品推销', desc: '新品上市、活动推广，批量触达潜在客户' },
              { title: '客户回访', desc: '售后服务、满意度调研、客户关怀' },
              { title: '贷款催收', desc: '逾期提醒、还款通知，合规催收' },
              { title: '会员通知', desc: '会员活动、积分到期、优惠提醒' },
              { title: '预约确认', desc: '服务预约、订单确认、到店提醒' },
              { title: '线索筛选', desc: '营销线索初筛，高意向客户转人工跟进' },
            ].map((scenario, index) => (
              <div key={index} className="flex items-start gap-4 p-5 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-colors">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{scenario.title}</h3>
                  <p className="text-sm text-gray-600">{scenario.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA区域 */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            立即开始智能外呼之旅
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            注册即可免费试用，无需复杂配置，快速上手
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto h-12 px-8 text-base bg-white text-blue-600 hover:bg-gray-100">
                免费注册
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-base border-white/30 text-white hover:bg-white/10">
                已有账号，立即登录
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Phone className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-semibold">智能推销外呼系统</span>
            </div>
            <div className="text-sm">
              © 2026 智能推销外呼系统. 基于阿里云智能外呼能力构建
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
