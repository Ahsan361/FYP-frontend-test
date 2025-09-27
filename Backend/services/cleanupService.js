import cron from 'node-cron';
import User from '../models/User.js';

class CleanupService {
  constructor() {
    this.startCleanupJob();
  }

  startCleanupJob() {
    // Run cleanup every hour
    cron.schedule('0 * * * *', async () => {
      await this.cleanupUnverifiedUsers();
    });

    console.log('🧹 Cleanup job started - runs every hour');
  }

  async cleanupUnverifiedUsers() {
    try {
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      
      const result = await User.deleteMany({
        email_verified: false,
        created_at_unverified: { $lt: oneDayAgo }
      });

      if (result.deletedCount > 0) {
        console.log(`🗑️  Cleaned up ${result.deletedCount} unverified users older than 24 hours`);
      }
    } catch (error) {
      console.error('❌ Error in cleanup job:', error);
    }
  }

  // Manual cleanup method for testing
  async runManualCleanup() {
    await this.cleanupUnverifiedUsers();
  }
}

export default new CleanupService();