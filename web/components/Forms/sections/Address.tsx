import { Input } from '@/components/ui/input'
import { Command, CommandItem, CommandList, CommandEmpty, CommandGroup, CommandInput } from '@/components/ui/command'
import { useDebugValue, useEffect, useState } from 'react'
import { PlaceAutocompleteResult } from '@googlemaps/google-maps-services-js'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useFormContext } from 'react-hook-form'

import { useClickOutside } from '@/hooks/use-clickoutside'
import { useDebounce } from '@/hooks/use-debounce'
export type AddressType = {
    address: string
    place_id: string
}

function Address() {

    const [suggestions, setSuggestions] = useState<PlaceAutocompleteResult[]>([])
    const [locationString, setLocationString] = useState("")
    const [location, setLocation] = useState("")
    const [isSelected, setIsSelected] = useState(false)
    const [open, setOpen] = useState(false)
    const useOnClickOutside = useClickOutside(() => setOpen(false))

    const [coords, setCoords] = useState<{
        lat: number,
        lng: number
    }>({
        lat: 0,
        lng: 0
    })
    const form = useFormContext()
    const dab = useDebounce(locationString, 500)
    useEffect(() => {
        if (isSelected) return
        const searchSuggetions = async () => {
            setSuggestions([])
            if (!dab) return
            const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/google/suggestions?q=${dab}`)
            const response = await request.json()

            setSuggestions(response.suggestions)
        }
        searchSuggetions()
    }, [dab])
    useEffect(() => {
        const getCoords = async () => {
            if (locationString == "") return
            const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/google/coords?place_id=${location}`)
            const response = await request.json()

            form.setValue('lat', response.coords.lat)
            form.setValue('lng', response.coords.lng)
            setCoords(response.coords)

        }
        getCoords()
    }, [location])

    return (
        <>


            <div ref={useOnClickOutside} className=' col-span-12 md:col-span-6'>

                <FormField
                    control={form.control}
                    name='address_name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Indirizzo
                            </FormLabel>
                            <div className=' flex gap-2'>

                                <Command className=" border border-black rounded-md w-full shadow-md ">
                                    <FormControl>
                                        <CommandInput {...field} value={locationString} onValueChange={(string) => {
                                            setOpen(true)
                                            setLocationString(string)
                                        }} placeholder="Type a command or search..." />
                                    </FormControl>
                                    {open && (
                                        <CommandList>
                                            <CommandGroup heading="Suggestions">
                                                <CommandEmpty>No results found.</CommandEmpty>

                                                {suggestions.map((locationAddress) => (
                                                    <CommandItem
                                                        key={locationAddress.place_id}
                                                        value={locationAddress.description}
                                                        onSelect={() => {
                                                            setOpen(false)
                                                            form.setValue('address_name', locationAddress.description)
                                                            setSuggestions([]) // chiude la lista
                                                            form.setValue('place_id', locationAddress.place_id)
                                                            setIsSelected(true)
                                                            setLocationString(locationAddress.description)
                                                            setIsSelected(false)
                                                            setLocation(locationAddress.place_id)
                                                        }}
                                                    >
                                                        {locationAddress.description}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    )}

                                </Command>

                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

            </div>
        </>



    )
}


export default Address