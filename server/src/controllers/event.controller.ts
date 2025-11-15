import S3 from "@services/S3.service";
import { Request, Response } from "express";

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
}
