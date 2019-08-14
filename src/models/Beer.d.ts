import { Amount, Recipie, BeerTemp } from "../types";

export interface BeerMethodMashTemp {
  temp: Amount;
  duration: number;
}

export interface BeerMethod {
  fermentation: BeerTemp;
  twist: string;
  mashTemp: BeerMethodMashTemp[];
}

export interface Beer {
  findBeerById: Function;
  findBeersByName: Function;
  findBeers: Function;
  id: number;
  name: string;
  tagline: string;
  description: string;
  abv: number;
  ibu: number;
  ebc: number;
  volume: Amount;
  ingredients: Recipie;
  firstBrewed: string;
  imageUrl: string;
  boilVolume: Amount;
  foodPairing: string[];
  brewersTips: string;
  contributedBy: string;
  method: BeerMethod;
}
