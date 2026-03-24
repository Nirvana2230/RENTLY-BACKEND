export class CreatePropertyDto {
  title: string;
  description: string;
  pricePerNight: number;
  location: string;
  ownerId: number;
  guests: number;
  wifi: boolean;
  parking: boolean;
  
  // 👇 AGREGA ESTA LÍNEA NUEVA
  propertyType: string;
}