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
import Address from './sections/Address'
import Partecipations from './sections/Partecipations'

import Contacts from './sections/Contacts'
import Age from './sections/Age'

const formSchema = z.object({
    title: z.string("canno't be empty").min(2, "The title must be min 2 chars"),
    category: z.string(),
    description: z.string(),
    data_inizio: z.string(),
    ora_inizio: z.string(),
    data_fine: z.string(),
    ora_fine: z.string(),
    address_name: z.string()
})

type FormType = z.infer<typeof formSchema>
export type CreateEventFormType = UseFormReturn<FormType>
function CreateEventForm() {

    const form = useForm({
        resolver: zodResolver(formSchema)
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
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