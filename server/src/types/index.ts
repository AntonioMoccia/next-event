import { EventStatus } from "@lib/generated/prisma";

export type Event = {
  title: string;
  id_category: string;
  description: string;
  startAt?: Date;
  endAt?: Date;
  image?: string;
  price: number;
  age?: string;
  email?: string;
  phone?: string;
  website: string;
  organizer: string;
  location: Location;
  capacity?: number;
};

export type Location = {
  address_name: string;
  lat: number;
  lng: number;
  place_id?: string;
};
export type Category = {
  description: string;
};
export type EventType = {
  description: string;
};

export type FilterTypes={
    category?: string;
    startDate?: string;
    lat?: string;
    lng?: string;
    radius?: string; // in km
    page?: number;
    limit?: number;
    status?: EventStatus
  }