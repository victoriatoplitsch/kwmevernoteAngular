import {Register} from "./register";
import {Note} from "./note";

export class NoteFactory {
  static empty():Note {
    return new Note('0', '','', 0,new Date(), new Date(), [],[{id:0, url:'', caption:''}]);
  }

  static fromObject(rawNote: any):Note{
    return  new Note(
      rawNote.id, rawNote.title, rawNote.description, rawNote.register_id,
      typeof(rawNote.created_at) === 'string' ? new Date(rawNote.created_at) : rawNote.created_at,
      typeof(rawNote.updated_at) === 'string' ? new Date(rawNote.updated_at) : rawNote.updated_at, rawNote.tags, rawNote.images
    );
  }
}
