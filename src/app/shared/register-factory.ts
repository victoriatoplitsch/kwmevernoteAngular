import {Register, User} from "./register";

export class RegisterFactory {
  static empty():Register {
    return new Register('0', '',0,true, new Date(), new Date());
  }

  static fromObject(rawRegister: any):Register {
    return  new Register(
      rawRegister.id, rawRegister.name, rawRegister.user_id,
      rawRegister.is_public, typeof(rawRegister.created_at) === 'string' ? new Date(rawRegister.created_at) : rawRegister.created_at,
      typeof(rawRegister.updated_at) === 'string' ? new Date(rawRegister.updated_at) : rawRegister.updated_at
    );

  }
}

