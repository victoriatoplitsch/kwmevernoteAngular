export class ErrorMessages {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string ){}
}

export const TodoFormErrorMessages =[
  new ErrorMessages('title','required','Ein Titel muss angegeben werden'),
  new ErrorMessages('due_date','required','Ein Fälligkeitsdatum muss angegeben werden'),
  new ErrorMessages('user_id','required','Ein User muss angegeben werden')
]

