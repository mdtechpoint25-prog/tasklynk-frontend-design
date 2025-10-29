import { db } from '@/db';
import { transactions } from '@/db/schema';

async function main() {
    const sampleTransactions = [
        {
            jobId: 2,
            clientId: 1,
            freelancerId: 4,
            amount: 1500.00,
            status: 'completed',
            createdAt: new Date('2024-02-15T14:30:00Z').toISOString(),
        },
        {
            jobId: 5,
            clientId: 2,
            freelancerId: 6,
            amount: 800.00,
            status: 'completed',
            createdAt: new Date('2024-02-18T10:15:00Z').toISOString(),
        },
        {
            jobId: 7,
            clientId: 3,
            freelancerId: 5,
            amount: 3500.00,
            status: 'completed',
            createdAt: new Date('2024-02-20T16:45:00Z').toISOString(),
        },
        {
            jobId: 9,
            clientId: 1,
            freelancerId: 7,
            amount: 450.00,
            status: 'completed',
            createdAt: new Date('2024-02-22T11:20:00Z').toISOString(),
        },
        {
            jobId: 11,
            clientId: 2,
            freelancerId: 4,
            amount: 1200.00,
            status: 'completed',
            createdAt: new Date('2024-02-25T09:30:00Z').toISOString(),
        },
        {
            jobId: 13,
            clientId: 3,
            freelancerId: 6,
            amount: 2800.00,
            status: 'completed',
            createdAt: new Date('2024-02-28T15:00:00Z').toISOString(),
        },
        {
            jobId: 14,
            clientId: 1,
            freelancerId: 5,
            amount: 600.00,
            status: 'completed',
            createdAt: new Date('2024-03-02T13:45:00Z').toISOString(),
        },
        {
            jobId: 16,
            clientId: 2,
            freelancerId: 7,
            amount: 4200.00,
            status: 'completed',
            createdAt: new Date('2024-03-05T10:30:00Z').toISOString(),
        },
        {
            jobId: 18,
            clientId: 3,
            freelancerId: 4,
            amount: 1800.00,
            status: 'completed',
            createdAt: new Date('2024-03-08T14:15:00Z').toISOString(),
        },
        {
            jobId: 19,
            clientId: 1,
            freelancerId: 6,
            amount: 950.00,
            status: 'completed',
            createdAt: new Date('2024-03-10T11:00:00Z').toISOString(),
        },
        {
            jobId: 20,
            clientId: 2,
            freelancerId: 5,
            amount: 3200.00,
            status: 'completed',
            createdAt: new Date('2024-03-12T16:20:00Z').toISOString(),
        },
        {
            jobId: 4,
            clientId: 3,
            freelancerId: 7,
            amount: 1500.00,
            status: 'completed',
            createdAt: new Date('2024-03-14T12:30:00Z').toISOString(),
        },
        {
            jobId: 8,
            clientId: 1,
            freelancerId: 4,
            amount: 800.00,
            status: 'pending',
            createdAt: new Date('2024-03-16T09:45:00Z').toISOString(),
        },
        {
            jobId: 12,
            clientId: 2,
            freelancerId: 6,
            amount: 1400.00,
            status: 'pending',
            createdAt: new Date('2024-03-17T14:00:00Z').toISOString(),
        },
        {
            jobId: 15,
            clientId: 3,
            freelancerId: 5,
            amount: 2200.00,
            status: 'failed',
            createdAt: new Date('2024-03-18T10:30:00Z').toISOString(),
        },
    ];

    await db.insert(transactions).values(sampleTransactions);
    
    console.log('✅ Transactions seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});