import { Users } from 'lucide-react'

import FormCard from '@/components/FormCard'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from '@/components/ui/select'
import { CreateEventFormType } from '../CreateEventForm'
import Age from './Age'

function Partecipations({ form }: { form: CreateEventFormType }) {
    return (
        <div className="grid md:grid-cols-3 gap-10 py-5 w-full">
            <div className="space-y-2 col-span-1">
                <Label htmlFor="ticketType" className="text-gray-700">
                    Tipo Evento *
                </Label>
                <Select required>
                    <SelectTrigger className="border-gray-300 w-full focus:border-gray-900 focus:ring-gray-900">
                        <SelectValue placeholder="Seleziona tipo" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="free">Gratuito</SelectItem>
                        <SelectItem value="paid">A pagamento</SelectItem>
                        <SelectItem value="donation">Offerta libera</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2 col-span-1">
                <Label htmlFor="price" className="text-gray-700">
                    Prezzo (€)
                </Label>
                <Input
                    id="price"
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                    className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                />
            </div>
            <Age form={form} />
        </div>

    )
}

export default Partecipations