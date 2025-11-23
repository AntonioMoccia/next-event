import { useEffect, useState } from 'react'
import { CreateEventFormType } from '../CreateEventForm'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Uploader } from '@/components/Uploader'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { UseFormReturn } from 'react-hook-form'



function BaseInfo({ form }: { form:CreateEventFormType }) {
    const [categories, setCategories] = useState<{ id: string, description: string }[]>([])
    useEffect(() => {
        const getCategories = async () => {
            const request = await fetch('http://localhost:3001/api/category')
            const response = await request.json()

            setCategories(response.data.categories)
        }
        getCategories()
    }, [])

    return (

        <div className=' w-full flex flex-col gap-5'>
            <div className='grid gap-5 grid-cols-2'>
                <div className='space-y-2 col-span-2 md:col-span-1  '>
                    <FormField
                        control={form.control}
                        name='title'
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Titolo *</FormLabel>
                                    <FormControl>
                                        <Input type='text' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                        }}
                    />
                </div>
                <div className='space-y-2 col-span-2 md:col-span-1'>
                    <FormField
                        control={form.control}
                        name="id_category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Categoria</FormLabel>

                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}  // o value={field.value}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Seleziona la categoria" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Categoria</SelectLabel>

                                                {categories.map(category => (
                                                    <SelectItem
                                                        key={category.id}
                                                        value={category.id}
                                                    >
                                                        {category.description}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>

            </div>
            <div className=' col-span-1'>
                <div className=' w-full'>
                    <FormField
                        name='description'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className='h-full'>
                                <FormLabel>
                                    Descrizione
                                </FormLabel>
                                <FormControl>
                                    <Textarea {...field} className=' h-40' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

            </div>
            <div className=' col-span-1'>
                <div className=' w-full md:col-span-1'>
                    <Uploader form={form} />
                </div>
            </div>
        </div>
    )
}

export default BaseInfo