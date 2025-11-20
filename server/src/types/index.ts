export type Event = {
  title: string;
  id_category: string;
  description: string;
  startAt: Date;
  endAt: Date;
  image?: string;
  id_event_type: string;
  price: number;
  age: string;
  email?: string;
  phone?: string;
  website: string;
  address_name: string;
  lat: number;
  lng: number;
  place_id: string;
};
export type Category = {
  description:string
}