import {Note} from "./note";
import {User} from "./user";
import {Tag} from "./tag";
import {Image} from "./image";

export class Todo {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public due_date: Date,
    public user_id: number,
    public note_id: number,
    public created_at: Date,
    public updated_at: Date,
    public tags?: Tag[],
    public images?: Image[]
  ) {}
}
