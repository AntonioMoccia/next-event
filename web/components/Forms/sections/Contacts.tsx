import FormCard from '@/components/FormCard'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CreateEventFormType } from '../CreateEventForm'


function Contacts({ form }: { form: CreateEventFormType }) {
    return (

                <div className="grid md:grid-cols-3 w-full gap-6">
                    <div className="space-y-2 col-span-1">
                        <Label htmlFor="contactEmail" className="text-gray-700">
                            Email di Contatto *
                        </Label>
                        <Input
                            id="contactEmail"
                            type="email"
                            placeholder="info@tuoevento.it"
                            required
                            className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                        />
                    </div>
                    <div className="space-y-2 col-span-1">
                        <Label htmlFor="contactPhone" className="text-gray-700">
                            Telefono
                        </Label>
                        <Input
                            id="contactPhone"
                            type="tel"
                            placeholder="+39 123 456 7890"
                            className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                        />
                    </div>

                    <div className="space-y-2 col-span-1">
                        <Label htmlFor="website" className="text-gray-700">
                            Sito Web
                        </Label>
                        <Input
                            id="website"
                            type="url"
                            placeholder="https://www.tuoevento.it"
                            className="border-gray-300  focus:border-gray-900 focus:ring-gray-900"
                        />
                    </div>
                </div>

    )
}

export default Contacts