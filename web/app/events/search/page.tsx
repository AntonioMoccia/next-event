'use client'
import EventCard from '@/components/EventCard'
import { useEffect, useState } from 'react'
import { Event } from '@/types'

function SearchEventPage() {
    const [events, setEvents] = useState<Event[]>([])
    useEffect(() => {
        const getAllEvents = async () => {
            const request = await fetch('http://localhost:3001/api/event')
            const response = await request.json()

            setEvents(response.data.events)

        }
        getAllEvents()
    }, [])

    return (
        <div>
            <div className=' grid grid-cols-12 gap-5 px-10'>
                {
                    events.map(event => (
                        <div key={event.id} className=' col-span-12 md:col-span-4 '>
                            <EventCard event={event} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default SearchEventPage