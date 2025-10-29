"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  LayoutDashboard, 
  Briefcase, 
  MessageSquare,
  Loader2,
  DollarSign,
  Clock,
  User,
  Calendar,
  FileText,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const navItems = [
  { href: "/dashboard/freelancer", label: "Browse Jobs", icon: LayoutDashboard },
  { href: "/dashboard/freelancer/bids", label: "My Bids", icon: FileText },
  { href: "/dashboard/freelancer/jobs", label: "Active Jobs", icon: Briefcase },
  { href: "/dashboard/freelancer/messages", label: "Messages", icon: MessageSquare },
];

export default function JobDetailPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const params = useParams();
  const jobId = params.id as string;
  
  const [profile, setProfile] = useState<any>(null);
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [bidData, setBidData] = useState({
    bidAmount: "",
    estimatedDuration: "",
    proposalMessage: ""
  });

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
      
      const profileRes = await fetch("/api/profiles", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      
      if (profileRes.ok) {
        const profileData = await profileRes.json();
        setProfile(profileData);

        const jobRes = await fetch(`/api/jobs/${jobId}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        
        if (jobRes.ok) {
          const jobData = await jobRes.json();
          setJob(jobData);
        }
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      toast.error("Failed to load job details");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitBid = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/bids", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          jobId: parseInt(jobId),
          bidAmount: parseFloat(bidData.bidAmount),
          estimatedDuration: bidData.estimatedDuration,
          proposalMessage: bidData.proposalMessage
        })
      });

      if (response.ok) {
        toast.success("Bid submitted successfully!");
        setDialogOpen(false);
        fetchData(); // Refresh job data
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to submit bid");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  if (isPending || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!job) {
    return (
      <DashboardLayout navItems={navItems} profile={profile}>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Job not found</h2>
          <Link href="/dashboard/freelancer">
            <Button>Back to Jobs</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout navItems={navItems} profile={profile}>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/freelancer">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{job.title}</h1>
            <p className="text-muted-foreground">Job Details</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Job Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>Posted by {job.clientName}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <Badge>{job.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground whitespace-pre-wrap">{job.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 border rounded-lg">
                    <DollarSign className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Budget</p>
                      <p className="text-2xl font-bold">${job.budget.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 border rounded-lg">
                    <Clock className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Deadline</p>
                      <p className="text-xl font-semibold">
                        {new Date(job.deadline).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Existing Bids */}
            {job.bids && job.bids.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Other Bids ({job.bids.length})</CardTitle>
                  <CardDescription>See what other freelancers are bidding</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {job.bids.map((bid: any) => (
                      <div key={bid.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <img
                              src={bid.freelancerProfilePicture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${bid.freelancerName}`}
                              alt={bid.freelancerName}
                              className="h-10 w-10 rounded-full"
                            />
                            <div>
                              <p className="font-medium">{bid.freelancerName}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(bid.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold">${bid.bidAmount.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground">{bid.estimatedDuration}</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{bid.proposalMessage}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Submit Your Bid</CardTitle>
                <CardDescription>Make a competitive offer</CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full" size="lg">Submit Bid</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Submit Your Bid</DialogTitle>
                      <DialogDescription>
                        Provide your proposed budget and timeline
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmitBid} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="bidAmount">Your Bid Amount ($)</Label>
                        <Input
                          id="bidAmount"
                          type="number"
                          placeholder="e.g., 2500"
                          value={bidData.bidAmount}
                          onChange={(e) => setBidData({ ...bidData, bidAmount: e.target.value })}
                          required
                          min="1"
                          step="0.01"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="duration">Estimated Duration</Label>
                        <Input
                          id="duration"
                          placeholder="e.g., 2 weeks"
                          value={bidData.estimatedDuration}
                          onChange={(e) => setBidData({ ...bidData, estimatedDuration: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="proposal">Your Proposal</Label>
                        <Textarea
                          id="proposal"
                          placeholder="Explain why you're the best fit for this job..."
                          value={bidData.proposalMessage}
                          onChange={(e) => setBidData({ ...bidData, proposalMessage: e.target.value })}
                          required
                          rows={4}
                        />
                      </div>

                      <Button type="submit" className="w-full" disabled={submitting}>
                        {submitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Submit Bid"
                        )}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Client Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">{job.clientName}</p>
                  <p className="text-sm text-muted-foreground">{job.clientEmail}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
