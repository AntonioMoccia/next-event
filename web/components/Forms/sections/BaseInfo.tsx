import { useEffect, useState } from 'react'
import { CreateEventFormType } from '../CreateEventForm'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Uploader } from '@/components/Uploader'


function BaseInfo({ form }: { form: CreateEventFormType }) {
    const [categories, setCategories] = useState<{ id: string, description: string }[]>([])
    useEffect(() => {
        const getCategories = async () => {
            const request = await fetch('http://localhost:3001/api/category')
            const response = await request.json()
            console.log(response)
            setCategories(response.data.categories)
        }
        getCategories()
    }, [])

    return (

        <div className=' w-full flex flex-col gap-5'>
            <div className='grid gap-5 grid-cols-2'>
                <div className='space-y-2 col-span-2 md:col-span-1  '>
                    <Label>Titolo *</Label>
                    <Input type='text' />
                </div>
                <div className='space-y-2 col-span-2 md:col-span-1'>
                    <Label> Categoria </Label>
                    <Select>
                        <SelectTrigger className=" w-full">
                            <SelectValue placeholder="Seleziona la categoria" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Categoria</SelectLabel>
                                {
                                    categories.map(category=>(
                                            <SelectItem key={category.id} value={category.id}>{category.description}</SelectItem>
                                    ))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

            </div>
            <div className=' col-span-1 grid gap-10 grid-cols-2'>
                <div className='space-y-2 col-span-2 md:col-span-1'>
                    <Label>
                        Descrizione
                    </Label>
                    <Textarea className=' h-full' />
                </div>
                <div className='space-y-2 col-span-2 md:col-span-1'>
                    <Label>
                        Immagine
                    </Label>
                    <Uploader />
                </div>
            </div>
        </div>
    )
}

export default BaseInfo