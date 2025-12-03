import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
});

export const GetUsersResponseSchema = z.object({
  users: z.array(UserSchema),
});

export const GetUserResponseSchema = z.object({
  user: UserSchema,
});

export const CreateUserRequestSchema = z.object({
  email: z.email(),
  firstName: z.string(),
  lastName: z.string(),
});

export const CreateUserResponseSchema = z.object({ user: UserSchema });
