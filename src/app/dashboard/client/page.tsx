"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  LayoutDashboard, 
  Briefcase, 
  MessageSquare, 
  Plus,
  Loader2,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const navItems = [
  { href: "/dashboard/client", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/client/jobs", label: "My Jobs", icon: Briefcase },
  { href: "/dashboard/client/messages", label: "Messages", icon: MessageSquare },
];

export default function ClientDashboard() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [stats, setStats] = useState({
    active: 0,
    completed: 0,
    pending: 0,
    totalSpent: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
      return;
    }

    if (session?.user) {
      fetchData();
    }
  }, [session, isPending, router]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("bearer_token");
      
      // Fetch profile
      const profileRes = await fetch("/api/profiles", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      
      if (profileRes.ok) {
        const profileData = await profileRes.json();
        setProfile(profileData);
        
        // Redirect if not client
        if (profileData.role !== "client") {
          router.push(`/dashboard/${profileData.role}`);
          return;
        }

        // Fetch jobs
        const jobsRes = await fetch("/api/jobs/client", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        
        if (jobsRes.ok) {
          const jobsData = await jobsRes.json();
          setJobs(jobsData);
          
          // Calculate stats
          const active = jobsData.filter((j: any) => j.status === "in_progress").length;
          const completed = jobsData.filter((j: any) => j.status === "completed").length;
          const pending = jobsData.filter((j: any) => j.status === "pending").length;
          const totalSpent = jobsData
            .filter((j: any) => j.status === "completed")
            .reduce((sum: number, j: any) => sum + j.budget, 0);
          
          setStats({ active, completed, pending, totalSpent });
        }
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  if (isPending || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500";
      case "in_progress": return "bg-blue-500";
      case "pending": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  const isPending = profile?.accountStatus === "pending";

  return (
    <DashboardLayout navItems={navItems} profile={profile}>
      <div className="space-y-6">
        {/* Account Status Alert */}
        {isPending && (
          <Alert variant="default" className="border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20">
            <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
            <AlertTitle className="text-yellow-800 dark:text-yellow-200">Account Pending Approval</AlertTitle>
            <AlertDescription className="text-yellow-700 dark:text-yellow-300">
              Your account is awaiting admin approval. You can view the dashboard but cannot post jobs until your account is approved.
            </AlertDescription>
          </Alert>
        )}

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {profile?.fullName}!</p>
          </div>
          <Link href="/dashboard/client/jobs/create">
            <Button disabled={isPending}>
              <Plus className="mr-2 h-4 w-4" />
              Post New Job
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.active}</div>
              <p className="text-xs text-muted-foreground">In progress</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pending}</div>
              <p className="text-xs text-muted-foreground">Awaiting bids</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completed}</div>
              <p className="text-xs text-muted-foreground">Successfully finished</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalSpent.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Jobs */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Jobs</CardTitle>
            <CardDescription>Your latest job postings and their status</CardDescription>
          </CardHeader>
          <CardContent>
            {jobs.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No jobs yet</h3>
                <p className="text-muted-foreground mb-4">
                  {isPending 
                    ? "Your account is pending approval. Once approved, you can post jobs."
                    : "Post your first job to get started"}
                </p>
                <Link href="/dashboard/client/jobs/create">
                  <Button disabled={isPending}>
                    <Plus className="mr-2 h-4 w-4" />
                    Post a Job
                  </Button>
                </Link>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Bids</TableHead>
                    <TableHead>Deadline</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.slice(0, 5).map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">
                        <Link href={`/dashboard/client/jobs/${job.id}`} className="hover:underline">
                          {job.title}
                        </Link>
                      </TableCell>
                      <TableCell>{job.category}</TableCell>
                      <TableCell>${job.budget.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="capitalize">
                          <span className={`inline-block w-2 h-2 rounded-full mr-2 ${getStatusColor(job.status)}`} />
                          {job.status.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>{job.bidCount || 0}</TableCell>
                      <TableCell>{new Date(job.deadline).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}