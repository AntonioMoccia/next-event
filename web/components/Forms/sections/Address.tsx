import FormCard from '@/components/FormCard'
import { MapPin } from 'lucide-react'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Command, CommandItem, CommandList, CommandEmpty, CommandGroup, CommandInput } from '@/components/ui/command'
import { CreateEventFormType } from '../CreateEventForm'
import { useEffect, useState } from 'react'
import { PlaceAutocompleteResult } from '@googlemaps/google-maps-services-js'

export type AddressType = {
    address: string
    place_id: string
}

function Address({ form }: { form: CreateEventFormType }) {

    const [suggestions, setSuggestions] = useState<PlaceAutocompleteResult[]>([])
    const [locationString, setLocationString] = useState("")
    const [location, setLocation] = useState("")

    useEffect(() => {
        const searchSuggetions = async () => {
            if(locationString == "" ) return
            const request = await fetch(`http://localhost:3001/api/google/suggestions?q=${locationString}`)
            const response = await request.json()

            setSuggestions(response.suggestions)
        }
        searchSuggetions()
    }, [locationString])

    return (

        <div className="grid  col-span-12 gap-6">

                <Command className="rounded-lg border w-full shadow-md md:min-w-[450px]">
                    <CommandInput value={locationString} onValueChange={setLocationString} placeholder="Type a command or search..." />

                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>

                        {suggestions?.length > 0 && (
                            <CommandGroup heading="Suggestions">
                                {suggestions.map((locationAddress) => (
                                    <CommandItem
                                        key={locationAddress.place_id}
                                        value={locationAddress.description}
                                        onSelect={() => {
                                            setLocationString(locationAddress.description)
                                            setLocation(locationAddress.place_id)
                                            setSuggestions([]) // chiude la lista
                                        }}
                                    >
                                        {locationAddress.description}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                    </CommandList>

                </Command>

        </div>

    )
}


export default Address