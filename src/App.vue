<template>
  <n-message-provider>
    <n-layout>
      <n-layout-header class="text-xl font-bold p-4 bg-gray-100">
        安全工具评估系统
      </n-layout-header>
      <n-layout-content class="p-6">
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-message-provider>
</template>

<script setup lang="ts"></script>
