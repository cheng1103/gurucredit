import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const services = [
  {
    name: 'Eligibility Analysis Package',
    description:
      'Complete credit and loan eligibility analysis with personalized recommendations',
    price: 30.0,
    type: 'ELIGIBILITY_ANALYSIS',
    features: [
      'Credit report analysis',
      'DSR calculation',
      'Approval chances assessment',
      'Loan limit estimate',
      'Issue identification',
      'Bank/agency recommendation',
      'Full explanation & guidance',
    ],
  },
  {
    name: 'DSR Consultation',
    description: 'Debt Service Ratio calculation and optimization advice',
    price: 20.0,
    type: 'DSR_CONSULTATION',
    features: [
      'DSR calculation',
      'Debt optimization tips',
      'Income-to-debt analysis',
      'Improvement recommendations',
    ],
  },
  {
    name: 'Loan Application Assistance',
    description: 'Full assistance with loan application process',
    price: 50.0,
    type: 'LOAN_APPLICATION',
    features: [
      'Document preparation',
      'Application submission',
      'Bank liaison',
      'Status tracking',
      'Follow-up support',
    ],
  },
  {
    name: 'Credit Repair Consultation',
    description: 'Guidance on improving credit score and resolving issues',
    price: 40.0,
    type: 'CREDIT_REPAIR',
    features: [
      'Credit report review',
      'Issue identification',
      'Dispute assistance',
      'Score improvement plan',
      'Follow-up consultation',
    ],
  },
];

async function main() {
  let createdCount = 0;
  for (const service of services) {
    const existing = await prisma.service.findFirst({
      where: { type: service.type },
    });
    if (!existing) {
      await prisma.service.create({
        data: {
          ...service,
          features: JSON.stringify(service.features),
        },
      });
      createdCount += 1;
    }
  }

  await prisma.auditLog.create({
    data: {
      action: 'service.seeded',
      targetType: 'Service',
      targetId: null,
      actorId: null,
      actorName: 'seed-script',
      metadata: { createdCount },
    },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
