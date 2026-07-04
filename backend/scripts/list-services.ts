/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';

async function main() {
  const p = new PrismaClient();
  try {
    const svcs = await p.service.findMany({
      select: { id: true, type: true, name: true, price: true, isActive: true },
      orderBy: { createdAt: 'asc' },
    });
    console.log('services:', svcs.length);
    for (const s of svcs) {
      console.log(`  ${s.id} | ${s.type} | ${s.name} | RM${s.price} | active=${s.isActive}`);
    }
  } finally {
    await p.$disconnect();
  }
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
