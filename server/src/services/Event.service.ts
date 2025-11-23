import { Event } from "../types/index";
import { prisma } from "@lib/prisma-client";

export class EventService {
  private event: Event | undefined;
  constructor(event?: Event | undefined) {
    this.event = event;
  }

    async getEventById(id:string) {
    try {
      const event = await prisma.event.findUnique({
        where:{
          id
        },
        include:{
          category:true
        }
      })
      return event

    } catch (error) {
      console.log(error);
      throw new Error("Qualcosa è andato storto nell'estrazione dell'evento");
    }
  }

  async getEvents() {
    try {
      const events = await prisma.event.findMany({
        include:{
          category:true
        }
      })
      return events

    } catch (error) {
      console.log(error);
      throw new Error("Qualcosa è andato storto nell'estrazione degli eventi");
    }
  }
  async createEvent() {
    if (!this.event) throw new Error("l'oggetto event non puo essere vuoto");
    try {
      console.log(this.event);
      const newEvent = await prisma.event.create({
        data: {
          ...this.event,
          title: this.event.title,
          image: this.event.image!,
        },
      });
      return newEvent
    } catch (error) {
      console.log(error);
      throw new Error("Qualcosa è andato storto nella creazione dell'evento");
    }
  }
}
