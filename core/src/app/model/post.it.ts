export class PostIt {

  private _contenido: string;
  private _programador: string;
  private _horas: number;
  private _key: string;
  private _workedHours: number;

  constructor(contenido: string, programador: string, horas: number, key?: string) {

    this._contenido = contenido;
    this._horas = horas;
    this._programador = programador;
    this.setKey(key);
    this._workedHours =0;
  }



  set progamador(newProgrammer: string) {
    this._programador = newProgrammer;
  }

  get programador(): string {

    return this._programador;

  }

  get key() {

    return this._key;
  }

  get horas(): number {

    return this._horas;

  }

  get contenido(): string {

    return this._contenido;
  }

  set workedHours(hours: number) {

    this._workedHours = hours;

  }

  get workedHours() {
    return this._workedHours;
  }

  public addHours(newHours: number) {

    this.workedHours += newHours;

  }

  private setKey(key: string) {

    if (key !== undefined) {
      this._key = key;
    } else {
      this._key = '';
    }

  }



  public toString(): string {

    return `De ${this.contenido}  se encargara ${this.programador}.`;

  }

}