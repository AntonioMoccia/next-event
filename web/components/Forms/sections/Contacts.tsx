import FormCard from '@/components/FormCard'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CreateEventFormType } from '../CreateEventForm'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'


function Contacts({ form }: { form: CreateEventFormType }) {
    return (

        <div className="grid md:grid-cols-3 w-full gap-6">
            <div className="space-y-2 col-span-1">
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>

                            <FormLabel htmlFor="contactEmail" className="text-gray-700">
                                Email di Contatto *
                            </FormLabel>
                            <FormControl>

                                <Input
                                    {...field}
                                    id="contactEmail"
                                    type="email"
                                    placeholder="info@tuoevento.it"
                                    className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="space-y-2 col-span-1">
                <FormField
                    control={form.control}
                    name='phone'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="contactPhone" className="text-gray-700">
                                Telefono
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    id="contactPhone"
                                    type="tel"
                                    placeholder="+39 123 456 7890"
                                    className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className="space-y-2 col-span-1">
                <FormField
                    control={form.control}
                    name='website'
                    render={() => (
                        <FormItem>
                            <FormLabel htmlFor="website" className="text-gray-700">
                                Sito Web
                            </FormLabel>
                            <FormControl>

                                <Input
                                    id="website"
                                    type="url"
                                    placeholder="https://www.tuoevento.it"
                                    className="border-gray-300  focus:border-gray-900 focus:ring-gray-900"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>

    )
}

export default Contacts