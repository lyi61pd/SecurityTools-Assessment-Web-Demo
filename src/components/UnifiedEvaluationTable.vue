<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <!-- 内容区域 -->
    <main class="flex-grow p-6">
      
      <n-card
        size="large"
        class="shadow-sm w-full"
        style="margin: 0 auto; max-width: 100%; padding: 1rem 5vw;"
      >
      <div class="text-sm text-gray-700 leading-relaxed">
        目前开源安全工具繁多，缺少一个完整的评估体系来对安全工具的各方面能力进行考量。
        为了全面而客观地评估开源安全工具的安全能力，由<strong>开放原子开源基金会</strong>旗下的<strong>开源安全委员会</strong>发起，
        由<strong>统信软件</strong>牵头，联合
        <strong>阿里、百度、斗象、绿盟、蚂蚁、奇安信、水木羽林、赛迪</strong>共同推进此项目。
        <br /><br />
        <strong>SecurityTools-Assessment</strong> 致力于从多个维度对开源安全工具进行评估，衡量应用安全产品的能力优劣，
        为安全产品的技术选型提供支持。
        <br /><br />
        项目地址：
        <a
          href="https://atomgit.com/securitytools-assessment/SecurityTools-Assessment"
          class="text-blue-600 underline hover:text-blue-800"
          target="_blank"
        >
          https://atomgit.com/securitytools-assessment/SecurityTools-Assessment
        </a>
    </div>

      

      </n-card>
      <n-card
        title="安全工具统一评估总览"
        size="large"
        class="shadow-sm w-full"
        style="margin: 0 auto; max-width: 100%; padding: 1rem 5vw;"
      >

        <!-- 分类 + 季度筛选 -->
        <div class="flex items-center justify-between mb-4">
          <n-select
            v-model:value="selectedQuarter"
            :options="quarterOptions"
            placeholder="选择季度"
            size="small"
            style="width: 160px"
          />
          <n-tabs v-model:value="selectedCategory" type="line" animated size="large">
            <n-tab v-for="tab in categoryOptions" :key="tab.value" :name="tab.value">
              {{ tab.label }}
            </n-tab>
          </n-tabs>
        </div>

        <!-- 表格 -->
        <n-data-table
          :columns="columns"
          :data="filteredTools"
          :bordered="true"
          :striped="true"
          size="small"
          style="width: 100%"
          scroll-x="100%"
        />

        <!-- 指标说明 -->
        <n-divider title-placement="left" class="mt-8">各项指标说明</n-divider>
        <ul class="text-sm text-gray-600 space-y-1 pl-4 list-disc">
          <li><strong>开源活跃度：</strong>最近 GitHub 上 Commit / PR / Issue 的频率</li>
          <li><strong>开源开放度：</strong>是否为单一公司控制，贡献者多样性</li>
          <li><strong>准确性：</strong>工具对安全问题的检出率与漏报率</li>
          <li><strong>性能：</strong>单位时间扫描能力，资源消耗</li>
          <li><strong>稳定性：</strong>运行是否稳定，有无崩溃、卡顿</li>
          <li><strong>环境相关性：</strong>是否支持常见架构（amd64、arm64）、系统</li>
          <li><strong>语言相关性：</strong>支持哪些主流编程语言</li>
        </ul>

        <!-- Benchmark 简述 -->
        <n-divider title-placement="left" class="mt-6">测试集与评估基准</n-divider>
        <div class="text-sm text-gray-700 leading-relaxed mb-8">
          本评估参考了标准测试集 <strong>OWASP Benchmark</strong>、<strong>Juliet Test Suite</strong> 以及实际开源项目样本，用于衡量准确性、性能与稳定性。评分采用统一标准量化，以确保工具间的横向可比性。
        </div>

      </n-card>
    </main>


  </div>
</template>

<script setup lang="ts">
import { ref, computed, h } from 'vue'
import { useRouter } from 'vue-router'
import {
  NTag,
  NButton,
  NTabs,
  NTab,
  NDivider,
  NSelect,
  type DataTableColumns,
} from 'naive-ui'

const router = useRouter()

// 工具数据结构
interface Tool {
  category: string
  name: string
  version: string
  totalScore: number
  activeness: number
  openness: number
  accuracy: number
  performance: number
  stability: number
  envSupport: number
  langSupport: number
  lastUpdated: string
}

