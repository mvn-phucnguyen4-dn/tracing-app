import { Expose } from "class-transformer";
import { typeContactArray } from "../entities";

export class PeopleTracingDTO {
    @Expose()
    id: string;

  @Expose()
  statusUpdateDate: Date;

  @Expose()
  contactType: typeContactArray;

  @Expose()
  personIdFirst: string;

  @Expose()
  personIdSecond: string;

}