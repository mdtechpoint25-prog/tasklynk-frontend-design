import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { bids, profiles, jobs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
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

    if (profile.length === 0 || profile[0].role !== "freelancer") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { jobId, bidAmount, estimatedDuration, proposalMessage } = body;

    // Check if job exists and is open
    const job = await db
      .select()
      .from(jobs)
      .where(eq(jobs.id, jobId))
      .limit(1);

    if (job.length === 0) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    if (job[0].status !== "pending") {
      return NextResponse.json({ error: "Job is not open for bids" }, { status: 400 });
    }

    // Check if freelancer already bid on this job
    const existingBid = await db
      .select()
      .from(bids)
      .where(eq(bids.jobId, jobId))
      .where(eq(bids.freelancerId, profile[0].id))
      .limit(1);

    if (existingBid.length > 0) {
      return NextResponse.json({ error: "You have already bid on this job" }, { status: 400 });
    }

    const newBid = await db
      .insert(bids)
      .values({
        jobId,
        freelancerId: profile[0].id,
        bidAmount,
        estimatedDuration,
        proposalMessage,
        status: "pending",
        createdAt: new Date().toISOString(),
      })
      .returning();

    return NextResponse.json(newBid[0], { status: 201 });
  } catch (error) {
    console.error("Bid creation error:", error);
    return NextResponse.json(
      { error: "Failed to create bid" },
      { status: 500 }
    );
  }
}
