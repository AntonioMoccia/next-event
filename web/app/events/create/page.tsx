import CreateEventForm from "@/components/Forms/CreateEventForm"

function page() {

  return (
    <div className='w-full bg-[rgb(250,250,250)] h-full min-h-screen bgred flex flex-col justify-start items-center pt-12'>
      <div className=" flex flex-col gap-3 my-5">
        <h1 className=" font-bold text-4xl text-center">Pubblica il tuo Evento</h1>
        <p className=" text-center">
          Compila il form per pubblicare il tuo evento.</p>
      </div>
      <CreateEventForm />
    </div>
  )
}

export default page