"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { authClient } from "@/lib/auth-client";
import { Briefcase, Loader2, User, Users } from "lucide-react";
import { toast } from "sonner";

// Admin emails that should be auto-approved
const AUTO_APPROVE_EMAILS = [
  "topwriteessays@gmail.com",
  "m.d.techpoint25@gmail.com",
  "maguna956@gmail.com",
  "tasklynk01@gmail.com",
  "maxwellotieno11@gmail.com",
  "ashleydothy3162@gmail.com"
];

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: searchParams.get("role") || "freelancer"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match. Please try again.");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        email: formData.email,
        name: formData.fullName,
        password: formData.password
      });

      if (error) {
        const errorMessages: Record<string, string> = {
          USER_ALREADY_EXISTS: "An account with this email already exists.",
        };
        
        toast.error(errorMessages[error.code || ""] || "Failed to create account. Please try again.");
        setIsLoading(false);
        return;
      }

      // Determine if this is an admin email and should be auto-approved
      const isAdminEmail = AUTO_APPROVE_EMAILS.includes(formData.email.toLowerCase());
      const accountStatus = isAdminEmail ? "approved" : "pending";
      const userRole = isAdminEmail ? "admin" : formData.role;

      // Create profile entry in database with role
      try {
        const response = await fetch("/api/profiles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("bearer_token")}`
          },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            role: userRole,
            accountStatus: accountStatus
          })
        });

        if (!response.ok) {
          console.error("Failed to create profile");
        }
      } catch (error) {
        console.error("Profile creation error:", error);
      }

      if (isAdminEmail) {
        toast.success("Admin account created and approved! Redirecting to dashboard...");
        setTimeout(() => {
          router.push("/dashboard/admin");
        }, 1000);
      } else {
        toast.success("Your account has been created successfully. Please wait for admin approval.");
        router.push("/login?registered=true");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2">
          <Briefcase className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">TaskLynk</span>
        </Link>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Create an account</CardTitle>
            <CardDescription className="text-center">
              Join TaskLynk to start your journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label>I want to...</Label>
                <RadioGroup
                  value={formData.role}
                  onValueChange={(value) => setFormData({ ...formData, role: value })}
                  disabled={isLoading}
                  className="grid grid-cols-2 gap-4"
                >
                  <div>
                    <RadioGroupItem
                      value="freelancer"
                      id="freelancer"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="freelancer"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <User className="mb-3 h-6 w-6" />
                      <span className="text-sm font-medium">Find Work</span>
                      <span className="text-xs text-muted-foreground">As a Freelancer</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="client"
                      id="client"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="client"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <Users className="mb-3 h-6 w-6" />
                      <span className="text-sm font-medium">Hire Talent</span>
                      <span className="text-xs text-muted-foreground">As a Client</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link href="/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          By continuing, you agree to our{" "}
          <Link href="#" className="underline hover:text-primary">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="underline hover:text-primary">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}