import { createRouter, createWebHistory } from 'vue-router'

// 引入组件
import ToolEvaluationTable from '@/components/ToolEvaluationTable.vue'
import SASTEvaluationTable from '@/components/SASTEvaluationTable.vue'
import ToolDetailPage from '@/components/ToolDetailPage.vue'
import UnifiedEvaluationTable from '@/components/UnifiedEvaluationTable.vue'

const routes = [
  { path: '/', component: UnifiedEvaluationTable },
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: ToolEvaluationTable,
  // },
  {
    path: '/sast',
    name: 'SAST',
    component: SASTEvaluationTable,
  },
  {
    path: '/tool/codeql',
    name: 'CodeQL',
    component: ToolDetailPage,
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
