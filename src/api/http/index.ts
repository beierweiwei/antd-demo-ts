import axios from 'axios'
import config from './config'
import { CODE_MSG } from '../../constants/request'
import AppConfig from '../../config/dev'
const { api } = AppConfig 
console.log(api)
declare module 'axios' {
  interface AxiosRequestConfig {
    prompt?: any
  }
}
const Http = axios.create({ ...config, ...api})

export const HandleResponse = (res:any) => {
  if (res.data.code === 200) {
    return res.data.data
  } else {
    switch (res.data.code) {
      case 201:
        // window.$VUE_ADMIN.$router.push({ name: 'login' })
        break
    }
    return handleError(res.data)
  }
}

export const handleError = (res:any) => {
  if (Http.defaults.prompt) {
    Http.defaults.prompt(CODE_MSG[res.code])
  }
  return Promise.reject(res)
}

Http.interceptors.request.use( (rconfig:any) =>{
  console.log('---------------------------', rconfig)
  return rconfig 
})
/* disable no-unused-vars */
Http.interceptors.response.use(HandleResponse, (err) => {
  console.log('app_error', err)
  return Promise.reject('error')
})
export default Http
