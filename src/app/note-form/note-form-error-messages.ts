export class ErrorMessages {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string ){}
}

export const NoteFormErrorMessages =[
  new ErrorMessages('title','required','Ein Titel muss angegeben werden')
]

