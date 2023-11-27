import type { AxiosResponse } from 'axios'
import axios from 'axios'

const userStore = useUserStore()
const notification = useNotification()

interface Response<T = any> {
  code: number
  data: T
  msg: string
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})

instance.interceptors.request.use(
  (config) => {
    if (userStore.token)
      config.headers.Authorization = `Bearer ${userStore.token}`

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response) => {
    const res = response.data as Response
    if (res.code !== 200) {
      notification.error({
        message: res.code,
        description: res.msg,
        duration: 3,
      })
    }
    return response.data
  },
  (error) => {
    if (error.response) {
      const networkErrMap: any = {
        400: '请求错误',
        401: '未授权，请登录',
        403: '拒绝访问',
        404: `请求地址出错: ${error.response.config.url}`,
        405: '请求方法未允许',
        408: '请求超时',
        500: '服务器内部错误',
        501: '服务未实现',
        502: '网关错误',
        503: '服务不可用',
        504: '网关超时',
        505: 'HTTP版本不受支持',
      }
      const { status, data, statusText } = error.response as AxiosResponse<Response>
      notification.error({
        message: status,
        description: data?.msg || networkErrMap[status] || statusText,
        duration: 3,
      })
    }
    return Promise.reject(error)
  },
)

export default instance
