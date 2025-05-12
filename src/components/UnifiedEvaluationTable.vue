<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <n-card
      title="安全工具统一评估总览"
      size="large"
      class="shadow-sm w-full"
      style="margin: 0 auto; max-width: 100%; padding: 1rem 5vw;"
    >
      <!-- Tab 分类 -->
      <n-tabs
        v-model:value="selectedCategory"
        type="line"
        animated
        class="mb-4"
      >
        <n-tab
          v-for="tab in categoryOptions"
          :key="tab.value"
          :name="tab.value"
        >
          {{ tab.label }}
        </n-tab>
      </n-tabs>

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
      <n-divider title-placement="left" class="mt-8">
        各项指标说明
      </n-divider>
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
      <n-divider title-placement="left" class="mt-6">
        测试集与评估基准
      </n-divider>
      <div class="text-sm text-gray-700 leading-relaxed">
        本评估参考了标准测试集 <strong>OWASP Benchmark</strong>、<strong>Juliet Test Suite</strong> 以及
        实际开源项目样本，用于衡量准确性、性能与稳定性。评分采用统一标准量化，以确保工具间的横向可比性。
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, h, computed } from 'vue'
import { NTag, NButton, NTabs, NTab, NDivider } from 'naive-ui'
import { useRouter } from 'vue-router'
import type { DataTableColumns } from 'naive-ui'

const router = useRouter()

interface Tool {
  category: string
  name: string
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

// 工具数据
const tools = ref<Tool[]>([
  {
    category: 'SAST',
    name: 'Cppcheck',
    totalScore: 8.5,
    activeness: 8.2,
    openness: 9.0,
    accuracy: 7.5,
    performance: 8.0,
    stability: 8.8,
    envSupport: 9.2,
    langSupport: 8.5,
    lastUpdated: '2025-05-10',
  },
  {
    category: 'SAST',
    name: 'Infer',
    totalScore: 8.2,
    activeness: 8.5,
    openness: 7.0,
    accuracy: 8.0,
    performance: 7.8,
    stability: 8.1,
    envSupport: 8.5,
    langSupport: 9.0,
    lastUpdated: '2025-05-02',
  },
  {
    category: 'SAST',
    name: 'CodeQL',
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
    category: 'DAST',
    name: 'OWASP ZAP',
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
])

// 当前选择分类
const selectedCategory = ref('SAST')

const categoryOptions = [
  { label: 'SAST', value: 'SAST' },
  { label: 'DAST', value: 'DAST' },
  { label: 'IAST', value: 'IAST' },
  { label: 'FUZZ', value: 'FUZZ' },
  { label: 'SCA', value: 'SCA' },
]

// 筛选当前分类数据
const filteredTools = computed(() =>
  tools.value.filter(tool => tool.category === selectedCategory.value)
)

// 渲染分数颜色
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

// 表格列定义
const columns: DataTableColumns<Tool> = [
  { title: '工具名称', key: 'name', fixed: 'left' },
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
