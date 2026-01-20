import {
  CarStatus,
  CarType,
  FuelType,
  Transmission,
} from "@/generated/prisma/enums";

export interface UpdatePostDto {
  brand?: string;
  year?: number;
  mileage?: number;
  description?: string;
  location?: Location;
  carType?: CarType;
  cylinder?: number;
  price?: number;
  fuel?: FuelType;
  status?: CarStatus;
  transmission?: Transmission;
}

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
}

export interface UpdateProfileDto {
  email?: string;
  username?: string;
  password?: string;
  img?: string;
  phoneNumber: string;
}
