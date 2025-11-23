import {createEventZodSchema} from '@/components/Forms/CreateEventForm'
import z from 'zod'

export type Category = {
    id:string,
    description:string
}

export type Event = z.infer<typeof createEventZodSchema> & {
    id:string,
    category:Category
}


