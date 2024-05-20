export class ErrorMessages {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string ){}
}

export const RegisterFormErrorMessages =[
  new ErrorMessages('name','required','Ein Name muss angegeben werden'),
  new ErrorMessages('is_public','required','Es muss etwas ausgewählt sein'),
  new ErrorMessages('user_id','required','Es muss etwas ausgewählt sein')
  ]

