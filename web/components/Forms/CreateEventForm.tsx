"use client"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm, UseFormReturn } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from '@/components/ui/form'
import FormCard from '@/components/FormCard'
import { Button } from '../ui/button'


import z from 'zod'

import BaseInfo from './sections/BaseInfo'
import WhereAndWhen from './sections/WhereAndWhen'
import Partecipations from './sections/Partecipations'
import Contacts from './sections/Contacts'

import { useEffect } from 'react'
import { Event } from '@/types'


export const createEventZodSchema = z.object({
    title: z.string("canno't be empty").min(3, "The title must be min 3 chars"),
    id_category: z.string(),
    description: z.string(),
    image: z.string().optional(),
    id_event_type: z.string(),
    price: z.number(),
    age: z.string(),
    startAt: z.date(),
    endAt: z.date().optional(),
    address_name: z.string(),
    lat: z.number(),
    lng: z.number(),
    place_id: z.string(),
    email: z.string().optional(),
    phone: z.string(),
    website: z.string(),
    capacity: z.number(),
    organizer: z.string()
})

type FormType = z.infer<typeof createEventZodSchema>
export type CreateEventFormType = UseFormReturn<FormType>

function CreateEventForm() {
    const form = useForm({
        resolver: zodResolver(createEventZodSchema),
        defaultValues: {
            id_category: "",
            description: "",
            image: "",
            id_event_type: "",
            price: 0,
            title: "",
            capacity: 0,
            startAt: new Date(),
            endAt: new Date(),
            address_name: "",
            lat: 0,
            lng: 0,
            place_id: "",
            email: "",
            phone: "",
            website: "",
            organizer: ""
        }
    })
    useEffect(() => {
        console.log(form.getValues())
    }, [form])

    async function onSubmit(values: z.infer<typeof createEventZodSchema>) {

        const payload = {
            ...values,
            startAt: values.startAt.toISOString(),
            endAt: values.endAt?.toISOString(),
        }
        console.log(payload)
        const request = await fetch('http://localhost:3001/api/event', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        })


        const newEvent = await request.json()
        console.log("Payload finale:", payload)
        console.log("Payload finale:", newEvent)
    }

    return (
        <div className=' p-2 w-full max-w-3xl'>
            <Form {...form}>
                <form className='flex flex-col gap-5' onSubmit={form.handleSubmit(onSubmit)}>
                    <FormCard
                        withTitle={false}
                        title=""
                        description=""
                        content={
                            <div className=' flex flex-col justify-start items-center gap-5'>
                                <BaseInfo />
                                <WhereAndWhen />
                                <Partecipations />
                            </div>
                        }
                    />

                    <FormCard
                        title="Dove possono contattarti?"
                        description="Questi contatti saranno resi pubblici"
                        content={
                            <Contacts />
                        }
                    />
                    <div className=' w-full flex items-center justify-center'>
                        <Button size={'lg'} type={'submit'}>
                            Pubblica evento
                        </Button>
                    </div>
                </form>
            </Form>
        </div >
    )
}

export default CreateEventForm