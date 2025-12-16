import {api} from './api'

export const events = {
    getAllPublicEvents:async ()=>{
        const response = await api.get('/events')
        console.log(response.data)
    }
}