import { Event } from "@/types"
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card'
import Image from 'next/image'
import { Calendar, MapPin, Users } from "lucide-react"
import { Badge } from '@/components/ui/badge'
import { useRouter } from "next/navigation"

import { formatDate } from '@/lib/format-date'


function EventCard({ event }: { event: Event }) {

    const router = useRouter()

    return (
        <div
            className="cursor-pointer w-full bg-transparent border border-[#222222] text-white pt-0 transition-shadow rounded-md overflow-hidden h-full flex flex-col"
            onClick={() => router.push(`/events/${event.id}`)}
        >
            {event.image ? (
                <div className="w-full rounded-md px-1 pt-1 flex justify-center items-center">
                    <div className="relative aspect-video rounded w-full overflow-hidden bg-gray-200">
                        <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                </div>
            ) : (
                <div className="w-full rounded-md px-1 pt-1 flex justify-center items-center">
                    <div className="  relative aspect-video rounded w-full overflow-hidden bg-gray-200">

                    </div>
                </div>
            )}
            {/** CARD HEADER */}
            <div className="px-2 mt-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                    <div className=" border border-[#222222] text-[#222222] text-xs px-2 py-1 rounded-md">{event.category.description}</div>
                     {event.price && event.price > 0 ? (<span className="text-blue-600">{event.price} €</span>) : (<span className="text-blue-600">Gratis</span>)}
                </div>
                <h2 className="line-clamp-2 text-xl text-[#222222] font-black">{event.title}</h2>
                <p className=" text-[rgba(34,34,34,0.8)]">
                    {event.organizer}
                </p>
            </div>

            {/** CARD CONTENT */}
            <div className=" px-2 py-5 flex flex-col text-[#222222]">
                <p className="line-clamp-2 pl-1 mb-4">
                    {event.description}
                </p>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 ">
                        <Calendar className="size-4" />
                        <span className="text-sm">
                            {formatDate(event.startAt.toString())}
                            {event.endAt && ` - ${formatDate(event.endAt.toString())}`}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 ">
                        <MapPin className="size-4" />
                        <span className="text-sm">{event.address_name}</span>
                    </div>

                    {event.capacity && event.capacity > 0 ? (
                        <div className="flex items-center gap-2 ">
                            <Users className="size-4" />
                            <span className="text-sm">Max {event.capacity} persone</span>
                        </div>
                    ) : (null)}
                </div>
            </div>

        </div>
    )
}

export default EventCard