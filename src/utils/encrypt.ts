import bcrypt from 'bcryptjs';

export async function encryptPassword(password: string) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

export async function comparePasswords(password: string, hash: string) {
  const match = await bcrypt.compare(password, hash);
  return match;
}
