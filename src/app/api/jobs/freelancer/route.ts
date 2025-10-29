import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { jobs, profiles } from "@/db/schema";
import { eq, ne } from "drizzle-orm";
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

    if (profile.length === 0 || profile[0].role !== "freelancer") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get all open jobs (pending status)
    const openJobs = await db
      .select({
        id: jobs.id,
        clientId: jobs.clientId,
        title: jobs.title,
        description: jobs.description,
        budget: jobs.budget,
        deadline: jobs.deadline,
        category: jobs.category,
        status: jobs.status,
        createdAt: jobs.createdAt,
        clientName: profiles.fullName,
      })
      .from(jobs)
      .leftJoin(profiles, eq(jobs.clientId, profiles.id))
      .where(eq(jobs.status, "pending"));

    return NextResponse.json(openJobs);
  } catch (error) {
    console.error("Jobs fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
