<script setup lang="ts">
import { App } from 'ant-design-vue'

const { antd } = useI18nLocale()
</script>

<template>
  <a-config-provider :locale="antd">
    <!-- 等AntDesignVueResolver修复之后替换为a-app -->
    <App>
      <a-qrcode
        value="https://antdv.com"
        status="expired"
        @refresh="() => console.log('refresh')"
      />
    </App>
  </a-config-provider>
</template>
