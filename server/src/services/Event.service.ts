import { Event } from "@controllers/event.controller";
import { prisma } from "@lib/prisma-client";

class EventService {
  private static instance: EventService;

  private constructor() {}

  public static getInstance(): EventService {
    if (!EventService.instance) {
      EventService.instance = new EventService();
    }
    return EventService.instance;
  }

  async createEvent(event:Event){

    //visualizza se esite quella location e se non esiste la crea


    await prisma.event.create({
      data:{
        title:event.title,
        description:event.description,
        data_start:event.date_start,
        time_start:event.time_start,
        date_end:event.date_end,
        time_end:event.time_end,
        id_category:"1"
      }
    })
  }

}
