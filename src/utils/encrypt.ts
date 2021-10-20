import bcrypt from 'bcryptjs';

export function encryptPassword(password: string) {
  const hash = bcrypt.hashSync(password, 8);
  return hash;
}

export async function comparePasswords(password: string, hash: string) {
  const match = await bcrypt.compare(password, hash);
  return match;
}
