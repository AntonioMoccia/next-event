import { Event } from "@/types"
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card'
import Image from 'next/image'
import { Calendar, MapPin, Users } from "lucide-react"
import { Badge } from '@/components/ui/badge'
import { useRouter } from "next/navigation"

import {formatDate} from '@/lib/format-date'


function EventCard({ event }: { event: Event }) {

    const router = useRouter()
    
    return (
        <Card
            className="cursor-pointer hover:shadow-lg  transition-shadow overflow-hidden"
            onClick={() => router.push(`/events/${event.id}`)}
        >
            {event.image && (
                <div className=" w-full flex justify-center  px-5 items-center">
                    <div className="relative aspect-video rounded w-full overflow-hidden bg-gray-200">
                        <Image
                            src="https://picsum.photos/800"
                            alt="cover"
                            fill
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"

                        />
                    </div>
                </div>

            )}

            <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge variant="secondary">{event.category.description}</Badge>
                    <span className="text-blue-600">{event.price} €</span>
                </div>
                <h3 className="text-gray-900 line-clamp-2">{event.title}</h3>
            </CardHeader>

            <CardContent>
                <p className="text-gray-600 line-clamp-2 mb-4">
                    {event.description}
                </p>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="size-4" />
                        <span className="text-sm">{formatDate(event.startAt.toString())}{event.endAt && ` - ${formatDate(event.endAt.toString())}`}</span>
                    </div>
                    {/*     <div className="flex items-center gap-2 text-gray-600">
            <Clock className="size-4" />
            <span className="text-sm">{event.time}</span>
          </div> */}
                    <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="size-4" />
                        <span className="text-sm">{event.address_name}</span>
                    </div>
                    {event.capacity && (
                        <div className="flex items-center gap-2 text-gray-600">
                            <Users className="size-4" />
                            <span className="text-sm">Max {event.capacity} persone</span>
                        </div>
                    )}
                </div>
            </CardContent>

            <CardFooter className="border-t pt-4">
                <p className="text-gray-500">
                    Organizzato da {event.organizer}
                </p>
            </CardFooter>
        </Card>
    )
}

export default EventCard