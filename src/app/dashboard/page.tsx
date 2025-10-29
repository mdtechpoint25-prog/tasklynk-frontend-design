"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";

export default function DashboardRedirect() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
      return;
    }

    if (session?.user) {
      fetchProfile();
    }
  }, [session, isPending, router]);

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/profiles", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("bearer_token")}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        
        // Redirect based on role
        if (data.role === "client") {
          router.push("/dashboard/client");
        } else if (data.role === "freelancer") {
          router.push("/dashboard/freelancer");
        } else if (data.role === "admin") {
          router.push("/dashboard/admin");
        }
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
        <p className="text-muted-foreground">Loading your dashboard...</p>
      </div>
    </div>
  );
}
