<template>
  <n-message-provider>
    <n-layout class="w-full min-h-screen flex flex-col">
      <n-layout-header class="bg-white shadow-sm border-b">
        <div class="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3">
          
          <h1 class="text-xl font-semibold text-gray-800" style="text-align: center;">
            开源安全工具评估系统
          </h1>

          <div></div>
        </div>
      </n-layout-header>

      <br/>

      <n-layout-content class="p-6 flex-grow">
        <router-view />
      </n-layout-content>

      <br/>

      <div class="text-gray-400 text-sm" style="text-align: center;">
        Powered by <strong><a href="https://uniontech.com/">Uniontech</a></strong>
      </div>
      
      <br/>

    </n-layout>
  </n-message-provider>
</template>
