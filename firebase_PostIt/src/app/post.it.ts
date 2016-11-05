export class PostIt {

  private _contenido: string;
  private _programador: string;
  private _horas : number;

  constructor(contenido : string,programador: string, horas : number){

    this._contenido=contenido;
    this._horas=horas;
    this._programador=programador;

  }
  
 get programador(): string{
  
   return this._programador

 }

 get horas(): number{

   return this._horas;

 }

get contenido():string{

  return this._contenido;
}


public toString() :string{

  return `De ${this.contenido}  se encargara ${this.programador}.`;

}

}