import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { profiles, jobs, bids, transactions } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profile = await db
      .select()
      .from(profiles)
      .where(eq(profiles.userId, session.user.id))
      .limit(1);

    if (profile.length === 0 || profile[0].role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get platform statistics
    const totalUsers = await db.select({ count: sql<number>`count(*)` }).from(profiles);
    const pendingUsers = await db.select({ count: sql<number>`count(*)` }).from(profiles).where(eq(profiles.accountStatus, "pending"));
    const totalJobs = await db.select({ count: sql<number>`count(*)` }).from(jobs);
    const activeJobs = await db.select({ count: sql<number>`count(*)` }).from(jobs).where(eq(jobs.status, "in_progress"));
    const totalBids = await db.select({ count: sql<number>`count(*)` }).from(bids);
    const totalRevenue = await db.select({ sum: sql<number>`sum(amount)` }).from(transactions).where(eq(transactions.status, "completed"));

    const stats = {
      totalUsers: Number(totalUsers[0].count),
      pendingUsers: Number(pendingUsers[0].count),
      totalJobs: Number(totalJobs[0].count),
      activeJobs: Number(activeJobs[0].count),
      totalBids: Number(totalBids[0].count),
      totalRevenue: Number(totalRevenue[0].sum || 0),
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Stats fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
