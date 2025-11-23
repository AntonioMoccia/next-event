import FormCard from '@/components/FormCard'
import { MapPin } from 'lucide-react'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Command, CommandItem, CommandList, CommandEmpty, CommandGroup, CommandInput } from '@/components/ui/command'
import { CreateEventFormType } from '../CreateEventForm'
import { useEffect, useEffectEvent, useState } from 'react'
import { PlaceAutocompleteResult } from '@googlemaps/google-maps-services-js'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

export type AddressType = {
    address: string
    place_id: string
}

function Address({ form }: { form: CreateEventFormType }) {

    const [suggestions, setSuggestions] = useState<PlaceAutocompleteResult[]>([])
    const [locationString, setLocationString] = useState("")
    const [location, setLocation] = useState("")
    const [coords, setCoords] = useState<{
        lat: number,
        lng: number
    }>({
        lat: 0,
        lng: 0
    })


    useEffect(() => {
        const searchSuggetions = async () => {
            if (locationString == "") return
            const request = await fetch(`http://localhost:3001/api/google/suggestions?q=${locationString}`)
            const response = await request.json()

            setSuggestions(response.suggestions)
        }
        searchSuggetions()
    }, [locationString])
    useEffect(() => {
        const getCoords = async () => {
            if (locationString == "") return
            const request = await fetch(`http://localhost:3001/api/google/coords?place_id=${location}`)
            const response = await request.json()

            form.setValue('lat', response.coords.lat)
            form.setValue('lng', response.coords.lng)
            setCoords(response.coords)

        }
        getCoords()
    }, [location])

    return (
        <>

            <div className=' col-span-12 md:col-span-6'>
                <FormField
                    control={form.control}
                    name='organizer'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Organizzatore
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='es. associazione.. o Bar..'
                                    {...field}
                                    type='text'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className=' col-span-12 md:col-span-6'>

                <FormField
                    control={form.control}
                    name='address_name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Indirizzo
                            </FormLabel>
                            <Command className="rounded-lg border w-full shadow-md ">
                                <FormControl>
                                    <CommandInput {...field} value={locationString} onValueChange={setLocationString} placeholder="Type a command or search..." />
                                </FormControl>
                                {suggestions?.length > 0 && (
                                    <CommandList>
                                        <CommandEmpty>No results found.</CommandEmpty>

                                        <CommandGroup heading="Suggestions">
                                            {suggestions.map((locationAddress) => (
                                                <CommandItem
                                                    key={locationAddress.place_id}
                                                    value={locationAddress.description}
                                                    onSelect={() => {
                                                        console.log(locationAddress)
                                                        form.setValue('address_name', locationAddress.description)
                                                        form.setValue('place_id', locationAddress.place_id)
                                                        setLocationString(locationAddress.description)
                                                        setLocation(locationAddress.place_id)
                                                        setSuggestions([]) // chiude la lista
                                                    }}
                                                >
                                                    {locationAddress.description}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                )}

                            </Command>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </>



    )
}


export default Address