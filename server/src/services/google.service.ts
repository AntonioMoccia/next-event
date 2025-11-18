import { Client } from "@googlemaps/google-maps-services-js";

export class GoogleService {
  googleMapsClient: Client;
  constructor() {
    this.googleMapsClient = new Client({});
  }

  async getSuggestions(input: string, language: string = "it") {
    const suggestions = await this.googleMapsClient.placeAutocomplete({
      params: {
        input: input,
        key: process.env.GOOGLE_MAPS_API_KEY!,
        language,
      },
    });

    return suggestions.data.predictions;
  }

  async getCoords(place_id: string) {
    const response = await this.googleMapsClient.geocode({
      params: {
        place_id,
        key: process.env.GOOGLE_MAPS_API_KEY!,
      },
    });

    const coords = response.data.results[0].geometry.location;

    return {
      lat: coords.lat,
      lng: coords.lng,
    };
  }
}

/**
 * 
const googleMapsClient = new Client({});

export const getSuggestions = async (input: string) => {
  const suggestions = await googleMapsClient.placeAutocomplete({
    params: {
      input: input,
      key: process.env.GOOGLE_MAPS_API_KEY!,
      language:'it'
    },
  });
  return suggestions.data.predictions
};

 */
