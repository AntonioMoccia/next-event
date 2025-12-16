import {Axios, AxiosInstance} from 'axios'


export const api : AxiosInstance =  new Axios({
    baseURL:`${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_API_VERSION}`,
    withCredentials:true
})


