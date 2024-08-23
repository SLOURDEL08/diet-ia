import { compare, hash } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';

export async function hashPassword(password: string): Promise<string> {
  return await hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await compare(password, hashedPassword);
}

export function createToken(payload: any): string {
  return sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });
}

export function verifyToken(token: string): any {
  return verify(token, process.env.JWT_SECRET!);
}