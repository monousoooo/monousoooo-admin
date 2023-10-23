<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css'
import type { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import Editor from './editor.vue'
import Toolbar from './toolbar.vue'

const props = defineProps({
  modelValue: {
    type: [String],
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const defaultHtml = useVModel(props, 'modelValue', emit)

const editorRef = shallowRef<IDomEditor>()

const mode = ref('default')

const toolbarConfig: Partial<IToolbarConfig> = {}

const editorConfig: Partial<IEditorConfig> = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      // 自定义图片上传
      async customUpload(_file: any, _insertFn: any) {
      },
    },
  },
  onCreated(editor) {
    editorRef.value = editor
  },
  onChange(editor) {
    emit('update:modelValue', editor.getHtml())
  },
}
onBeforeUnmount(() => {
  editorRef.value?.destroy()
})
</script>

<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :default-config="toolbarConfig"
      :mode="mode"
    />
    <Editor
      v-model="defaultHtml"
      style="height: 500px; overflow-y: hidden;"
      :default-config="editorConfig"
      :mode="mode"
    />
  </div>
</template>
