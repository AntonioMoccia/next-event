"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Event } from "@/types"
import { ArrowLeft, Calendar, Clock, MapPin, Navigation, Users } from "lucide-react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import {formatDate} from '@/lib/format-date'

function EventDetail() {

    const { id } = useParams()
    const [event, setEvent] = useState<Event | null>(null)
    useEffect(() => {

        const getEvent = async () => {
            const request = await fetch(`http://localhost:3001/api/event/${id}`)
            const response = await request.json()
            console.log(response.data.event)
            setEvent(response.data.event)
        }
        getEvent()
    }, [id])

    if (!event) return (<></>)

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}


            <main className="max-w-4xl mx-auto px-4 py-8">
                {/* Hero Image */}
                {event.image && (

                    <div className="relative aspect-[21/9] overflow-hidden rounded-lg bg-gray-200 mb-8">
                        <Image
                            src="https://picsum.photos/800"
                            alt="cover"
                            fill
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"

                        />
                    </div>
                )}
                {/* Title and Badge */}
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                        <Badge variant="secondary" className="text-base px-3 py-1">
                            {event.category.description}
                        </Badge>
                        <span className="text-blue-600">{event.price} €</span>
                    </div>
                    <h1 className="text-gray-900 mb-2">{event.title}</h1>
                    <p className="text-gray-600">
                        Organizzato da {event.organizer}
                    </p>
                </div>

                {/* Key Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <Card>
                        <CardContent>
                            <div className="flex items-start gap-4 h-full  ">
                                <div className="bg-blue-100 p-3  rounded-lg">
                                    <Calendar className="size-6 text-blue-600" />
                                </div>
                                <div className=" h-full flex justin items-center">
                                    <p className="text-gray-900 capitalize">{formatDate(event.startAt.toString())}<br />{event.endAt && ` ${formatDate(event.endAt.toString())}`}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>



                    <Card>
                        <CardContent>
                            <div className="flex items-start gap-4">
                                <div className="bg-purple-100 p-3 rounded-lg">
                                    <MapPin className="size-6 text-purple-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-500 mb-1">Luogo</p>
                                    <p className="text-gray-900">{event.address_name}</p>
                                    <p className="text-gray-600">{event.organizer}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {event.capacity && (
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-orange-100 p-3 rounded-lg">
                                        <Users className="size-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 mb-1">Capacità</p>
                                        <p className="text-gray-900">Massimo {event.capacity} persone</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Description */}
                <Card className="mb-8">
                    <CardContent className="pt-6">
                        <h2 className="text-gray-900 mb-4">Descrizione</h2>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {event.description}
                        </p>
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className=" min-h-10 flex-1" onClick={() => console.log('directions')}>
                        <Navigation className="size-5 mr-2" />
                        Ottieni Indicazioni
                    </Button>
                    <Button size="lg" variant="outline" className=" min-h-10 flex-1">
                        Condividi Evento
                    </Button>
                </div>
            </main>
        </div>
    )
}

export default EventDetail