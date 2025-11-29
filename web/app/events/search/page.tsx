'use client'
import EventCard from '@/components/EventCard'
import { useEffect, useState } from 'react'
import { Event } from '@/types'
import Filters from '@/components/Filters'

function SearchEventPage() {
    const [events, setEvents] = useState<Event[]>([])
    useEffect(() => {
        const getAllEvents = async () => {
            const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/event`)
            const response = await request.json()

            setEvents(response.data.events)

        }
        getAllEvents()
    }, [])

    return (
        <div className='flex flex-col justify-center'>
            {/**FILTERS */}
            <div className=' w-full flex  justify-center py-5'>
                <div className='max-w-7xl w-full px-5'>
                    <Filters />
                </div>
            </div>


            {/** CARDS */}
            <div className=' w-full flex  justify-center py-5'>
                <div className=' max-w-7xl grid grid-cols-12 gap-5 md:gap-10 px-5'>
                    {
                        events.map(event => (
                            <div key={event.id} className=' col-span-12 md:col-span-4 '>
                                <EventCard event={event} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default SearchEventPage