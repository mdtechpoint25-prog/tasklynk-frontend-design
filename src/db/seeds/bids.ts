import { db } from '@/db';
import { bids } from '@/db/schema';

async function main() {
    const sampleBids = [
        // Job 1 - E-commerce Website (budget: 5000, pending)
        {
            jobId: 1,
            freelancerId: 14,
            bidAmount: 4500.00,
            estimatedDuration: '3-4 weeks',
            proposalMessage: 'I have 5+ years of experience in web development and have completed similar e-commerce projects. I can deliver high-quality work within your timeline.',
            status: 'pending',
            createdAt: new Date('2024-01-16').toISOString(),
        },
        {
            jobId: 1,
            freelancerId: 18,
            bidAmount: 5200.00,
            estimatedDuration: '1 month',
            proposalMessage: 'Expert in React and Node.js. I can start immediately and provide daily progress updates.',
            status: 'pending',
            createdAt: new Date('2024-01-17').toISOString(),
        },
        {
            jobId: 1,
            freelancerId: 22,
            bidAmount: 4800.00,
            estimatedDuration: '2 weeks',
            proposalMessage: 'Full-stack developer ready to take on your project. I ensure clean, maintainable code.',
            status: 'pending',
            createdAt: new Date('2024-01-18').toISOString(),
        },

        // Job 2 - Mobile App Development (budget: 8000, in_progress)
        {
            jobId: 2,
            freelancerId: 15,
            bidAmount: 7800.00,
            estimatedDuration: '2 months',
            proposalMessage: 'Hi! I\'m excited about this project. I\'ve built multiple mobile apps and can show you my portfolio. Let\'s discuss your requirements!',
            status: 'accepted',
            createdAt: new Date('2024-01-21').toISOString(),
        },
        {
            jobId: 2,
            freelancerId: 19,
            bidAmount: 8500.00,
            estimatedDuration: '2 months',
            proposalMessage: 'Professional mobile developer with 6 years experience. I specialize in cross-platform development.',
            status: 'rejected',
            createdAt: new Date('2024-01-22').toISOString(),
        },

        // Job 3 - Logo Design (budget: 500, pending)
        {
            jobId: 3,
            freelancerId: 16,
            bidAmount: 450.00,
            estimatedDuration: '5-7 days',
            proposalMessage: 'I specialize in UI/UX design and would love to work on your project. I can provide 2 design concepts to choose from.',
            status: 'pending',
            createdAt: new Date('2024-01-26').toISOString(),
        },
        {
            jobId: 3,
            freelancerId: 23,
            bidAmount: 400.00,
            estimatedDuration: '1 week',
            proposalMessage: 'Skilled designer with 7 years experience. Let me bring your vision to life!',
            status: 'pending',
            createdAt: new Date('2024-01-27').toISOString(),
        },

        // Job 4 - Content Writing (budget: 300, in_progress)
        {
            jobId: 4,
            freelancerId: 17,
            bidAmount: 280.00,
            estimatedDuration: '10 days',
            proposalMessage: 'Professional content writer with SEO expertise. I\'ve written 100+ blog posts and can deliver engaging content.',
            status: 'accepted',
            createdAt: new Date('2024-02-02').toISOString(),
        },
        {
            jobId: 4,
            freelancerId: 21,
            bidAmount: 320.00,
            estimatedDuration: '1 week',
            proposalMessage: 'Experienced writer specializing in tech content. Quick turnaround guaranteed.',
            status: 'rejected',
            createdAt: new Date('2024-02-03').toISOString(),
        },

        // Job 5 - SEO Optimization (budget: 1200, pending)
        {
            jobId: 5,
            freelancerId: 20,
            bidAmount: 1150.00,
            estimatedDuration: '2 weeks',
            proposalMessage: 'Marketing specialist with proven track record. I\'ll help grow your online presence.',
            status: 'pending',
            createdAt: new Date('2024-02-06').toISOString(),
        },
        {
            jobId: 5,
            freelancerId: 24,
            bidAmount: 1300.00,
            estimatedDuration: '3 weeks',
            proposalMessage: 'SEO expert with 8 years experience. I\'ve helped 50+ businesses rank on first page.',
            status: 'pending',
            createdAt: new Date('2024-02-07').toISOString(),
        },

        // Job 6 - Data Entry (budget: 200, in_progress)
        {
            jobId: 6,
            freelancerId: 14,
            bidAmount: 180.00,
            estimatedDuration: '5-7 days',
            proposalMessage: 'Fast and reliable data entry professional. I guarantee accuracy and timely delivery.',
            status: 'accepted',
            createdAt: new Date('2024-02-11').toISOString(),
        },

        // Job 7 - WordPress Plugin (budget: 1500, pending)
        {
            jobId: 7,
            freelancerId: 18,
            bidAmount: 1400.00,
            estimatedDuration: '2 weeks',
            proposalMessage: 'I have experience with WordPress plugin development and can create exactly what you need.',
            status: 'pending',
            createdAt: new Date('2024-02-16').toISOString(),
        },
        {
            jobId: 7,
            freelancerId: 25,
            bidAmount: 1550.00,
            estimatedDuration: '3 weeks',
            proposalMessage: 'WordPress expert with 10+ custom plugins developed. Let\'s build something great!',
            status: 'pending',
            createdAt: new Date('2024-02-17').toISOString(),
        },
        {
            jobId: 7,
            freelancerId: 28,
            bidAmount: 1350.00,
            estimatedDuration: '10 days',
            proposalMessage: 'Experienced WordPress developer. I can start immediately and deliver quality work.',
            status: 'pending',
            createdAt: new Date('2024-02-18').toISOString(),
        },

        // Job 8 - Video Editing (budget: 800, in_progress)
        {
            jobId: 8,
            freelancerId: 19,
            bidAmount: 750.00,
            estimatedDuration: '1 week',
            proposalMessage: 'Professional video editor with expertise in Adobe Premiere. I\'ll make your content shine!',
            status: 'accepted',
            createdAt: new Date('2024-02-21').toISOString(),
        },
        {
            jobId: 8,
            freelancerId: 26,
            bidAmount: 820.00,
            estimatedDuration: '10 days',
            proposalMessage: 'Creative video editor with 5 years experience. Let me tell your story visually.',
            status: 'rejected',
            createdAt: new Date('2024-02-22').toISOString(),
        },

        // Job 9 - Social Media Management (budget: 600, pending)
        {
            jobId: 9,
            freelancerId: 20,
            bidAmount: 580.00,
            estimatedDuration: '1 month',
            proposalMessage: 'Social media expert with proven engagement strategies. I\'ll grow your audience organically.',
            status: 'pending',
            createdAt: new Date('2024-02-26').toISOString(),
        },
        {
            jobId: 9,
            freelancerId: 27,
            bidAmount: 650.00,
            estimatedDuration: '1 month',
            proposalMessage: 'Marketing specialist with proven track record. I\'ll help grow your online presence.',
            status: 'pending',
            createdAt: new Date('2024-02-27').toISOString(),
        },

        // Job 10 - Graphic Design (budget: 700, in_progress)
        {
            jobId: 10,
            freelancerId: 16,
            bidAmount: 680.00,
            estimatedDuration: '2 weeks',
            proposalMessage: 'Skilled designer with 7 years experience. Let me bring your vision to life!',
            status: 'accepted',
            createdAt: new Date('2024-03-02').toISOString(),
        },

        // Job 11 - API Development (budget: 2500, pending)
        {
            jobId: 11,
            freelancerId: 22,
            bidAmount: 2400.00,
            estimatedDuration: '3 weeks',
            proposalMessage: 'Full-stack developer ready to take on your project. I ensure clean, maintainable code.',
            status: 'pending',
            createdAt: new Date('2024-03-06').toISOString(),
        },
        {
            jobId: 11,
            freelancerId: 15,
            bidAmount: 2600.00,
            estimatedDuration: '1 month',
            proposalMessage: 'Expert in React and Node.js. I can start immediately and provide daily progress updates.',
            status: 'pending',
            createdAt: new Date('2024-03-07').toISOString(),
        },

        // Job 12 - Translation Services (budget: 400, in_progress)
        {
            jobId: 12,
            freelancerId: 17,
            bidAmount: 380.00,
            estimatedDuration: '5-7 days',
            proposalMessage: 'Native speaker with professional translation experience. Accuracy guaranteed!',
            status: 'accepted',
            createdAt: new Date('2024-03-11').toISOString(),
        },
        {
            jobId: 12,
            freelancerId: 24,
            bidAmount: 420.00,
            estimatedDuration: '1 week',
            proposalMessage: 'Professional translator with 8 years experience. Quality and precision assured.',
            status: 'rejected',
            createdAt: new Date('2024-03-12').toISOString(),
        },

        // Job 13 - UI/UX Design (budget: 1800, pending)
        {
            jobId: 13,
            freelancerId: 23,
            bidAmount: 1750.00,
            estimatedDuration: '3 weeks',
            proposalMessage: 'I specialize in UI/UX design and would love to work on your project. I can provide 2 design concepts to choose from.',
            status: 'pending',
            createdAt: new Date('2024-03-16').toISOString(),
        },
        {
            jobId: 13,
            freelancerId: 16,
            bidAmount: 1900.00,
            estimatedDuration: '1 month',
            proposalMessage: 'Skilled designer with 7 years experience. Let me bring your vision to life!',
            status: 'pending',
            createdAt: new Date('2024-03-17').toISOString(),
        },

        // Job 14 - Database Design (budget: 2000, in_progress)
        {
            jobId: 14,
            freelancerId: 18,
            bidAmount: 1950.00,
            estimatedDuration: '2 weeks',
            proposalMessage: 'Database architect with 7 years experience. I design scalable and efficient solutions.',
            status: 'accepted',
            createdAt: new Date('2024-03-21').toISOString(),
        },

        // Job 15 - Email Marketing (budget: 500, pending)
        {
            jobId: 15,
            freelancerId: 27,
            bidAmount: 480.00,
            estimatedDuration: '10 days',
            proposalMessage: 'Marketing specialist with proven track record. I\'ll help grow your online presence.',
            status: 'pending',
            createdAt: new Date('2024-03-26').toISOString(),
        },
        {
            jobId: 15,
            freelancerId: 20,
            bidAmount: 520.00,
            estimatedDuration: '2 weeks',
            proposalMessage: 'Email marketing expert with high conversion rates. Let\'s boost your sales!',
            status: 'pending',
            createdAt: new Date('2024-03-27').toISOString(),
        },

        // Job 16 - React Development (budget: 3000, in_progress)
        {
            jobId: 16,
            freelancerId: 22,
            bidAmount: 2900.00,
            estimatedDuration: '3-4 weeks',
            proposalMessage: 'Expert in React and Node.js. I can start immediately and provide daily progress updates.',
            status: 'accepted',
            createdAt: new Date('2024-04-01').toISOString(),
        },
        {
            jobId: 16,
            freelancerId: 15,
            bidAmount: 3100.00,
            estimatedDuration: '1 month',
            proposalMessage: 'Full-stack developer ready to take on your project. I ensure clean, maintainable code.',
            status: 'rejected',
            createdAt: new Date('2024-04-02').toISOString(),
        },

        // Job 17 - Copywriting (budget: 350, pending)
        {
            jobId: 17,
            freelancerId: 17,
            bidAmount: 320.00,
            estimatedDuration: '5-7 days',
            proposalMessage: 'Professional content writer with SEO expertise. I\'ve written 100+ blog posts and can deliver engaging content.',
            status: 'pending',
            createdAt: new Date('2024-04-06').toISOString(),
        },

        // Job 18 - Mobile Testing (budget: 900, in_progress)
        {
            jobId: 18,
            freelancerId: 19,
            bidAmount: 880.00,
            estimatedDuration: '2 weeks',
            proposalMessage: 'QA specialist with mobile testing expertise. I ensure bug-free applications.',
            status: 'accepted',
            createdAt: new Date('2024-04-11').toISOString(),
        },
        {
            jobId: 18,
            freelancerId: 25,
            bidAmount: 950.00,
            estimatedDuration: '2 weeks',
            proposalMessage: 'Experienced QA engineer with automated testing skills. Quality guaranteed!',
            status: 'rejected',
            createdAt: new Date('2024-04-12').toISOString(),
        },

        // Job 19 - Landing Page (budget: 1200, pending)
        {
            jobId: 19,
            freelancerId: 14,
            bidAmount: 1150.00,
            estimatedDuration: '1 week',
            proposalMessage: 'I have 5+ years of experience in web development and have completed similar e-commerce projects. I can deliver high-quality work within your timeline.',
            status: 'pending',
            createdAt: new Date('2024-04-16').toISOString(),
        },
        {
            jobId: 19,
            freelancerId: 28,
            bidAmount: 1250.00,
            estimatedDuration: '10 days',
            proposalMessage: 'Expert in React and Node.js. I can start immediately and provide daily progress updates.',
            status: 'pending',
            createdAt: new Date('2024-04-17').toISOString(),
        },
        {
            jobId: 19,
            freelancerId: 23,
            bidAmount: 1100.00,
            estimatedDuration: '1 week',
            proposalMessage: 'I specialize in UI/UX design and would love to work on your project. I can provide 2 design concepts to choose from.',
            status: 'pending',
            createdAt: new Date('2024-04-18').toISOString(),
        },

        // Job 20 - DevOps Setup (budget: 2200, in_progress)
        {
            jobId: 20,
            freelancerId: 18,
            bidAmount: 2150.00,
            estimatedDuration: '3 weeks',
            proposalMessage: 'DevOps engineer with cloud expertise. I\'ll set up robust CI/CD pipelines for your team.',
            status: 'accepted',
            createdAt: new Date('2024-04-21').toISOString(),
        },
        {
            jobId: 20,
            freelancerId: 26,
            bidAmount: 2300.00,
            estimatedDuration: '3-4 weeks',
            proposalMessage: 'Full-stack developer ready to take on your project. I ensure clean, maintainable code.',
            status: 'rejected',
            createdAt: new Date('2024-04-22').toISOString(),
        },
    ];

    await db.insert(bids).values(sampleBids);
    
    console.log('✅ Bids seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});