import { EventStatus, Prisma } from "@lib/generated/prisma";
import { FilterTypes, Event, User, Filters } from "../types/index";
import { prisma } from "@lib/prisma-client";
import parseQueryNumber from "@lib/parse-query-number";
import { getPagination } from "@lib/pagination";
import { getDistanceFromRad } from "@lib/get-distance-from-rad";
import { parseISO } from "date-fns";

export class EventService {
  constructor() {}

  async changeEventStatus(id: string, status: EventStatus) {
    try {
      const updatedEvent = await prisma.event.update({
        where: { id },
        data: { status },
      });
      return updatedEvent;
    } catch (error) {
      throw new Error(
        "Qualcosa è andato storto nel cambio dello stato dell'evento"
      );
    }
  }

  async updateEvent(id: string, eventData: Partial<Event>) {
    try {
      // Extract relational fields and prepare a Prisma-compatible payload
      const { id_category, location, ...rest } = eventData || {};
      const data: any = { ...rest };

      if (id_category) {
        // map category id to Prisma connect shape
        data.category = { connect: { id: id_category } };
      }

      if (location) {
        // map location to nested update (adjust fields as needed)
        data.location = {
          update: {
            address_name: (location as any).address_name,
            place_id: (location as any).place_id,
            lat: (location as any).lat,
            lng: (location as any).lng,
          },
        };
      }

      const updatedEvent = await prisma.event.update({
        where: { id },
        data,
        include: { location: true, category: true },
      });
      return updatedEvent;
    } catch (error) {
      console.log(error);
      throw new Error(
        "Qualcosa è andato storto nell'aggiornamento dell'evento"
      );
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
          userId: event.userId,
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
      throw new Error("Qualcosa è andato storto nella creazione dell'evento");
    }
  }

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

  async getAdminEvents({
    filters,
    user,
  }: {
    filters: FilterTypes;
    user: User;
  }) {
    try {
      const filtersParsed = this.buildAdminEventWhere(filters, user);
      const events = await prisma.event.findMany({
        where: { ...filtersParsed },
        include: {
          category: true,
          location: true,
        },
        orderBy: { createdAt: "desc" },
      });

      return events;
    } catch (error) {
      throw new Error("Qualcosa è andato storto nell'estrazione degli eventi");
    }
  }

  async getUserEvents({ filters, user }: { filters: FilterTypes; user: User }) {
    try {
      const filtersParsed = this.buildUserEventWhere(filters, user);

      const events = await prisma.event.findMany({
        where: { ...filtersParsed },
        include: {
          category: true,
          location: true,
        },
        orderBy: { createdAt: "desc" },
      });

      return events;
    } catch (error) {
      throw new Error("Qualcosa è andato storto nell'estrazione degli eventi");
    }
  }
  async getPublicEvents(_filters: FilterTypes) {
    try {
      const {
        lat,
        lng,
        radius, // in km
        page = "1",
        limit = "10",
      } = _filters || {};

      const filters = this.buildPublicEventWhere(_filters);

      let events = await prisma.event.findMany({
        where: { ...filters },
        include: { location: true, category: true },
      });

      // Filtraggio per distanza se lat/lng/radius presenti
      if (lat && lng && radius) {
        const latNum = parseFloat(lat as string);
        const lngNum = parseFloat(lng as string);
        const radiusKm = parseFloat(radius as string);

        events = events.filter((event) => {
          if (!event.location) return false;
          const distance = getDistanceFromRad(
            latNum,
            lngNum,
            event.location.lat,
            event.location.lng
          );
          return distance <= radiusKm;
        });
      }

      //pagination
      const pageParsed = parseQueryNumber(page as string, 1);
      const limitParsed = parseQueryNumber(limit as string, 10);

      const { pageNumber, pageSize, start, end } = getPagination({
        page: pageParsed,
        limit: limitParsed,
      });

      const paginatedEvents = events.slice(start, end);

      return {
        total: events.length,
        page: pageNumber,
        limit: pageSize,
        events: paginatedEvents,
      };
    } catch (error) {
      throw new Error("Qualcosa è andato storto nell'estrazione degli eventi");
    }
  }

  getStatusFilter(status?: EventStatus, user?: User) {
    if (!status || status === "approved" || !user?.role) {
      return { status: "approved" as EventStatus };
    }
    console.log(user.role);
    if (user.role === "admin") {
      return { status }; // admin può vedere qualsiasi status
    }

    return { status: "approved" as EventStatus }; // fallback sicuro
  }

  /** utils */

  buildPublicEventWhere(_filters: FilterTypes): Prisma.EventWhereInput {
    const where = this.buildEventWhere(_filters);

    // Aggiungi il filtro per lo stato "APPROVED"
    where.status = EventStatus.approved;
    return where;
  }

  buildEventWhere(_filters: FilterTypes): Prisma.EventWhereInput {
    const where: Prisma.EventWhereInput = {};

    if (_filters.search) {
      where.title = { contains: _filters.search, mode: "insensitive" };
    }

    if (_filters.status) {
      where.status = _filters.status;
    }

    if (_filters.category) {
      where.id_category = _filters.category;
    }

    if (_filters.startDate) {
      where.startAt = {
        gte: parseISO(_filters.startDate as string),
      };
    }
    where.OR = [
      {
        endAt: {
          gte: new Date(),
        },
      },
      {
        endAt: null,
        startAt: {
          gte: new Date(),
        },
      },
    ];

    return where;
  }

  buildUserEventWhere(
    _filters: FilterTypes,
    user: User
  ): Prisma.EventWhereInput {
    const where = this.buildEventWhere(_filters);
    where.AND = [
      { ...where },
      {
        userId: user.id,
      },
    ];

    return where;
  }
  buildAdminEventWhere(
    _filters: FilterTypes,
    user: User
  ): Prisma.EventWhereInput {
    const where = this.buildEventWhere(_filters);
    where.AND = [{ ...where }];

    return where;
  }
}
