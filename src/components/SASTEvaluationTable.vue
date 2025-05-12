<template>
    <div class="flex justify-center min-h-screen bg-gray-50 p-6">
      <n-card
        title="SAST 工具详细评估"
        size="large"
        style="width: 100%; max-width: 1200px"
        class="shadow-md"
      >
        <n-data-table
          :columns="columns"
          :data="tools"
          :bordered="true"
          :striped="true"
          size="small"
          :scroll-x="1600"
        />
        <n-divider title-placement="left">变更时间线</n-divider>

        <n-timeline>
        <n-timeline-item
            v-for="(event, index) in timeline"
            :key="index"
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
  
  import { h, ref } from 'vue'
  import { NTag } from 'naive-ui'
  import type { DataTableColumns } from 'naive-ui'
  
  interface ToolMetrics {
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
  
  const tools = ref<ToolMetrics[]>([
    {
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
  ])
  
  const coloredScore = (score: number) =>
    h(
      NTag,
      {
        type: score >= 9 ? 'success' : score >= 8 ? 'warning' : 'error',
        round: true,
        bordered: false,
        size: 'small',
      },
      () => score.toFixed(1)
    )
  
  const columns: DataTableColumns<ToolMetrics> = [
    { title: '工具名称', key: 'name', fixed: 'left' },
    {
      title: '总评分',
      key: 'totalScore',
      render: row => coloredScore(row.totalScore),
    },
    { title: '开源活跃度', key: 'activeness', render: row => coloredScore(row.activeness) },
    { title: '开源开放度', key: 'openness', render: row => coloredScore(row.openness) },
    { title: '准确性', key: 'accuracy', render: row => coloredScore(row.accuracy) },
    { title: '性能', key: 'performance', render: row => coloredScore(row.performance) },
    { title: '稳定性', key: 'stability', render: row => coloredScore(row.stability) },
    { title: '环境相关性', key: 'envSupport', render: row => coloredScore(row.envSupport) },
    { title: '语言相关性', key: 'langSupport', render: row => coloredScore(row.langSupport) },
    {
      title: '最后更新时间',
      key: 'lastUpdated',
      render: row => new Date(row.lastUpdated).toLocaleDateString(),
    },
  ]


  import { NDivider, NTimeline, NTimelineItem } from 'naive-ui'

    interface TimelineEvent {
        title: string
        time: string
        description: string
        type: 'info' | 'success' | 'error' | 'warning' | undefined
        }

        const timeline = ref<TimelineEvent[]>([
        {
            title: '评分更新',
            time: '2025-05-10 10:15',
            description: 'Cppcheck 的准确性评分从 7.0 上调至 7.5',
            type: 'info',
        },
        {
            title: '版本变更',
            time: '2025-05-05 16:42',
            description: 'CodeQL 升级到 v2.15.3，支持更多语言特性',
            type: 'success',
        },
        {
            title: '外部数据同步',
            time: '2025-04-30 09:20',
            description: '同步最新 GitHub commit 活跃度数据',
            type: 'warning',
        },
        {
            title: '评分修正',
            time: '2025-04-25 14:00',
            description: 'Infer 的开放度评分从 8.0 修正为 7.0',
            type: 'error',
        },
    ])

  </script>
  