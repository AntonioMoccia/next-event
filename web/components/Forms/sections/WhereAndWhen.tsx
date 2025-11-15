import React from 'react'
import { CreateEventFormType } from '../CreateEventForm'
import FormCard from '@/components/FormCard'
import { Clock } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Address from './Address'


//da aggiungere inizio e fine

function WhereAndWhen({ form }: { form: CreateEventFormType }) {
    return (

        <div className="grid grid-cols-12 w-full gap-6">
            <div className='grid grid-cols-2 col-span-12 gap-5 md:col-span-6'>
                <div className="space-y-2 col-span-1 ">
                    <Label htmlFor="startDate" className="text-gray-700">
                        Data inizio *
                    </Label>
                    <Input
                        id="startDate"
                        type="date"
                        required
                        onChange={() => { }}
                        className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                    />
                </div>
                <div className="space-y-2 col-span-1">
                    <Label htmlFor="startTime" className="text-gray-700">
                        Ora Inizio *
                    </Label>
                    <Input
                        id="startTime"
                        type="time"
                        required
                        onChange={() => { }}
                        className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                    />
                </div>
            </div>



         <div className='grid grid-cols-2 col-span-12 gap-5 md:col-span-6'>
                <div className="space-y-2 col-span-1 ">
                    <Label htmlFor="startDate" className="text-gray-700">
                        Data fine *
                    </Label>
                    <Input
                        id="endDate"
                        type="date"
                        required
                        onChange={() => { }}
                        className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                    />
                </div>
                <div className="space-y-2 col-span-1">
                    <Label htmlFor="startTime" className="text-gray-700">
                        Ora fine *
                    </Label>
                    <Input
                        id="endTime"
                        type="time"
                        required
                        onChange={() => { }}
                        className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                    />
                </div>
            </div>



            <Address form={form} />

        </div>

    )
}

export default WhereAndWhen