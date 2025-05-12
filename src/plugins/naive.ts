// src/plugins/naive.ts
import {
    create,
    NButton,
    NDataTable,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NMessageProvider,
    NCard,
  } from 'naive-ui'
  
  export const naive = create({
    components: [
      NButton,
      NDataTable,
      NLayout,
      NLayoutHeader,
      NLayoutContent,
      NMessageProvider,
      NCard,
    ],
  })
  