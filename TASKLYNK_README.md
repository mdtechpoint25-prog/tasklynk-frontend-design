# TaskLynk - Freelance & Gig Economy Platform

## 🎯 Overview

TaskLynk is a modern, full-stack freelance and gig economy platform built with Next.js 15, TypeScript, and Supabase. It connects businesses with skilled professionals through a secure, transparent, and efficient marketplace.

## ✨ Features Implemented

### 🔐 Authentication System
- Email/password authentication with Better Auth
- Role-based signup (Client, Freelancer, Admin)
- Secure session management with bearer tokens
- Protected routes for all dashboard pages

### 👥 Three User Roles

#### **Clients**
- Post job opportunities with budget and deadlines
- Review and manage bids from freelancers
- Track active and completed projects
- Dashboard with job statistics and analytics

#### **Freelancers**
- Browse available jobs with search and filter
- Submit competitive bids with proposals
- Track bid status and assigned jobs
- Profile with skills and hourly rate

#### **Admins**
- Platform-wide analytics dashboard
- User approval system (approve/reject pending users)
- Monitor all jobs, bids, and transactions
- Platform statistics and revenue tracking

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                      # Landing page
│   ├── login/page.tsx                # Login page
│   ├── signup/page.tsx               # Signup with role selection
│   ├── dashboard/
│   │   ├── page.tsx                  # Dashboard redirect based on role
│   │   ├── client/page.tsx           # Client dashboard
│   │   ├── freelancer/page.tsx       # Freelancer dashboard (job browsing)
│   │   ├── freelancer/jobs/[id]/page.tsx  # Job detail & bid submission
│   │   └── admin/page.tsx            # Admin dashboard
│   └── api/
│       ├── profiles/route.ts         # User profile management
│       ├── jobs/
│       │   ├── client/route.ts       # Client's jobs
│       │   ├── freelancer/route.ts   # Available jobs for freelancers
│       │   └── [id]/route.ts         # Job details
│       ├── bids/route.ts             # Bid submission
│       └── admin/
│           ├── users/route.ts        # User management
│           └── stats/route.ts        # Platform statistics
├── components/
│   ├── ui/                           # Shadcn/UI components
│   └── DashboardLayout.tsx           # Shared dashboard layout
├── db/
│   ├── schema.ts                     # Database schema (Drizzle ORM)
│   └── seeds/                        # Sample data seeders
└── lib/
    ├── auth.ts                       # Server-side auth
    └── auth-client.ts                # Client-side auth

