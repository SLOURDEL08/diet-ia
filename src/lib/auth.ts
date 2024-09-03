import { compare, hash } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';

export async function hashPassword(password: string): Promise<string> {
  return await hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await compare(password, hashedPassword);
}

export function createToken(payload: any): string {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  return sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): any {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  return verify(token, process.env.JWT_SECRET);
}