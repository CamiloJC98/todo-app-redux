

export class Todo {
   public id: number;
   public text: string;
   public completado: boolean;

   constructor(text: string ) {
    this.text = text;
    this.id = Math.random();
    this.completado = false;
   }
}
