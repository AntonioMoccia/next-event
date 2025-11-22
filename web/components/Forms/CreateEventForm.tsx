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

const formSchema = z.object({
    title: z.string("canno't be empty").min(3, "The title must be min 3 chars"),
    category: z.string(),
    description: z.string(),
    image: z.string().optional(),
    event_type: z.string(),
    price: z.coerce.number().min(0).optional(),
    age: z.string(),
    startAt: z.date(),
    endAt: z.date().optional(),
    address_name: z.string(),
    lat: z.number(),
    lng: z.number(),
    place_id: z.string(),
    email: z.string().optional(),
    phone: z.string(),
    website: z.string()

})

type FormType = z.infer<typeof formSchema>
export type CreateEventFormType = UseFormReturn<FormType>
function CreateEventForm() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            category: "",
            description: "",
            image: "",
            event_type: "",
            price: 0,
            age: "",
            title: "",
            startAt: new Date(),
            endAt: new Date(),
            address_name: "",
            lat: 0,
            lng: 0,
            place_id: "",
            email: "",
            phone: "",
            website: ""
        }
    })
    useEffect(() => {
        console.log(form)
        console.log('form')
    }, [form])

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const payload = {
            ...values,
            startAt: values.startAt.toISOString(),
            endAt: values.endAt?.toISOString(),
        }
        const request = await fetch('http://localhost:3001/api/event', {

        })
        console.log("Payload finale:", payload)
    }

    return (
        <div className=' p-5 w-full max-w-5xl'>
            <Form {...form}>
                <form className='flex flex-col gap-10' onSubmit={form.handleSubmit(onSubmit)}>
                    <FormCard
                        withTitle={false}
                        title=""
                        description=""
                        content={
                            <div className=' flex flex-col justify-start items-center gap-5'>
                                <BaseInfo form={form} />
                                <Partecipations form={form} />
                            </div>
                        }
                    />

                    <FormCard
                        withTitle={false}
                        content={
                            <>
                                <WhereAndWhen form={form} />
                            </>
                        }
                    />
                    <FormCard
                        title="Dove possono contattarti?"
                        description="Questi contatti saranno resi pubblici"
                        content={
                            <Contacts form={form} />
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