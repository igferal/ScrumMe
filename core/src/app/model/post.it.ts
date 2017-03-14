export class PostIt {

  public contenido: string;
  public programador: string;
  public horas: number;
  public key: string;
  public workedHours: number;
  public closed: boolean;

  constructor(contenido: string, programador: string, horas: number, key?: string) {

    this.contenido = contenido;
    this.horas = horas;
    this.programador = programador;

    if (key !== undefined) {
      this.key = key;
    } else {
      this.key = '';
    } this.workedHours = 0;
    this.closed = false;
  }


  public toString(): string {

    return `De ${this.contenido}  se encargara ${this.programador}.`;

  }

}