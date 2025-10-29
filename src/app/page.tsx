import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Users, MessageSquare, Shield, TrendingUp, Clock } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Briefcase,
      title: "Post & Browse Jobs",
      description: "Clients post projects while freelancers browse and bid on opportunities that match their skills."
    },
    {
      icon: Users,
      title: "Verified Professionals",
      description: "Connect with verified freelancers and trusted clients through our secure platform."
    },
    {
      icon: MessageSquare,
      title: "Real-time Communication",
      description: "Integrated messaging system for seamless collaboration between clients and freelancers."
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Protected payment processing ensures safe transactions for both parties."
    },
    {
      icon: TrendingUp,
      title: "Track Progress",
      description: "Monitor project status, deadlines, and milestones in real-time dashboards."
    },
    {
      icon: Clock,
      title: "Flexible Timelines",
      description: "Set your own schedules and deadlines for maximum flexibility."
    }
  ];

  const testimonials = [
    {
      name: "Alice Johnson",
      role: "Startup Founder",
      content: "TaskLynk helped me find amazing developers for my project. The platform is intuitive and the quality of freelancers is outstanding!",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice"
    },
    {
      name: "Sarah Developer",
      role: "Full-stack Developer",
      content: "As a freelancer, TaskLynk has been a game-changer. I get consistent work and the payment process is smooth and reliable.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
    },
    {
      name: "Bob Smith",
      role: "Business Owner",
      content: "The platform's transparency and communication tools make project management effortless. Highly recommended!",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">TaskLynk</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Log In</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 md:py-32 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Badge variant="secondary" className="mb-4">
            Trusted by 10,000+ Professionals
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Connect, Collaborate, and Achieve Your Goals
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            TaskLynk empowers businesses and freelancers to work together seamlessly. 
            Post jobs, receive bids, and manage projects all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link href="/signup?role=client">
              <Button size="lg" className="w-full sm:w-auto">
                I'm Hiring
              </Button>
            </Link>
            <Link href="/signup?role=freelancer">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                I'm a Freelancer
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose TaskLynk?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage freelance projects efficiently and securely
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">What Our Users Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied clients and freelancers
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-muted/50">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full"
                    />
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                    </div>
                  </div>
                  <CardContent className="px-0">
                    <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                  </CardContent>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Get Started?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join TaskLynk today and experience the future of freelance collaboration
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="h-5 w-5 text-primary" />
                <span className="font-bold">TaskLynk</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering businesses and freelancers to connect and succeed.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/signup" className="hover:text-foreground">Browse Jobs</Link></li>
                <li><Link href="/signup" className="hover:text-foreground">Post a Job</Link></li>
                <li><Link href="/signup" className="hover:text-foreground">Find Freelancers</Link></li>
                {/* Added new link */}
                <li><Link href="/login/admin" className="hover:text-foreground">Login as Admin</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">About Us</Link></li>
                <li><Link href="#" className="hover:text-foreground">Contact</Link></li>
                <li><Link href="#" className="hover:text-foreground">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-foreground">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-foreground">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 TaskLynk. All rights reserved. Built in Nairobi.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}