import { createHmac, randomBytes } from "node:crypto";
import * as jwt from "jsonwebtoken";
import { prismaClient } from "lib/db";

const jwt_secret = process.env.JWT_SECRET!;

export interface CreateUserPayload {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface GetUserTokenPayload {
  email: string;
  password: string;
}

class UserService {
  private static generateHash(salt: string, password: string) {
    const hashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    return hashedPassword;
  }

  public static getUserById(id: number) {
    return prismaClient.user.findUnique({ where: { id } });
  }

  public static createUser(payload: CreateUserPayload) {
    const { firstName, lastName, email, password } = payload;
    const salt = randomBytes(32).toString("hex");

    const hashedPassword = UserService.generateHash(salt, password);

    return prismaClient.user.create({
      data: {
        firstName,
        lastName,
        email,
        salt,
        password: hashedPassword,
      },
    });
  }

  private static getUserEmail(email: string) {
    return prismaClient.user.findUnique({ where: { email } });
  }

  public static async getUserToken(payload: GetUserTokenPayload) {
    const { email, password } = payload;
    const user = await UserService.getUserEmail(email);

    if (!user) throw new Error("User Not Found");

    const userSalt = user.salt;
    const userHashedPassword = UserService.generateHash(userSalt, password);

    if (userHashedPassword !== user.password)
      throw new Error("Incorrect Password!");

    // Generate Token
    const token = jwt.sign({ id: user.id, email: user.email }, jwt_secret);
    return token;
  }
  public static decodeJWTTOKEN(token: string) {
    return jwt.verify(token, jwt_secret);
  }
}

export default UserService;
