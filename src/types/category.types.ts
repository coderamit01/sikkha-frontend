import { Subject } from "./subject.types";

export interface ICategory {
  name: string
}
export interface Category {
  id: string;
  name: string;
  slug: string;
  iconUrl: string;
  subject: Subject[];
}
