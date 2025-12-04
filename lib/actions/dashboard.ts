'use server'

import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'

export async function getDashboardData() {
  const { userId } = await auth()
  if (!userId) {
    throw new Error("Unauthorized")
  }

  const totalCases = await prisma.case.count({
    where: { userId },
  })

  const totalEvidence = await prisma.evidence.count({
    where: { userId },
  })

  const recentCases = await prisma.case.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 3,
  })

  const recentEvidence = await prisma.evidence.findMany({
    where: { userId },
    orderBy: { uploadDate: 'desc' },
    take: 4,
    include: { case: true }, // Include case to display case title in overview
  })

  // For pending verification, we assume a 'status' field or similar would exist on Evidence
  // For now, let's just make a dummy calculation or assume 0.
  // This would need a more robust implementation if verification status is tracked in DB.
  const pendingVerification = 0 // Placeholder
  const verifiedEvidence = totalEvidence - pendingVerification

  return {
    stats: {
      totalCases,
      totalEvidence,
      pendingVerification,
      verifiedEvidence,
    },
    recentCases,
    recentEvidence,
  }
}
