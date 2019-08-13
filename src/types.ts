import Photon from "@generated/photon";
import { ContextParameters } from "graphql-yoga/dist/types";

import { Beer } from "./models/Beer";

export interface Context extends ContextParameters {
  photon: Photon;
  beer: Beer;
}

export interface Amount {
  value: number;
  unit: string;
}

export interface BeerTemp {
  temp: Amount;
}

export interface BeerMashTemp extends BeerTemp {
  duration: number;
}

export interface BeerMethod {
  fermentation: BeerTemp;
  twist: string;
  mash_temp: BeerMashTemp[];
}

export interface Ingredient {
  name: string;
  amount: Amount;
}

export interface HopsIngredient extends Ingredient {
  add: string;
  attribute: string;
}

export interface Recipie {
  malt: Ingredient[];
  hops: HopsIngredient[];
  yeast: string;
}

export interface BeerResponse {
  id: number;
  name: string;
  tagline: string;
  description: string;
  abv: number;
  ibu: number;
  ebc: number;
  volume: Amount;
  ingredients: Recipie;
  first_brewed: string;
  image_url: string;
  boil_volume: Amount;
  food_pairing: string[];
  brewers_tips: string;
  contributed_by: string;
  method: BeerMethod;
}
