import Photon from "@generated/photon";
import { ContextParameters } from "graphql-yoga/dist/types";

export interface Context extends ContextParameters {
  photon: Photon;
}
