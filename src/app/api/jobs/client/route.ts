import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { jobs, profiles, bids } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user profile
    const profile = await db
      .select()
      .from(profiles)
      .where(eq(profiles.userId, session.user.id))
      .limit(1);

    if (profile.length === 0 || profile[0].role !== "client") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get client's jobs with bid counts
    const clientJobs = await db
      .select({
        id: jobs.id,
        title: jobs.title,
        description: jobs.description,
        budget: jobs.budget,
        deadline: jobs.deadline,
        category: jobs.category,
        status: jobs.status,
        hiredFreelancerId: jobs.hiredFreelancerId,
        createdAt: jobs.createdAt,
        updatedAt: jobs.updatedAt,
        bidCount: sql<number>`(SELECT COUNT(*) FROM ${bids} WHERE ${bids.jobId} = ${jobs.id})`,
      })
      .from(jobs)
      .where(eq(jobs.clientId, profile[0].id));

    return NextResponse.json(clientJobs);
  } catch (error) {
    console.error("Jobs fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

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

    if (profile.length === 0 || profile[0].role !== "client") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { title, description, budget, deadline, category } = body;

    const newJob = await db
      .insert(jobs)
      .values({
        clientId: profile[0].id,
        title,
        description,
        budget,
        deadline,
        category,
        status: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .returning();

    return NextResponse.json(newJob[0], { status: 201 });
  } catch (error) {
    console.error("Job creation error:", error);
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
}
