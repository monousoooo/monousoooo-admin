<script setup lang="ts">
import { App } from 'ant-design-vue'

defineOptions({
  name: 'TokenProvider',
})
const { message, modal, notification } = App.useApp()

useSetGlobalConfig({
  message,
  modal,
  notification,
} as any)
</script>

<template>
  <slot />
</template>
