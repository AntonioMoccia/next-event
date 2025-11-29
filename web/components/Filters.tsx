import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import Address from '@/components/Forms/sections/Address'

function Filters() {
    return (

        <div className=' grid grid-cols-12 gap-2'>
            <div className=' col-span-4'>
             {/*  <Address /> */}
            </div>
            <div className=' col-span-1'>
                <Select
                    onValueChange={()=>console.log('')}
                    defaultValue={''}  // o value={field.value}

                >
                    <SelectTrigger className=" border border-black rounded-md w-full">
                        <SelectValue placeholder="Seleziona la categoria" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                                <SelectItem
                                    key={'category.id'}
                                    value={'category.id'}
                                >
                                    {'category.description'}
                                </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className=' col-span-1'>
                <Input />
            </div>
        </div>
    )
}

export default Filters