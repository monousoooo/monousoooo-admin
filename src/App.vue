<script setup lang="ts">
import { App } from 'ant-design-vue'
import EditorJS from '@/components/EditorJs/index.vue'

const { antd } = useI18nLocale()
</script>

<template>
  <a-config-provider :locale="antd">
    <!-- 等AntDesignVueResolver修复之后替换为a-app -->
    <App>
      <EditorJS />
    </App>
  </a-config-provider>
</template>
