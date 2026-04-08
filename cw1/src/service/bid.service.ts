import { prisma } from "../utils/prisma";
import { BidStatus } from "@prisma/client";
import { notifyWinner, notifyLoser } from "../utils";

export const bidService = {
  getRemainingSlots: async (userId: string) => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { eventAttendee: true },
    });

    if (!user) throw new Error("User not found");

    const limit = user.eventAttendee ? 4 : 3;

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const winCount = await prisma.bid.count({
      where: {
        userId,
        status: BidStatus.WIN,
        createdAt: { gte: startOfMonth },
      },
    });

    return Math.max(0, limit - winCount);
  },

  placeBid: async (userId: string, amount: number) => {
    const slots = await bidService.getRemainingSlots(userId);
    if (slots <= 0) {
      throw new Error("You have reached your monthly winning limit.");
    }

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const existingBid = await prisma.bid.findFirst({
      where: {
        userId,
        status: BidStatus.PENDING,
        createdAt: { gte: startOfDay },
      },
    });

    if (existingBid) {
      throw new Error(
        "You already have an active bid for today. Use update instead.",
      );
    }

    return prisma.bid.create({
      data: {
        userId,
        amount,
        status: BidStatus.PENDING,
      },
    });
  },

  updateBid: async (userId: string, amount: number) => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const existingBid = await prisma.bid.findFirst({
      where: {
        userId,
        status: BidStatus.PENDING,
        createdAt: { gte: startOfDay },
      },
    });

    if (!existingBid) {
      throw new Error("No active bid found for today. Place a bid first.");
    }

    if (amount <= existingBid.amount) {
      throw new Error(
        "Bid amount must be higher than the current bid (Increase only).",
      );
    }

    return prisma.bid.update({
      where: { id: existingBid.id },
      data: { amount },
    });
  },

  getBidStatus: async (userId: string) => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const userBid = await prisma.bid.findFirst({
      where: {
        userId,
        status: BidStatus.PENDING,
        createdAt: { gte: startOfDay },
      },
    });

    if (!userBid) {
      return { status: "No active bid", isWinning: false };
    }

    const highestBid = await prisma.bid.findFirst({
      where: {
        status: BidStatus.PENDING,
        createdAt: { gte: startOfDay },
      },
      orderBy: { amount: "desc" },
    });

    const isWinning = highestBid?.userId === userId;

    return {
      bidId: userBid.id,
      amount: userBid.amount,
      status: isWinning ? "Winning" : "Losing",
      isWinning,
    };
  },

  processDailyWinner: async () => {
    const startOfYesterday = new Date();
    startOfYesterday.setHours(startOfYesterday.getHours() - 24);

    console.log(`[SCHEDULER] Running daily winner selection...`);

    const winner = await prisma.bid.findFirst({
      where: { status: BidStatus.PENDING },
      orderBy: [{ amount: "desc" }, { createdAt: "asc" }],
      include: { user: { include: { profile: true } } },
    });

    if (!winner) {
      console.log("[SCHEDULER] No bids found for today.");
      return;
    }

    await prisma.bid.update({
      where: { id: winner.id },
      data: { status: BidStatus.WIN },
    });

    await prisma.bid.updateMany({
      where: {
        status: BidStatus.PENDING,
        id: { not: winner.id },
      },
      data: { status: BidStatus.LOSS },
    });

    await prisma.profile.updateMany({
      where: { isAlumniOfTheDay: true },
      data: { isAlumniOfTheDay: false },
    });

    if (winner.user.profile) {
      await prisma.profile.update({
        where: { id: winner.user.profile.id },
        data: { isAlumniOfTheDay: true },
      });
    }

    await notifyWinner(winner.user.email, winner.user.name || "Alumnus");

    const losers = await prisma.bid.findMany({
      where: { status: BidStatus.LOSS, createdAt: { gte: startOfYesterday } },
      include: { user: true },
    });

    for (const loser of losers) {
      await notifyLoser(loser.user.email, loser.user.name || "Alumnus");
    }

    console.log(`[SCHEDULER] Winner selected: ${winner.user.email}`);
  },
};
