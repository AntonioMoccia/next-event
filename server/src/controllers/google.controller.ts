import { GoogleService } from "@services/google.service";
import { Request, Response } from "express";

export class GoogleController {
  private googleService: GoogleService;

  constructor() {
    this.googleService = new GoogleService();
  }

  async getSuggestions(req: Request, res: Response) {
    const q: string = req.query.q?.toString() || "";
    console.log();
    if (q == "") return res.send("");
    const suggestions = await this.googleService.getSuggestions(q);

    return res.json({
      suggestions: suggestions,
    });
  }
}
