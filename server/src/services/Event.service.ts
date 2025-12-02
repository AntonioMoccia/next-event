import { Event } from "../types/index";
import { prisma } from "@lib/prisma-client";

export class EventService {
  constructor() {}

  async getEventById(id: string) {
    try {
      const event = await prisma.event.findUnique({
        where: {
          id,
        },
        include: {
          category: true,
          location: true,
        },
      });
      return event;
    } catch (error) {
      console.log(error);
      throw new Error("Qualcosa è andato storto nell'estrazione dell'evento");
    }
  }

  async getEvents() {
    try {
      const events = await prisma.event.findMany({
        include: {
          category: true,
          location: true,
        },
      });
      return events;
    } catch (error) {
      console.log(error);
      throw new Error("Qualcosa è andato storto nell'estrazione degli eventi");
    }
  }
  async createEvent(event: Event) {
    if (!event) throw new Error("l'oggetto event non puo essere vuoto");
    try {
      const newEvent = await prisma.event.create({
        data: {
          ...event,
          title: event.title,
          image: event.image!,
          location: {
            create: {
              address_name: event.location.address_name,
              place_id: event.location.place_id,
              lat: event.location.lat,
              lng: event.location.lng,
            },
          },
        },
      });

      await prisma.tempImage.delete({
        where: {
          url: event.image,
        },
      });

      return newEvent;
    } catch (error) {
      console.log(error);
      throw new Error("Qualcosa è andato storto nella creazione dell'evento");
    }
  }
}
