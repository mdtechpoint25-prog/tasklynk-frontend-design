import { db } from '@/db';
import { notifications } from '@/db/schema';

async function main() {
    const sampleNotifications = [
        // Freelancer notifications (userId 14-28)
        {
            userId: 14,
            title: 'New Job Posted',
            message: 'A new job in Web Development matching your skills has been posted: Build E-commerce Website',
            type: 'new_job',
            isRead: false,
            createdAt: new Date('2024-03-15T09:30:00Z').toISOString(),
        },
        {
            userId: 15,
            title: 'Your Bid Was Accepted!',
            message: "Congratulations! Your bid for 'React Dashboard Application' has been accepted.",
            type: 'bid_accepted',
            isRead: true,
            createdAt: new Date('2024-03-10T14:20:00Z').toISOString(),
        },
        {
            userId: 16,
            title: 'Bid Not Selected',
            message: "Unfortunately, your bid for 'Logo and Brand Identity' was not selected.",
            type: 'bid_rejected',
            isRead: true,
            createdAt: new Date('2024-03-08T11:45:00Z').toISOString(),
        },
        {
            userId: 17,
            title: 'New Message',
            message: "You have a new message from Alice Johnson regarding 'Website Redesign'",
            type: 'message_received',
            isRead: false,
            createdAt: new Date('2024-03-18T16:10:00Z').toISOString(),
        },
        {
            userId: 18,
            title: 'Job Marked Complete',
            message: "The client has marked 'API Integration Project' as complete. Please confirm.",
            type: 'job_completed',
            isRead: false,
            createdAt: new Date('2024-03-17T13:30:00Z').toISOString(),
        },
        {
            userId: 19,
            title: 'Payment Received',
            message: "You received $900 for completing 'Data Entry and Cleanup'",
            type: 'payment_received',
            isRead: true,
            createdAt: new Date('2024-03-12T10:15:00Z').toISOString(),
        },
        {
            userId: 20,
            title: 'Milestone Approved',
            message: "Client approved your milestone for 'Mobile App UI Design'",
            type: 'milestone_approved',
            isRead: false,
            createdAt: new Date('2024-03-16T15:40:00Z').toISOString(),
        },
        {
            userId: 21,
            title: 'New Job Posted',
            message: 'A new job in Web Development matching your skills has been posted: Build E-commerce Website',
            type: 'new_job',
            isRead: true,
            createdAt: new Date('2024-03-14T08:25:00Z').toISOString(),
        },
        {
            userId: 22,
            title: 'Your Bid Was Accepted!',
            message: "Congratulations! Your bid for 'React Dashboard Application' has been accepted.",
            type: 'bid_accepted',
            isRead: false,
            createdAt: new Date('2024-03-11T12:50:00Z').toISOString(),
        },
        {
            userId: 23,
            title: 'New Message',
            message: "You have a new message from Alice Johnson regarding 'Website Redesign'",
            type: 'message_received',
            isRead: true,
            createdAt: new Date('2024-03-09T17:20:00Z').toISOString(),
        },
        {
            userId: 24,
            title: 'Payment Received',
            message: "You received $900 for completing 'Data Entry and Cleanup'",
            type: 'payment_received',
            isRead: false,
            createdAt: new Date('2024-03-13T14:05:00Z').toISOString(),
        },

        // Client notifications (userId 4-13)
        {
            userId: 4,
            title: 'New Bid Received',
            message: "Sarah Developer placed a bid of $3200 on your job 'Build E-commerce Website'",
            type: 'new_bid',
            isRead: false,
            createdAt: new Date('2024-03-16T10:30:00Z').toISOString(),
        },
        {
            userId: 5,
            title: 'Freelancer Applied',
            message: '3 new freelancers have applied to your job posting',
            type: 'job_application',
            isRead: true,
            createdAt: new Date('2024-03-15T13:45:00Z').toISOString(),
        },
        {
            userId: 6,
            title: 'New Message',
            message: 'You have a new message from Mike Designer',
            type: 'message_received',
            isRead: false,
            createdAt: new Date('2024-03-17T09:15:00Z').toISOString(),
        },
        {
            userId: 7,
            title: 'Job Completed',
            message: "Your freelancer has submitted the final deliverables for 'WordPress Plugin Development'",
            type: 'job_completed',
            isRead: true,
            createdAt: new Date('2024-03-14T16:20:00Z').toISOString(),
        },
        {
            userId: 8,
            title: 'Milestone Submitted',
            message: "Lisa Writer submitted milestone for review on 'Content Writing for Blog'",
            type: 'milestone_submitted',
            isRead: false,
            createdAt: new Date('2024-03-18T11:30:00Z').toISOString(),
        },
        {
            userId: 9,
            title: 'Deadline Approaching',
            message: "Your job 'SEO Optimization' deadline is in 3 days",
            type: 'deadline_reminder',
            isRead: false,
            createdAt: new Date('2024-03-18T08:00:00Z').toISOString(),
        },
        {
            userId: 10,
            title: 'New Bid Received',
            message: "Sarah Developer placed a bid of $3200 on your job 'Build E-commerce Website'",
            type: 'new_bid',
            isRead: true,
            createdAt: new Date('2024-03-12T15:10:00Z').toISOString(),
        },
        {
            userId: 11,
            title: 'Freelancer Applied',
            message: '3 new freelancers have applied to your job posting',
            type: 'job_application',
            isRead: false,
            createdAt: new Date('2024-03-13T12:25:00Z').toISOString(),
        },
        {
            userId: 12,
            title: 'Milestone Submitted',
            message: "Lisa Writer submitted milestone for review on 'Content Writing for Blog'",
            type: 'milestone_submitted',
            isRead: true,
            createdAt: new Date('2024-03-10T14:40:00Z').toISOString(),
        },
        {
            userId: 13,
            title: 'Deadline Approaching',
            message: "Your job 'SEO Optimization' deadline is in 3 days",
            type: 'deadline_reminder',
            isRead: false,
            createdAt: new Date('2024-03-17T07:30:00Z').toISOString(),
        },

        // Admin notifications (userId 1-3)
        {
            userId: 1,
            title: 'New User Registration',
            message: 'New freelancer registered: Xavier Video',
            type: 'new_user',
            isRead: true,
            createdAt: new Date('2024-03-16T09:00:00Z').toISOString(),
        },
        {
            userId: 2,
            title: 'Dispute Reported',
            message: 'A dispute has been filed for job #15 - requires admin attention',
            type: 'dispute_filed',
            isRead: false,
            createdAt: new Date('2024-03-18T10:45:00Z').toISOString(),
        },
        {
            userId: 3,
            title: 'Profile Verification',
            message: '5 freelancer profiles are pending approval',
            type: 'verification_pending',
            isRead: false,
            createdAt: new Date('2024-03-17T14:20:00Z').toISOString(),
        },
        {
            userId: 1,
            title: 'New User Registration',
            message: 'New freelancer registered: Xavier Video',
            type: 'new_user',
            isRead: false,
            createdAt: new Date('2024-03-15T11:30:00Z').toISOString(),
        },
    ];

    await db.insert(notifications).values(sampleNotifications);
    
    console.log('✅ Notifications seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});