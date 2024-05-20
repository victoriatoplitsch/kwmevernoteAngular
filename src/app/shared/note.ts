import {Image, Register} from "./register";
import {Tag} from "./tag";

export class Note {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public register_id: number,
    public created_at: Date,
    public updated_at: Date,
    public tags?: Tag[],
    public images?: Image[]
  ) {}
}
