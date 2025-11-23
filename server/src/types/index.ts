export type Event = {
  title: string;
  id_category: string;
  description: string;
  startAt?: Date;
  endAt?: Date;
  image?: string;
  price: number;
  age: string;
  email?: string;
  phone?: string;
  website: string;
  address_name: string;
  lat: number;
  lng: number;
  place_id: string;
  place_name:string;
  organizer:string
};
export type Category = {
  description:string
}
export type EventType = {
  description: string
}