// 当前选择项
const selectedCategory = ref('SAST')
const selectedQuarter = ref('2025-Q2')

const categoryOptions = [
  { label: 'SAST', value: 'SAST' },
  { label: 'DAST', value: 'DAST' },
  { label: 'IAST', value: 'IAST' },
  { label: 'FUZZ', value: 'FUZZ' },
  { label: 'SCA', value: 'SCA' },
]

const quarterOptions = [
  { label: '2025 年 Q1', value: '2025-Q1' },
  { label: '2025 年 Q2', value: '2025-Q2' },
  { label: '2025 年 Q3', value: '2025-Q3' },
]

// 多季度工具数据（已加入 version 字段）
const toolsByQuarter = ref<Record<string, Tool[]>>({
  '2025-Q1': [
    {
      category: 'SAST',
      name: 'CodeQL',
      version: 'v2.14.0',
      totalScore: 8.9,
      activeness: 9.0,
      openness: 8.0,
      accuracy: 8.8,
      performance: 8.4,
      stability: 9.0,
      envSupport: 8.8,
      langSupport: 9.1,
      lastUpdated: '2025-02-28',
    },
  ],
  '2025-Q2': [
    {
      category: 'SAST',
      name: 'CodeQL',
      version: 'v2.15.3',
      totalScore: 9.1,
      activeness: 9.5,
      openness: 8.0,
      accuracy: 9.0,
      performance: 8.7,
      stability: 9.2,
      envSupport: 9.0,
      langSupport: 9.3,
      lastUpdated: '2025-05-05',
    },
    {
      category: 'SAST',
      name: 'Infer',
      version: 'v1.1.0',
      totalScore: 8.2,
      activeness: 8.5,
      openness: 7.0,
      accuracy: 8.0,
      performance: 7.8,
      stability: 8.1,
      envSupport: 8.5,
      langSupport: 9.0,
      lastUpdated: '2025-05-03',
    },
    {
      category: 'DAST',
      name: 'OWASP ZAP',
      version: 'v2.14.1',
      totalScore: 8.0,
      activeness: 8.0,
      openness: 9.0,
      accuracy: 7.5,
      performance: 7.8,
      stability: 8.2,
      envSupport: 8.0,
      langSupport: 7.5,
      lastUpdated: '2025-04-20',
    },
  ],
})

// 根据分类 + 季度过滤表格数据
const filteredTools = computed(() => {
  const list = toolsByQuarter.value[selectedQuarter.value] || []
  return list.filter(tool => tool.category === selectedCategory.value)
})

// 打分标签颜色
const scoreTag = (score: number) =>
  h(
    NTag,
    {
      type: score >= 9 ? 'success' : score >= 8 ? 'warning' : 'error',
      size: 'small',
      round: true,
      bordered: false,
    },
    () => score.toFixed(1)
  )

// 表格列定义（已新增 version 字段）
const columns: DataTableColumns<Tool> = [
  { title: '工具名称', key: 'name', fixed: 'left' },
  { title: '版本号', key: 'version' },
  {
    title: '总评分',
    key: 'totalScore',
    render: row => scoreTag(row.totalScore),
  },
  { title: '开源活跃度', key: 'activeness', render: row => scoreTag(row.activeness) },
  { title: '开源开放度', key: 'openness', render: row => scoreTag(row.openness) },
  { title: '准确性', key: 'accuracy', render: row => scoreTag(row.accuracy) },
  { title: '性能', key: 'performance', render: row => scoreTag(row.performance) },
  { title: '稳定性', key: 'stability', render: row => scoreTag(row.stability) },
  { title: '环境相关性', key: 'envSupport', render: row => scoreTag(row.envSupport) },
  { title: '语言相关性', key: 'langSupport', render: row => scoreTag(row.langSupport) },
  {
    title: '最后更新时间',
    key: 'lastUpdated',
    render: row => new Date(row.lastUpdated).toLocaleDateString(),
  },
  {
    title: '评估详情',
    key: 'actions',
    width: 120,
    render: row =>
      h(
        NButton,
        {
          size: 'small',
          type: 'info',
          ghost: true,
          round: true,
          onClick: () => {
            const id = row.name.toLowerCase()
            router.push(`/tool/${id}`)
          },
        },
        { default: () => '查看详情' }
      ),
  },
]
</script>
