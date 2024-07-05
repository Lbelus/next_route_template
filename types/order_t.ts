import { EXAMPLE_TYPE } from "./example_t";

export type ORDER = {
  id: string;
  status: string;
  date: number;
  orderPayload: EXAMPLE_TYPE[];
};
