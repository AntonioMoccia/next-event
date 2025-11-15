import React from 'react'
import { CreateEventFormType } from '../CreateEventForm'
import FormCard from '@/components/FormCard'
import { Clock, ImageIcon, Info, MapPin, Users } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Uploader } from '@/components/Uploader'
import Age from './Age'

function BaseInfo({ form }: { form: CreateEventFormType }) {


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
                            <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Fruits</SelectLabel>
                                <SelectItem value="apple">Apple</SelectItem>
                                <SelectItem value="banana">Banana</SelectItem>
                                <SelectItem value="blueberry">Blueberry</SelectItem>
                                <SelectItem value="grapes">Grapes</SelectItem>
                                <SelectItem value="pineapple">Altro</SelectItem>
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