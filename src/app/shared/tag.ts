import {Note} from "./note";
import {User} from "./user";

export class Tag {

  constructor(
    public id: string,
    public name: string,
    public created_at: Date,
    public updated_at: Date
  ) {}
}
