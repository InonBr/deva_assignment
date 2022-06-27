import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class FavoritesDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
