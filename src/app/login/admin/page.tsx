"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Briefcase, ShieldCheck } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

// Authorized admin emails
const ADMIN_EMAILS = [
  "topwriteessays@gmail.com",
  "m.d.techpoint25@gmail.com",
  "maguna956@gmail.com",
  "tasklynk01@gmail.com",
  "maxwellotieno11@gmail.com",
  "ashleydothy3162@gmail.com"
];

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate email is in authorized list
      if (!ADMIN_EMAILS.includes(formData.email.toLowerCase().trim())) {
        toast.error("Unauthorized email. Only authorized admins can access this page.");
        setLoading(false);
        return;
      }

      // Validate password match
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        setLoading(false);
        return;
      }

      // Validate password strength
      if (formData.password.length < 8) {
        toast.error("Password must be at least 8 characters long");
        setLoading(false);
        return;
      }

      // Try to sign up first (in case account doesn't exist)
      const { data: signupData, error: signupError } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.email.split("@")[0],
      });

      // If signup fails because user exists, try to sign in instead
      if (signupError?.code === "USER_ALREADY_EXISTS") {
        const { data: signinData, error: signinError } = await authClient.signIn.email({
          email: formData.email,
          password: formData.password,
          callbackURL: "/dashboard/admin"
        });

        if (signinError?.code) {
          toast.error("Invalid credentials. Please check your email and password.");
          setLoading(false);
          return;
        }

        toast.success("Welcome back, Admin!");
        router.push("/dashboard/admin");
        return;
      }

      if (signupError?.code) {
        toast.error("Registration failed. Please try again.");
        setLoading(false);
        return;
      }

      // If signup successful, update profile to admin role and auto-approve
      if (signupData?.user) {
        await fetch("/api/profiles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: signupData.user.id,
            email: formData.email,
            name: formData.email.split("@")[0],
            role: "admin",
            accountStatus: "approved"
          })
        });

        toast.success("Admin account created successfully!");
        
        // Auto-login after registration
        const { error: signinError } = await authClient.signIn.email({
          email: formData.email,
          password: formData.password,
          callbackURL: "/dashboard/admin"
        });

        if (signinError?.code) {
          toast.error("Account created but auto-login failed. Please login manually.");
          router.push("/login");
          return;
        }

        router.push("/dashboard/admin");
      }
    } catch (error) {
      console.error("Admin login error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <Briefcase className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">TaskLynk</span>
          </Link>
        </div>

        {/* Admin Login Card */}
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center">Admin Access</CardTitle>
            <CardDescription className="text-center">
              Enter your authorized admin credentials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-6">
              <AlertDescription className="text-sm">
                Only authorized administrators can access this page. Your email must be pre-approved.
              </AlertDescription>
            </Alert>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@tasklynk.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  disabled={loading}
                  autoComplete="off"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  disabled={loading}
                  autoComplete="off"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Processing..." : "Access Admin Dashboard"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <Link href="/login" className="text-muted-foreground hover:text-primary">
                ← Back to regular login
              </Link>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          For regular user access,{" "}
          <Link href="/login" className="text-primary hover:underline">
            click here
          </Link>
        </p>
      </div>
    </div>
  );
}
