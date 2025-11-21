import { Event } from "../types/index";
import { prisma } from "@lib/prisma-client";

export class EventService {
  private event: Event | undefined;
  constructor(event: Event | undefined) {
    this.event = event;
  }

  async createEvent() {
    if (!this.event) throw new Error("l'oggetto event non puo essere vuoto");
    try {
      const newEvent = await prisma.event.create({
        data: {
          ...this.event,
          image: "",
/*           id_category:"1",
          id_event_type:"1" */
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error("Qualcosa è andato storto nella creazione dell'evento");
    }
  }
}
