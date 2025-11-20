import S3 from "@services/S3.service";
import { Request, Response } from "express";
import {EventService} from '@services/Event.service'
import { Event } from "../types";

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

  async createEvent(req:Request, res:Response){
    const event : Event = req.body
    const newEventClass = new EventService(event)

    
    try {
      const newEvent = await newEventClass.createEvent()
      res.json({
        newEvent
      })
    } catch (error) {
      res.json(error)
    }

  }
}
