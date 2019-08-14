import axios, { AxiosResponse } from "axios";

const thirdPartyAPIEndpoint = "https://api.punkapi.com/v2/beers";

export class Beer {
  async findBeerById(id: number) {
    try {
      const response: AxiosResponse = await axios.get(
        `${thirdPartyAPIEndpoint}/${id}`
      );
      const beer = response.data;

      return beer[0];
    } catch (error) {
      console.error(error);
    }
  }

  async findBeersByName(name: string) {
    try {
      const response: AxiosResponse = await axios.get(
        `${thirdPartyAPIEndpoint}/?beer_name=${name}`
      );
      const beers = response.data;

      return beers;
    } catch (error) {
      console.error(error);
    }
  }

  async findBeers() {
    try {
      const response: AxiosResponse = await axios.get(thirdPartyAPIEndpoint);
      const beers = response.data;

      return beers;
    } catch (error) {
      console.error(error);
    }
  }
}
