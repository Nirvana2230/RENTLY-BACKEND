import { IsString, IsNotEmpty, IsNumber, IsOptional, Min, IsBoolean, IsUrl, IsArray, IsMongoId } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty({ message: 'El título es obligatorio' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  description: string;

  @IsNumber()
  @Min(1000, { message: 'El precio mínimo por noche es $1.000' })
  pricePerNight: number;

  @IsString()
  @IsNotEmpty({ message: 'La ubicación es obligatoria' })
  location: string;

  @IsNumber()
  @IsNotEmpty({ message: 'El ownerId es obligatorio' })
  ownerId: number;

  @IsNumber()
  @Min(1, { message: 'Debe permitir al menos 1 huésped' })
  guests: number;

  @IsBoolean()
  wifi: boolean;

  @IsBoolean()
  parking: boolean;

  @IsString()
  @IsNotEmpty({ message: 'El tipo de propiedad es obligatorio' })
  propertyType: string;          // ← el campo que querías agregar

  @IsOptional()
  @IsUrl({}, { message: 'La URL de la imagen debe ser válida' })
  imageUrl?: string;

  @IsOptional()
  @IsUrl({}, { message: 'La URL de la imagen 2 debe ser válida' })
  imageUrl2?: string;

  @IsOptional()
  @IsUrl({}, { message: 'La URL de la imagen 3 debe ser válida' })
  imageUrl3?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  amenities?: string[];
}

