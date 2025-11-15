import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectLabel, SelectItem, SelectGroup } from '@/components/ui/select'
import { CreateEventFormType } from '../CreateEventForm'

function Age({form}:{form : CreateEventFormType}) {
    return (
        <div className='space-y-2 col-span-1'>
            <Label> Età </Label>
            <Select>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Fruits</SelectLabel>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="blueberry">Blueberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Altro</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default Age