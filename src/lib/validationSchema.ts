import { z } from "zod";

export const createPostSchema = z.object({
  brand: z.string().min(2).max(50),

  year: z.coerce.number().int().min(1886).max(new Date().getFullYear()),

  mileage: z.coerce.number().int().min(0),

  desctiption: z.string().min(10).max(1000).optional(),

  location: z.enum([
    "ERBIL",
    "DUHOK",
    "SULAYMANIAH",
    "KIRKUK",
    "MOSUL",
    "BAGHDAD",
    "BASRA",
    "NAJAF",
    "ANBAR",
    "SALAHALDIN",
    "OTHER",
  ]),

  carType: z.enum(["SEDAN", "SUV", "HATCHBACK", "COUPE", "PICKUP", "VAN"]),

  cylinder: z.coerce.number().int().min(1).max(16),

  price: z.coerce.number().positive(),

  fuel: z.enum(["PETROL", "DIESEL", "ELECTRIC", "HYBRID"]),

  status: z.enum(["AVAILABLE", "SOLD"]),

  transmission: z.enum(["MANUAL", "AUTOMATIC"]),
});

export const updatePostSchema = z.object({
  brand: z.string().min(2).max(50).optional(),

  year: z.coerce.number().int().positive().optional(),

  mileage: z.coerce.number().int().min(0).optional(),

  description: z.string().min(10).optional(),

  location: z.string().min(2).optional(),

  carType: z.enum(["SEDAN", "SUV", "TRUCK", "HATCHBACK"]).optional(),

  cylinder: z.coerce.number().int().positive().optional(),

  price: z.coerce.number().positive().optional(),

  fuel: z.enum(["GAS", "DIESEL", "ELECTRIC", "HYBRID"]).optional(),

  status: z.enum(["AVAILABLE", "SOLD"]).optional(),

  transmission: z.enum(["MANUAL", "AUTOMATIC"]).optional(),
});
export const createUserSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().min(4).max(30).email(),
  password: z
    .string()
    .min(8, "Password should at least contain 8 charachters")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[0-9]/, "Must contain a number")
    .optional(),
});

export const updateProfileSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username is too long")
    .optional(),

  email: z.string().email("Invalid email").max(100).optional(),

  password: z
    .string()
    .min(8, "Password should be at least 8 charachters")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[0-9]/, "Must contain a number")
    .optional(),

  img: z.string().url().optional().nullable(),
});

export const loginUserSchema = z.object({
  email: z.string().min(4).max(30).email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
