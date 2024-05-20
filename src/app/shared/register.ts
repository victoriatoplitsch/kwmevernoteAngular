import { Image } from "./image";
export { Image } from "./image";
import { User } from "./user";
export { User } from "./user";

export class Register {



  constructor(
    public id: string,
    public name: string,
    public user_id: number,
    public is_public: boolean,
    public created_at: Date,
    public updated_at: Date
  ) {}

}
