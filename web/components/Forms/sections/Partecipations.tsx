import { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel } from '@/components/ui/select'
import { CreateEventFormType } from '../CreateEventForm'
import { FormControl, FormItem, FormMessage, FormLabel, FormField } from '@/components/ui/form'
import Age from './Age'
import { UseFormReturn } from 'react-hook-form'

function Partecipations({ form }: { form: UseFormReturn<CreateEventFormType> }) {

    const [eventTypes, setEventTypes] = useState<{ id: string, description: string }[]>([])
    useEffect(() => {
        const getEventTypes = async () => {
            const request = await fetch('http://localhost:3001/api/event_type')
            const response = await request.json()
            setEventTypes(response.data.event_types)
        }
        getEventTypes()
    }, [])

    return (
        <div className="grid md:grid-cols-3 gap-10 py-5 w-full">
            <div className="space-y-2 col-span-1">

                <FormField
                    control={form.control}
                    name='event_type'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel> Tipo Evento *</FormLabel>

                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}  // o value={field.value}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Seleziona la tipologia" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Tipologia</SelectLabel>

                                            {
                                                eventTypes.map(eventType => (
                                                    <SelectItem key={eventType.id} value={eventType.id}>{eventType.description}</SelectItem>
                                                ))
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

            </div>
            <div className="space-y-2 col-span-1">
                <FormField
                    name='price'
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="price" className="text-gray-700">
                                Prezzo (€)
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    id="price"
                                    type="number"
                                    placeholder="0.00"
                                    step="0.01"
                                    className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <Age form={form} />
        </div>

    )
}

export default Partecipations