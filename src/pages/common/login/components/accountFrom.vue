<script setup lang="ts">
import { Form } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import { useAxios } from '@vueuse/integrations/useAxios'
import instance from '@/utils/interceptors'

interface LoginResponse {
  token: string
  user: {
    id: number
    name: string
    email: string
    avatar: string
    created_at: string
    updated_at: string
  }
}
const { execute } = useAxios<LoginResponse>('/login/password', { method: 'POST' }, instance, { immediate: false })

const loginType = ref(0)
const message = useMessage()

const useForm = Form.useForm
interface FormModel {
  username: string
  password: string
  checked: boolean
  captcha: string
}
const modelRef = reactive<FormModel>({
  username: '',
  password: '',
  checked: false,
  captcha: '',
})
async function validateUsername(_rule: Rule, value: string) {
  if (loginType.value === 0) {
    if (!value)
      return Promise.reject(new Error('请输入手机号/邮箱'))
  }
  else {
    if (!value)
      return Promise.reject(new Error('请输入手机号'))

    if (!/^(1[3456789]|9[28])\d{9}$/.test(value))
      return Promise.reject(new Error('请输入正确的手机号'))
  }
}

async function validatePassword(_rule: Rule, value: string) {
  if (loginType.value === 0) {
    if (!value)
      return Promise.reject(new Error('请输入密码'))
  }
}

async function validateCaptcha(_rule: Rule, value: string) {
  if (loginType.value !== 0) {
    if (!value)
      return Promise.reject(new Error('请输入验证码'))
  }
}

const rulesRef = reactive({
  username: [{ validator: validateUsername, trigger: 'change' }],
  password: [{ validator: validatePassword, trigger: 'change' }],
  captcha: [{ validator: validateCaptcha, trigger: 'change' }],
})

const { clearValidate, resetFields, validate, validateInfos } = useForm(
  modelRef,
  rulesRef,
)

function switchLoginType() {
  resetFields()
  loginType.value = loginType.value === 0 ? 1 : 0
}

const usernamePlaceholder = computed(() => {
  return loginType.value === 0 ? '手机号/邮箱' : '手机号'
})
const { time, startTime, isActive } = useCountDown(5)

function getCaptcha() {
  clearValidate(['captcha'])
  validate(['username'])
    .then(() => {
      startTime()
    })
    .catch(() => {})
}

function handleLogin() {
  validate()
    .then(() => {
      if (loginType.value !== 0) {
        if (!modelRef.checked)
          message.error('请勾选服务协议与隐私政策')
      }
      else {
        execute({
          data: {
            username: modelRef.username,
            password: modelRef.password,
          },
        })
      }
    })
    .catch((_err) => {
    })
}

const validateInfosBind = computed(() => {
  if (loginType.value === 0)
    return validateInfos.password
  else
    return validateInfos.captcha
})
</script>

<template>
  <div class="account-from">
    <a-form>
      <a-form-item v-bind="validateInfos.username">
        <a-input
          v-model:value="modelRef.username"
          :placeholder="usernamePlaceholder"
          size="large"
        />
      </a-form-item>

      <a-form-item v-bind="validateInfosBind">
        <Transition name="fade" mode="out-in">
          <a-input-password
            v-if="loginType === 0 ? true : false"
            v-model:value="modelRef.password"
            placeholder="密码"
            size="large"
          />
          <div v-else class="flex">
            <a-input
              v-model:value="modelRef.captcha"
              placeholder="验证码"
              size="large"
            />
            <a-button
              class="m-l-4"
              size="large"
              :disabled="isActive"
              @click="getCaptcha"
            >
              {{ !isActive ? "获取验证码" : `${time}s 重试` }}
            </a-button>
          </div>
        </Transition>
      </a-form-item>

      <a-form-item>
        <div class="flex-between">
          <a>忘记密码</a>
          <a @click="switchLoginType">{{
            loginType === 0 ? "验证码登录" : "密码登录"
          }}</a>
        </div>
      </a-form-item>

      <a-form-item>
        <a-button
          block
          type="primary"
          html-type="submit"
          size="large"
          @click="handleLogin"
        >
          {{ loginType === 0 ? "登录" : "登录 / 注册" }}
        </a-button>
      </a-form-item>
      <a-form-item>
        <div v-if="loginType === 0 ? true : false" class="flex-center">
          <p>还没有账号？<a @click="switchLoginType">前往注册</a></p>
        </div>
        <div v-else class="flex">
          <a-checkbox v-model:checked="modelRef.checked" />
          <div class="ml-2">
            未注册的手机号将自动注册。勾选即代表您同意并接受
            <a href="/terms/license"> 服务协议 </a>
            与
            <a href="/terms/privacy">隐私政策</a>
          </div>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
:deep(.ant-checkbox) {
  position: relative;
  top: -0.6em;
}
</style>
