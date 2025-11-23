import S3 from "@services/S3.service";
import { NextFunction, Request, Response } from "express";
import { EventService } from "@services/Event.service";
import { Event } from "../types";
import { success } from "@/lib/send-success";

export class EventController {
  constructor() {}

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
      console.log(error);
    }
  }
  async removeImageFromCloud(req: Request, res: Response, next: NextFunction) {
    const { key }: { key: string } = req.body;

    try {
      const result = await S3.getInstance().remove(key);

      console.log(result);
      success(res, { result });
    } catch (error) {}
  }

  async getEvents(req: Request, res: Response, next: NextFunction) {
    const eventClass = new EventService();

    try {
      const events = await eventClass.getEvents()

      success(res,{events})

    } catch (error) {
      next(error);
    }
  }

  async getEventById(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id
    console.log(id)
    const eventClass = new EventService();
    try {
      const event = await eventClass.getEventById(id)

      success(res,{event})

    } catch (error) {
      next(error);
    }
  }

  async createEvent(req: Request, res: Response, next: NextFunction) {
    const event: Event = req.body;

    const newEventClass = new EventService(event);

    try {
      const newEvent = await newEventClass.createEvent();
      success(res, {
        event: newEvent,
      });
    } catch (error) {
      next(error);
    }
  }
}
