import axios, { AxiosResponse } from "axios";

import { BeerResponse } from "../types";
import { Beer as BeerInterface } from "./Beer";

const thirdPartyAPIEndpoint = "https://api.punkapi.com/v2/beers";

export class Beer {
  constructor(props?: BeerResponse) {
    if (props) {
      const {
        first_brewed,
        image_url,
        boil_volume,
        food_pairing,
        brewers_tips,
        contributed_by,
        method: { mash_temp },
        ...rest
      } = props;
      const camelCaseKeys = {
        ...rest,
        firstBrewed: first_brewed,
        imageUrl: image_url,
        boilVolume: boil_volume,
        foodPairing: food_pairing,
        brewersTips: brewers_tips,
        contributedBy: contributed_by,
        method: {
          ...props.method,
          mashTemp: mash_temp
        }
      };

      Object.assign(this, camelCaseKeys);
    }
  }

  static async findBeerById(id: number): Promise<BeerInterface> {
    try {
      const response: AxiosResponse = await axios.get(
        `${thirdPartyAPIEndpoint}/${id}`
      );
      const beer: Array<BeerResponse> = response.data;

      return new Beer(beer[0]);
    } catch (error) {
      console.error(error);
    }
  }

  static async findBeersByName(name: string): Promise<BeerInterface[]> {
    try {
      const response: AxiosResponse = await axios.get(
        `${thirdPartyAPIEndpoint}/?beer_name=${name}`
      );
      const beers: Array<BeerResponse> = response.data;

      return beers.map(beer => new Beer(beer));
    } catch (error) {
      console.error(error);
    }
  }

  static async findBeers(): Promise<BeerInterface[]> {
    try {
      const response: AxiosResponse = await axios.get(thirdPartyAPIEndpoint);
      const beers: Array<BeerResponse> = response.data;

      return beers.map(beer => new Beer(beer));
    } catch (error) {
      console.error(error);
    }
  }
}
