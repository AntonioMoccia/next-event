import S3 from "@services/S3.service";
import { Request, Response } from "express";

export type Event={
    title:string,
    category:string,
    description: string,
    date_start: string,
    time_start: string,
    date_end: string,
    time_end: string,
    image?: string,
    event_type: string,
    price: string,
    age: string,
    email?: string,
    phone?: string,
    website: string,
    address_name: string,   
    lat: number,
    lng: number
    place_id: string
}

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

    
  }
}
