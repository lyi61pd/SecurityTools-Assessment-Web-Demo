import { createRouter, createWebHistory } from 'vue-router'

// 引入组件
import ToolDetailPage from '@/components/ToolDetailPage.vue'
import UnifiedEvaluationTable from '@/components/UnifiedEvaluationTable.vue'

const routes = [
  { path: '/', component: UnifiedEvaluationTable },
  {
    path: '/tool/codeql',
    name: 'CodeQL',
    component: ToolDetailPage,
  },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
