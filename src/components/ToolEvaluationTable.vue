<template>
    <div class="flex justify-center items-start min-h-screen bg-gradient-to-br from-white to-gray-100 p-10">
      <n-card
        title="🔍 安全工具评估总览"
        size="large"
        bordered
        style="width: 100%; max-width: 960px;"
        header-style="font-size: 20px; font-weight: bold;"
      >
        <n-data-table
          :columns="columns"
          :data="tools"
          :bordered="true"
          :striped="true"
          size="medium"
          class="shadow-sm rounded"
        />
      </n-card>
    </div>
  </template>
  
  <script setup lang="ts">
  import { h, ref } from 'vue'
  import type { DataTableColumns } from 'naive-ui'
  import { NTag } from 'naive-ui'
  
  interface ToolItem {
    category: string
    name: string
    score: number
    lastUpdated: string
  }
  
  const tools = ref<ToolItem[]>([
    { category: 'SAST', name: 'Cppcheck', score: 8.5, lastUpdated: '2025-05-10' },
    { category: 'SAST', name: 'Infer', score: 8.2, lastUpdated: '2025-04-28' },
    { category: 'SAST', name: 'CodeQL', score: 9.1, lastUpdated: '2025-05-01' },
    { category: 'DAST', name: 'OWASP ZAP', score: 8.0, lastUpdated: '2025-04-20' },
    { category: 'FUZZ', name: 'Atheris', score: 7.8, lastUpdated: '2025-04-22' },
    { category: 'SCA', name: 'OSS Review Toolkit', score: 8.6, lastUpdated: '2025-05-05' },
  ])
  
  const getScoreColor = (score: number): string => {
    if (score >= 9) return 'success'
    if (score >= 8) return 'warning'
    return 'error'
  }
  
  const columns: DataTableColumns<ToolItem> = [
    {
      title: '工具分类',
      key: 'category',
    },
    {
      title: '工具名称',
      key: 'name',
    },
    {
      title: '总评分',
      key: 'score',
      render(row) {
        return h(
          NTag,
          {
            type: getScoreColor(row.score),
            round: true,
            bordered: false,
          },
          () => `${row.score}`
        )
      },
    },
    {
      title: '最后更新时间',
      key: 'lastUpdated',
      render(row) {
        const date = new Date(row.lastUpdated)
        return date.toLocaleDateString()
      },
    },
  ]
  </script>
  