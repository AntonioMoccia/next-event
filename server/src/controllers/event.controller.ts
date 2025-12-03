import S3 from "@services/S3.service";
import { NextFunction, Request, Response } from "express";
import { EventService } from "@/services/event.service";
import { Event } from "../types";
import { success } from "@/lib/send-success";
import { prisma } from "@lib/prisma-client";
import { parseISO } from "date-fns";
import { getDistanceFromRad } from "@lib/get-distance-from-rad";

import { EventStatus } from "@lib/generated/prisma";
import { getPagination } from "@lib/pagination";
import parseQueryNumber from "@lib/parse-query-number";
export class EventController {
  private eventClass: EventService;
  constructor() {
    this.eventClass = new EventService();
  }

  async uploadImageGetSignedUrl(req: Request, res: Response) {
    const { size, contentType, filename } = req.body;

    try {
      const response = await S3.getInstance().getSignedUrl({
        size,
        contentType,
        filename,
      });

      return res.json(response);
    } catch (error) {
      //      console.log(error);
    }
  }
  async removeImageFromCloud(req: Request, res: Response, next: NextFunction) {
    const { key }: { key: string } = req.body;

    try {
      const result = await S3.getInstance().remove(key);

      success(res, { result });
    } catch (error) {}
  }

  async getEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const events = await this.eventClass.getEvents();

      success(res, { events });
    } catch (error) {
      next(error);
    }
  }
  async getEventSearch(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        category,
        startDate,
        lat,
        lng,
        radius, // in km
        page = "1",
        limit = "10",
      } = req.query;

      //creazione filtri 
      const filters: any = {};

      if (category) {
        filters.id_category = category;
      }

      if (startDate) {
        filters.startAt = {
          gte: parseISO(startDate as string),
        };
      }

      // Primo filtro semplice con Prisma
      let events = await prisma.event.findMany({
        where: { ...filters, status: 'APPROVED' },
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

      res.json({
        total: events.length,
        page: pageNumber,
        limit: pageSize,
        events: paginatedEvents,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    }
  }

  async getEventById(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    try {
      const event = await this.eventClass.getEventById(id);

      success(res, { event });
    } catch (error) {
      next(error);
    }
  }
  async getEventsByStatus(req: Request, res: Response, next: NextFunction) {
    const statusParam = req.params.status as string;

    // Controllo che il valore sia un enum valido
    if (!Object.values(EventStatus).includes(statusParam as EventStatus)) {
      return  success(res, { events: [] },"Invalid status value",400);
    }
    try {
      const events = await this.eventClass.getEventsByStatus(statusParam as EventStatus);

      success(res, { events });
    } catch (error) {
      next(error);
    }
  }
  async createEvent(req: Request, res: Response, next: NextFunction) {
    const event: Event = req.body;
    //usare i dto per verificare il body
    try {
      const newEvent = await this.eventClass.createEvent(event);
      success(res, {
        event: newEvent,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateStatusEvent(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const { status } = req.body;
    try {
      const updatedEvent = await this.eventClass.changeEventStatus(
        id,
        status
      );
      success(res, {
        event: updatedEvent,
      });
    } catch (error) {
      next(error);
    }
  }

}