```

## 🗄️ Database Schema

### Tables Created:
1. **profiles** - User information with roles and account status
2. **jobs** - Job postings with budgets, deadlines, and status
3. **bids** - Freelancer bids on jobs with proposals
4. **messages** - Direct messaging between users
5. **notifications** - Platform notifications
6. **transactions** - Payment tracking
7. **user, session, account, verification** - Better Auth tables

### Sample Data Seeded:
- ✅ 3 Admin users
- ✅ 10 Clients (all approved)
- ✅ 15 Freelancers (10 approved, 5 pending)
- ✅ 20 Jobs across 6 categories
- ✅ 40 Bids with realistic proposals
- ✅ 30 Messages between users
- ✅ 25 Notifications
- ✅ 15 Transactions

## 🚀 Getting Started

### Test Accounts

You can use these seeded accounts to test the platform:

**Admin:**
- Email: `admin1@tasklynk.com`
- Password: `Password123!`

**Client:**
- Email: `client1@tasklynk.com` (or client2-10)
- Password: `Password123!`

**Freelancer:**
- Email: `freelancer1@tasklynk.com` (or freelancer2-15)
- Password: `Password123!`

### User Flows

#### For Clients:
1. Sign up as a Client
2. Wait for admin approval (or use pre-approved test account)
3. Post a new job with details and budget
4. Review bids from freelancers
5. Accept a bid to hire a freelancer
6. Track job progress and communicate

#### For Freelancers:
1. Sign up as a Freelancer
2. Wait for admin approval (or use pre-approved test account)
3. Browse available jobs
4. Filter by category and search
5. Submit competitive bids with proposals
6. Track bid status and active jobs

#### For Admins:
1. Login with admin credentials
2. View platform statistics
3. Approve or reject pending users
4. Monitor all jobs and transactions
5. Manage platform integrity

## 🎨 UI/UX Features

### Landing Page
- Modern hero section with CTAs
- Feature cards highlighting platform benefits
- Testimonials from users
- Responsive footer with navigation

### Authentication
- Clean, centered card-based design
- Role selection during signup
- Form validation and error handling
- Success messages and redirects

### Dashboards
- Sidebar navigation (responsive on mobile)
- Statistics cards with real-time data
- User profile dropdown
- Notification bell
- Clean table views for data
- Action buttons with loading states

### Job Browsing (Freelancer)
- Search functionality
- Category filters
- Job cards with key information
- Budget and deadline display
- "View Details & Bid" actions

### Job Management (Client)
- Job creation workflow
- Bid review and acceptance
- Status tracking (pending, in-progress, completed)
- Budget and timeline management

### Admin Panel
- Platform-wide statistics
- User approval workflow
- Real-time data updates
- Analytics at a glance

## 🔒 Security Features

- ✅ Session-based authentication with Better Auth
- ✅ Bearer token authorization for API routes
- ✅ Role-based access control (RBAC)
- ✅ Protected API endpoints
- ✅ Server-side session validation
- ✅ Client-side route protection

## 🛠️ Tech Stack

- **Frontend:** Next.js 15, React, TypeScript
- **Styling:** Tailwind CSS v4, Shadcn/UI
- **Authentication:** Better Auth with bearer tokens
- **Database:** Turso (SQLite), Drizzle ORM
- **Icons:** Lucide React
- **Notifications:** Sonner (toast)
- **Forms:** React Hook Form compatible

## 📊 API Endpoints

### Profiles
- `GET /api/profiles` - Get current user profile
- `POST /api/profiles` - Create profile after signup

### Jobs
- `GET /api/jobs/client` - Get client's jobs
- `POST /api/jobs/client` - Create new job
- `GET /api/jobs/freelancer` - Get available jobs
- `GET /api/jobs/[id]` - Get job details with bids

### Bids
- `POST /api/bids` - Submit a bid

### Admin
- `GET /api/admin/users` - Get all users
- `PATCH /api/admin/users` - Update user status
- `GET /api/admin/stats` - Get platform statistics

## 🎯 Key Features Highlights

### Job Posting Flow
1. Client creates job with title, description, budget, deadline, category
2. Job appears in freelancer job browse page
3. Freelancers can submit bids
4. Client reviews bids and accepts one
5. Job status updates to "in_progress"

### Bidding System
- Freelancers submit bid amount, estimated duration, and proposal
- Real-time bid count display on jobs
- Competitive bid viewing
- Bid status tracking (pending, accepted, rejected)

### Admin Approval
- New users start with "pending" status
- Admin reviews and approves/rejects
- Approved users get full platform access
- Email notifications (can be added)

## 🌟 Design Principles

- **Clean & Modern:** Minimalist design with focus on functionality
- **Responsive:** Mobile-first approach, works on all devices
- **Accessible:** ARIA labels, keyboard navigation, contrast ratios
- **Consistent:** Unified color palette, typography, button styles
- **User-Friendly:** Clear CTAs, loading states, error messages

## 🔄 Next Steps / Future Enhancements

1. **Messaging System:** Real-time chat between clients and freelancers
2. **Payment Integration:** Stripe/PayPal for secure transactions
3. **File Uploads:** Attach files to jobs and bids
4. **Email Notifications:** Automated emails for important events
5. **Reviews & Ratings:** Star ratings and written reviews
6. **Advanced Filters:** More granular job filtering options
7. **Search Autocomplete:** Smart search suggestions
8. **Portfolio Pages:** Showcase freelancer work
9. **Dispute Resolution:** System for handling conflicts
10. **Analytics Dashboard:** Detailed charts and graphs

## 📝 Environment Variables

The following environment variables are already configured:

```env
TURSO_CONNECTION_URL=<your-turso-url>
TURSO_AUTH_TOKEN=<your-turso-token>
BETTER_AUTH_SECRET=<auto-generated>
```

## 🎨 Color Scheme

The platform uses a professional, neutral color scheme:
- **Primary:** Dark gray/black for professionalism
- **Secondary:** Light gray for secondary actions
- **Accent:** Blue for interactive elements
- **Success:** Green for completed states
- **Warning:** Yellow for pending states
- **Error:** Red for destructive actions

## 📱 Responsive Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

## 🐛 Error Handling

- All API routes have try-catch blocks
- User-friendly error messages via toast notifications
- Loading states on all async operations
- Form validation before submission
- 401/403/404/500 error responses

## ✅ All Tasks Completed

- [x] Database schema with RLS policies
- [x] Authentication with role selection
- [x] Landing page with hero and features
- [x] Login/Signup pages
- [x] Client dashboard
- [x] Freelancer dashboard
- [x] Admin dashboard
- [x] Job posting and management
- [x] Bid submission system
- [x] User approval workflow
- [x] Profile management
- [x] API endpoints
- [x] Responsive design
- [x] Loading states
- [x] Error handling

## 🎉 Ready to Launch!

Your TaskLynk platform is fully functional and ready for use. Test it out with the seeded accounts, or create new users to explore all features!

---

**Built with ❤️ in Nairobi | TaskLynk © 2025**
