import Photon from "@generated/photon";
import { ContextParameters } from "graphql-yoga/dist/types";

import { Beer } from "./models/Beer";

export interface Context extends ContextParameters {
  photon: Photon;
  beer: Beer;
}
