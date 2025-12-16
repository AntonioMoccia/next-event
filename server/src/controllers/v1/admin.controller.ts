import { EventService } from "@/services/event.service";

import { success } from "@/lib/send-success";
import { NextFunction, Request, Response } from "express";
import { FilterTypes, User } from "@/types";


export class AdminController {
  private eventService: EventService;

  constructor() {
    this.eventService = new EventService();
  }

  async getAdminEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const events = await this.eventService.getAdminEvents({
        filters: req.query as FilterTypes,
        user: req.user as User,
      });

      success(res, { events });
    } catch (error) {
      next(error);
    }
  }
}
