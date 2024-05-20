export class ErrorMessages {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string ){}
}

export const TagFormErrorMessages =[
  new ErrorMessages('name','required','Ein Name muss angegeben werden')
]

