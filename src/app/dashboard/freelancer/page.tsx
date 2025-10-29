"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  LayoutDashboard, 
  Briefcase, 
  MessageSquare,
  Loader2,
  Search,
  DollarSign,
  Clock,
  TrendingUp,
  FileText,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const navItems = [
  { href: "/dashboard/freelancer", label: "Browse Jobs", icon: LayoutDashboard },
  { href: "/dashboard/freelancer/bids", label: "My Bids", icon: FileText },
  { href: "/dashboard/freelancer/jobs", label: "Active Jobs", icon: Briefcase },
  { href: "/dashboard/freelancer/messages", label: "Messages", icon: MessageSquare },
];

const categories = [
  "All Categories",
  "Web Development",
  "Mobile Apps",
  "Design",
  "Writing",
  "Marketing",
  "Data Entry"
];

export default function FreelancerDashboard() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
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

  useEffect(() => {
    filterJobs();
  }, [searchQuery, selectedCategory, jobs]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("bearer_token");
      
      const profileRes = await fetch("/api/profiles", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      
      if (profileRes.ok) {
        const profileData = await profileRes.json();
        setProfile(profileData);
        
        if (profileData.role !== "freelancer") {
          router.push(`/dashboard/${profileData.role}`);
          return;
        }

        const jobsRes = await fetch("/api/jobs/freelancer", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        
        if (jobsRes.ok) {
          const jobsData = await jobsRes.json();
          setJobs(jobsData);
          setFilteredJobs(jobsData);
        }
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const filterJobs = () => {
    let filtered = jobs;

    if (searchQuery) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter(job => job.category === selectedCategory);
    }

    setFilteredJobs(filtered);
  };

  if (isPending || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const isAccountPending = profile?.accountStatus === "pending";

  return (
    <DashboardLayout navItems={navItems} profile={profile}>
      <div className="space-y-6">
        {/* Account Status Alert */}
        {isAccountPending && (
          <Alert variant="default" className="border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20">
            <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
            <AlertTitle className="text-yellow-800 dark:text-yellow-200">Account Pending Approval</AlertTitle>
            <AlertDescription className="text-yellow-700 dark:text-yellow-300">
              Your account is awaiting admin approval. You can browse jobs but cannot place bids until your account is approved.
            </AlertDescription>
          </Alert>
        )}

        <div>
          <h1 className="text-3xl font-bold">Browse Jobs</h1>
          <p className="text-muted-foreground">Find your next opportunity</p>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No jobs found</h3>
                <p className="text-muted-foreground">Try adjusting your search filters</p>
              </CardContent>
            </Card>
          ) : (
            filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-xl">
                        <Link href={`/dashboard/freelancer/jobs/${job.id}`} className="hover:underline">
                          {job.title}
                        </Link>
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Posted by {job.clientName}</span>
                        <span>•</span>
                        <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Badge>{job.category}</Badge>
                  </div>
                  <CardDescription className="mt-2 line-clamp-2">
                    {job.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold">${job.budget.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Due: {new Date(job.deadline).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Link href={`/dashboard/freelancer/jobs/${job.id}`}>
                      <Button disabled={isAccountPending}>
                        {isAccountPending ? "Account Pending" : "View Details & Bid"}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}