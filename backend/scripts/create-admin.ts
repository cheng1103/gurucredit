/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

async function main() {
  const email = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const password = (process.env.ADMIN_PASSWORD || '').trim();
  const name = process.env.ADMIN_NAME || 'GURU Credits Admin';
  const role = (process.env.ADMIN_ROLE || 'SUPER_ADMIN').toUpperCase();

  if (!email || !password) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD env vars are required.');
  }

  const prisma = new PrismaClient();
  try {
    const hash = await bcrypt.hash(password, 10);

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      await prisma.user.update({
        where: { email },
        data: {
          password: hash,
          name,
          role,
          isActive: true,
          failedLoginAttempts: 0,
          lockedUntil: null,
        },
      });
      console.log(`[create-admin] Updated existing user ${email} -> ${role}`);
    } else {
      const u = await prisma.user.create({
        data: {
          email,
          password: hash,
          name,
          role,
          isActive: true,
        },
      });
      console.log(`[create-admin] Created ${role} user id=${u.id} email=${email}`);
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error('[create-admin] failed:', err);
  process.exit(1);
});
