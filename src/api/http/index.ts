import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import config from './config'
import { CODE_MSG } from '../../constants/request'
import AppConfig from '../../config/dev'
import { createBrowserHistory } from 'history';
const history = createBrowserHistory()
const { api } = AppConfig 
declare module 'axios' {
  interface AxiosRequestConfig {
    prompt?: any
  }
}

const Http = axios.create({ ...config, ...api})

export const HandleResponse = (res:any) => {
  if (res.data.code === 200) {
    console.log(res.data.data)
    return res.data.data
  } else {
    switch (res.data.code) {
      case 201:
      history.push('/login')
      break
    }
    return handleError(res.data)
  }
}

export const handleError = (res:any) => {
  if (Http.defaults.prompt) {
    Http.defaults.prompt(CODE_MSG[res.code])
  }
  console.log(res.code, res.msg)
  return Promise.reject(res)
}

Http.interceptors.request.use( (rconfig:any) =>{
  return rconfig 
})
/* disable no-unused-vars */
Http.interceptors.response.use(HandleResponse, (err) => {
  console.log('app_error', err)
  return Promise.reject('error')
})

export interface Http extends AxiosInstance{
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
}
export default (Http as Http)
