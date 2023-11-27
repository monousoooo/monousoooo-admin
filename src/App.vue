<script setup lang="ts">
import { App } from 'ant-design-vue'

const { antd } = useI18nLocale()
</script>

<template>
  <a-config-provider :locale="antd">
    <!-- 等AntDesignVueResolver修复之后替换为a-app -->
    <App>
      <TokenProvider>
        <router-view />
      </TokenProvider>
    </App>
  </a-config-provider>
</template>
