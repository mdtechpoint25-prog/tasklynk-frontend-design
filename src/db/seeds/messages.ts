import { db } from '@/db';
import { messages } from '@/db/schema';

async function main() {
    const sampleMessages = [
        // Conversation 1: Job ID 1 (Client 4 and Freelancer 14)
        {
            senderId: 4,
            receiverId: 14,
            jobId: 1,
            message: "Hi! I'm interested in your bid. Can you share some examples of your previous work?",
            isRead: true,
            createdAt: new Date('2024-01-15T10:30:00Z').toISOString(),
        },
        {
            senderId: 14,
            receiverId: 4,
            jobId: 1,
            message: "Sure! Here's my portfolio link: portfolio.example.com/johndoe. I've completed 15+ similar projects.",
            isRead: true,
            createdAt: new Date('2024-01-15T11:45:00Z').toISOString(),
        },
        {
            senderId: 4,
            receiverId: 14,
            jobId: 1,
            message: "Great! When can you start on the project?",
            isRead: true,
            createdAt: new Date('2024-01-15T14:20:00Z').toISOString(),
        },
        {
            senderId: 14,
            receiverId: 4,
            jobId: 1,
            message: "I can start this Monday. Would that work for you?",
            isRead: true,
            createdAt: new Date('2024-01-15T15:30:00Z').toISOString(),
        },
        {
            senderId: 4,
            receiverId: 14,
            jobId: 1,
            message: "Perfect! I'm accepting your bid. Let's discuss the details.",
            isRead: true,
            createdAt: new Date('2024-01-16T09:00:00Z').toISOString(),
        },

        // Conversation 2: Job ID 3 (Client 5 and Freelancer 15)
        {
            senderId: 15,
            receiverId: 5,
            jobId: 3,
            message: "Thank you for accepting my bid! I'll send you the initial mockups by Wednesday.",
            isRead: true,
            createdAt: new Date('2024-01-18T10:15:00Z').toISOString(),
        },
        {
            senderId: 5,
            receiverId: 15,
            jobId: 3,
            message: "I have a question about the timeline. Can we extend the deadline by one week?",
            isRead: true,
            createdAt: new Date('2024-01-20T13:45:00Z').toISOString(),
        },
        {
            senderId: 15,
            receiverId: 5,
            jobId: 3,
            message: "Yes, that's fine. I'll adjust the schedule accordingly.",
            isRead: false,
            createdAt: new Date('2024-01-20T14:30:00Z').toISOString(),
        },

        // Conversation 3: Job ID 5 (Client 6 and Freelancer 16)
        {
            senderId: 6,
            receiverId: 16,
            jobId: 5,
            message: "The design looks great! Can you make the header section larger?",
            isRead: true,
            createdAt: new Date('2024-01-22T11:00:00Z').toISOString(),
        },
        {
            senderId: 16,
            receiverId: 6,
            jobId: 5,
            message: "Absolutely! I'll update it and send a revised version today.",
            isRead: true,
            createdAt: new Date('2024-01-22T12:30:00Z').toISOString(),
        },
        {
            senderId: 16,
            receiverId: 6,
            jobId: 5,
            message: "I've completed the first milestone. Please review and let me know your feedback.",
            isRead: false,
            createdAt: new Date('2024-01-25T16:00:00Z').toISOString(),
        },

        // Conversation 4: Job ID 7 (Client 7 and Freelancer 18)
        {
            senderId: 7,
            receiverId: 18,
            jobId: 7,
            message: "Could you provide the login credentials for the staging site?",
            isRead: true,
            createdAt: new Date('2024-01-28T09:30:00Z').toISOString(),
        },
        {
            senderId: 18,
            receiverId: 7,
            jobId: 7,
            message: "Sure! I'll send them via encrypted email within the hour.",
            isRead: true,
            createdAt: new Date('2024-01-28T10:15:00Z').toISOString(),
        },
        {
            senderId: 7,
            receiverId: 18,
            jobId: 7,
            message: "The payment has been processed. Thank you for working with me!",
            isRead: true,
            createdAt: new Date('2024-02-05T14:00:00Z').toISOString(),
        },

        // Conversation 5: Job ID 9 (Client 8 and Freelancer 20)
        {
            senderId: 8,
            receiverId: 20,
            jobId: 9,
            message: "I need some clarification on the requirements. Can we schedule a call?",
            isRead: true,
            createdAt: new Date('2024-02-01T11:00:00Z').toISOString(),
        },
        {
            senderId: 20,
            receiverId: 8,
            jobId: 9,
            message: "Of course! I'm available tomorrow at 2 PM or Thursday at 10 AM. Which works better for you?",
            isRead: true,
            createdAt: new Date('2024-02-01T12:30:00Z').toISOString(),
        },
        {
            senderId: 8,
            receiverId: 20,
            jobId: 9,
            message: "Thursday at 10 AM works perfectly. I'll send you the meeting link.",
            isRead: false,
            createdAt: new Date('2024-02-01T13:15:00Z').toISOString(),
        },

        // Conversation 6: Job ID 11 (Client 9 and Freelancer 22)
        {
            senderId: 22,
            receiverId: 9,
            jobId: 11,
            message: "I've uploaded the final files to the shared drive. Please check and confirm delivery.",
            isRead: true,
            createdAt: new Date('2024-02-08T15:30:00Z').toISOString(),
        },
        {
            senderId: 9,
            receiverId: 22,
            jobId: 11,
            message: "Thanks for the great work! I'll leave you a 5-star review.",
            isRead: true,
            createdAt: new Date('2024-02-09T10:00:00Z').toISOString(),
        },
        {
            senderId: 9,
            receiverId: 22,
            jobId: 11,
            message: "Do you offer post-launch support? I might need some updates later.",
            isRead: false,
            createdAt: new Date('2024-02-09T11:30:00Z').toISOString(),
        },

        // Conversation 7: Job ID 13 (Client 10 and Freelancer 24)
        {
            senderId: 24,
            receiverId: 10,
            jobId: 13,
            message: "I'm available for any revisions if needed. Just let me know!",
            isRead: true,
            createdAt: new Date('2024-02-12T09:00:00Z').toISOString(),
        },
        {
            senderId: 10,
            receiverId: 24,
            jobId: 13,
            message: "Actually, could you adjust the color scheme to match our brand guidelines?",
            isRead: true,
            createdAt: new Date('2024-02-12T14:00:00Z').toISOString(),
        },
        {
            senderId: 24,
            receiverId: 10,
            jobId: 13,
            message: "Absolutely! Could you share the brand guidelines document?",
            isRead: false,
            createdAt: new Date('2024-02-12T14:45:00Z').toISOString(),
        },

        // General inquiries without job ID
        {
            senderId: 11,
            receiverId: 25,
            jobId: null,
            message: "Hi! I saw your profile and I'm impressed with your skills. Are you available for new projects?",
            isRead: true,
            createdAt: new Date('2024-02-10T10:30:00Z').toISOString(),
        },
        {
            senderId: 25,
            receiverId: 11,
            jobId: null,
            message: "Thank you! Yes, I'm currently available. What kind of project are you looking for?",
            isRead: false,
            createdAt: new Date('2024-02-10T11:15:00Z').toISOString(),
        },
        {
            senderId: 12,
            receiverId: 26,
            jobId: null,
            message: "What's your typical turnaround time for mobile app projects?",
            isRead: true,
            createdAt: new Date('2024-02-14T13:00:00Z').toISOString(),
        },
        {
            senderId: 26,
            receiverId: 12,
            jobId: null,
            message: "It depends on the complexity, but typically 4-8 weeks for a full mobile app.",
            isRead: true,
            createdAt: new Date('2024-02-14T14:30:00Z').toISOString(),
        },
        {
            senderId: 13,
            receiverId: 28,
            jobId: null,
            message: "Do you have experience with React Native and TypeScript?",
            isRead: false,
            createdAt: new Date('2024-02-15T16:00:00Z').toISOString(),
        },

        // Additional conversations
        {
            senderId: 4,
            receiverId: 17,
            jobId: 2,
            message: "I noticed you specialize in UI/UX design. Could you help with our project?",
            isRead: true,
            createdAt: new Date('2024-01-19T10:00:00Z').toISOString(),
        },
        {
            senderId: 17,
            receiverId: 4,
            jobId: 2,
            message: "I'd be happy to! Let me review the project details and send you a proposal.",
            isRead: true,
            createdAt: new Date('2024-01-19T11:30:00Z').toISOString(),
        },
    ];

    await db.insert(messages).values(sampleMessages);
    
    console.log('✅ Messages seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});