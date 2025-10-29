import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { jobs, profiles, bids } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const jobId = parseInt(params.id);

    const job = await db
      .select({
        id: jobs.id,
        clientId: jobs.clientId,
        title: jobs.title,
        description: jobs.description,
        budget: jobs.budget,
        deadline: jobs.deadline,
        category: jobs.category,
        status: jobs.status,
        hiredFreelancerId: jobs.hiredFreelancerId,
        createdAt: jobs.createdAt,
        updatedAt: jobs.updatedAt,
        clientName: profiles.fullName,
        clientEmail: profiles.email,
      })
      .from(jobs)
      .leftJoin(profiles, eq(jobs.clientId, profiles.id))
      .where(eq(jobs.id, jobId))
      .limit(1);

    if (job.length === 0) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // Get bids for this job
    const jobBids = await db
      .select({
        id: bids.id,
        bidAmount: bids.bidAmount,
        estimatedDuration: bids.estimatedDuration,
        proposalMessage: bids.proposalMessage,
        status: bids.status,
        createdAt: bids.createdAt,
        freelancerName: profiles.fullName,
        freelancerId: profiles.id,
        freelancerEmail: profiles.email,
        freelancerProfilePicture: profiles.profilePicture,
      })
      .from(bids)
      .leftJoin(profiles, eq(bids.freelancerId, profiles.id))
      .where(eq(bids.jobId, jobId));

    return NextResponse.json({ ...job[0], bids: jobBids });
  } catch (error) {
    console.error("Job fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch job" },
      { status: 500 }
    );
  }
}
