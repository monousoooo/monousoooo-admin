<script setup lang="ts">
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'

const editor = ref<EditorJS | null>(null)
onMounted(() => {
  editor.value = new EditorJS({
    holder: 'editorjs',
    placeholder: '请输入内容',
    tools: {
      header: {
        class: Header as any,
        inlineToolbar: ['link'],
      },
    },
  })
})
</script>

<template>
  <div id="editorjs" />
</template>
