import { Label } from "./label.model";
import { Image } from "./image.model";

export class Singer {
  idSinger!: number;
  name!: string;
  country!: string;
  birthDate!: Date;
  genre!: string;
  label!: Label;
  image! : Image
  imageStr!:string
}
