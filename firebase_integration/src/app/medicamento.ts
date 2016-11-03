export class Medicamento {

  private _nombre: string;
  private _dosis: number;

  constructor(nombre: string, dosis: number) {
    this._nombre = nombre;
    this._dosis = dosis;
  }

  get nombre(): string {
    return this._nombre;
  }

  get dosis(): number {
    return this._dosis;
  }

  toString(): string {
    return this._nombre + " dosis " + this._dosis;
  }


}
