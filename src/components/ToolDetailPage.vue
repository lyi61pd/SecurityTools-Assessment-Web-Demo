<template>
  <div class="p-6 max-w-5xl mx-auto bg-gray-50 min-h-screen">
    <!-- 顶部卡片 + 季度选择器 -->
    <n-card size="large" class="mb-6">
      <template #header>
        <div class="flex justify-between items-center">
          <div class="text-lg font-semibold">🛠 CodeQL 工具评估详情</div>
          <n-select
            v-model:value="selectedQuarter"
            :options="quarterOptions"
            size="small"
            style="width: 140px"
          />
        </div>
      </template>

      <div class="flex justify-between items-center">
        <div>
          <p>工具版本：<strong>{{ detail.version }}</strong></p>
          <p>最后更新时间：{{ detail.lastUpdated }}</p>
        </div>
        <n-tag type="success" size="large" round>总评分：{{ detail.totalScore }}</n-tag>
      </div>
    </n-card>

    <!-- 指标评分 -->
    <n-card title="评估指标明细" class="mb-6">
      <n-grid :cols="2" x-gap="16" y-gap="12">
        <n-gi v-for="item in detail.metrics" :key="item.key">
          <n-card size="small" :title="item.label">
            <p class="mb-1">{{ item.description }}</p>
            <n-tag :type="item.score >= 9 ? 'success' : item.score >= 8 ? 'warning' : 'error'" round>
              {{ item.score }} 分
            </n-tag>
            <template v-if="item.extra">
              <p class="text-xs mt-1 text-gray-500">详细数据：{{ item.extra }}</p>
            </template>
          </n-card>
        </n-gi>
      </n-grid>
    </n-card>

    <!-- 环境支持 -->
    <n-card title="环境支持情况" class="mb-6">
      <div class="flex flex-wrap gap-2">
        <n-tag type="info" round>C/C++</n-tag>
        <n-tag type="info" round>Java</n-tag>
        <n-tag type="info" round>Python</n-tag>
        <n-tag type="success" round>Linux</n-tag>
        <n-tag type="success" round>amd64</n-tag>
        <n-tag type="success" round>arm64</n-tag>
      </div>
    </n-card>

    <!-- 时间线日志 -->
    <n-card title="历史更新记录">
      <n-timeline>
        <n-timeline-item
          v-for="(event, idx) in detail.timeline"
          :key="idx"
          :type="event.type"
          :title="event.title"
          :time="event.time"
        >
          {{ event.description }}
        </n-timeline-item>
      </n-timeline>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import {
  NCard,
  NTag,
  NGrid,
  NGi,
  NSelect,
  NTimeline,
  NTimelineItem,
} from 'naive-ui'
import { ref, computed } from 'vue'

interface MetricItem {
  key: string
  label: string
  description: string
  score: number
  extra?: string
}

interface TimelineItem {
  title: string
  time: string
  description: string
  type: 'info' | 'success' | 'error' | 'warning'
}

const selectedQuarter = ref('2025-Q2')

const quarterOptions = [
  { label: '2025 年 Q1', value: '2025-Q1' },
  { label: '2025 年 Q2', value: '2025-Q2' },
  { label: '2025 年 Q3', value: '2025-Q3' },
]

// 季度数据字典
const dataByQuarter: Record<string, {
  version: string
  lastUpdated: string
  totalScore: number
  metrics: MetricItem[]
  timeline: TimelineItem[]
}> = {
  '2025-Q1': {
    version: 'v2.14.0',
    lastUpdated: '2025-02-28',
    totalScore: 8.7,
    metrics: [
      { key: 'activeness', label: '开源活跃度', description: 'GitHub 活跃情况', score: 9.0, extra: '30 次提交' },
      { key: 'openness', label: '开源开放度', description: '组织控制程度', score: 8.0 },
      { key: 'accuracy', label: '准确性', description: '检出率与漏报率', score: 8.8 },
      { key: 'performance', label: '性能', description: '扫描效率与资源消耗', score: 8.3 },
      { key: 'stability', label: '稳定性', description: '宕机与卡顿频率', score: 9.1 },
      { key: 'env', label: '环境支持', description: '架构兼容性', score: 8.8 },
      { key: 'lang', label: '语言支持', description: '语言覆盖范围', score: 9.0 },
    ],
    timeline: [
      { title: '季度评估开始', time: '2025-01-10', description: '启动 Q1 评估', type: 'info' },
      { title: '提交报告', time: '2025-02-20', description: '初步分析完成', type: 'success' },
    ],
  },
  '2025-Q2': {
    version: 'v2.15.3',
    lastUpdated: '2025-05-05',
    totalScore: 9.1,
    metrics: [
      {
        key: 'activeness',
        label: '开源活跃度',
        description: '最近 GitHub 上 Commit/PR/Issue 活跃情况',
        score: 9.5,
        extra: '最近30天内有40次提交',
      },
      {
        key: 'openness',
        label: '开源开放度',
        description: '是否为单一公司控制，贡献者数量',
        score: 8.0,
        extra: '贡献者超过30人',
      },
      {
        key: 'accuracy',
        label: '准确性',
        description: '基于标准测试集检出率与漏报率',
        score: 9.0,
        extra: '检出率 92%，漏报率 5%',
      },
      {
        key: 'performance',
        label: '性能',
        description: '扫描速度与资源消耗表现',
        score: 8.7,
        extra: '平均每分钟分析50个文件，内存占用600MB',
      },
      {
        key: 'stability',
        label: '稳定性',
        description: '是否易卡死/报错，异常情况处理',
        score: 9.2,
      },
      {
        key: 'env',
        label: '环境支持',
        description: '平台架构支持情况',
        score: 9.0,
      },
      {
        key: 'lang',
        label: '语言支持',
        description: '支持语言是否全面',
        score: 9.3,
        extra: '支持C/C++、Java、Python、JavaScript等',
      },
    ],
    timeline: [
      {
        title: '评分更新',
        time: '2025-05-05 10:00',
        description: '准确性评分从 8.5 上调为 9.0',
        type: 'info',
      },
      {
        title: '版本升级',
        time: '2025-05-01',
        description: '升级到 v2.15.3，增加语言支持',
        type: 'success',
      },
      {
        title: '活跃度分析更新',
        time: '2025-04-20',
        description: '同步最新 GitHub 活跃度数据',
        type: 'warning',
      },
    ],
  },
  '2025-Q3': {
    version: 'v2.16.0-beta',
    lastUpdated: '2025-08-01',
    totalScore: 9.2,
    metrics: [
      { key: 'activeness', label: '开源活跃度', description: '活跃度持续增强', score: 9.7 },
      { key: 'openness', label: '开源开放度', description: '社区参与更多', score: 8.3 },
      { key: 'accuracy', label: '准确性', description: '进一步优化模型', score: 9.3 },
      { key: 'performance', label: '性能', description: '分析能力提高', score: 9.0 },
      { key: 'stability', label: '稳定性', description: '系统稳定运行', score: 9.4 },
      { key: 'env', label: '环境支持', description: '兼容多平台', score: 9.1 },
      { key: 'lang', label: '语言支持', description: '新增 Go 语言支持', score: 9.5 },
    ],
    timeline: [
      { title: 'Beta 版本发布', time: '2025-07-20', description: 'v2.16.0-beta 推出', type: 'info' },
      { title: '新增语言支持', time: '2025-07-28', description: '新增 Go 语言分析器', type: 'success' },
    ],
  },
}

const detail = computed(() => dataByQuarter[selectedQuarter.value] || dataByQuarter['2025-Q2'])
</script>
