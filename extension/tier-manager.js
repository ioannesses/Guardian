/**
 * GuardianAI Tier Manager
 * Handles feature unlocking and usage limits based on subscription tier.
 */

const GuardianTiers = {
    TIERS: {
        FREE: 'guardian_lite',
        PRO: 'guardian_pro',
        FAMILY: 'family_shield',
        ENTERPRISE: 'enterprise_protocol'
    },

    // Default to FREE for new users
    currentTier: 'guardian_lite',

    // Usage counters (Simulated/Local)
    usage: {
        videoChecks: 0
    },

    getLimits() {
        switch (this.currentTier) {
            case this.TIERS.PRO: return { videos: 5000, predatorDetection: true };
            case this.TIERS.FAMILY: return { videos: 10000, predatorDetection: true };
            case this.TIERS.ENTERPRISE: return { videos: Infinity, predatorDetection: true };
            default: return { videos: 10, predatorDetection: false };
        }
    },

    canPerformAction(action) {
        const limits = this.getLimits();
        if (action === 'video_check') {
            return this.usage.videoChecks < limits.videos;
        }
        if (action === 'predator_detection') {
            return limits.predatorDetection;
        }
        return true;
    },

    incrementUsage(action) {
        if (action === 'video_check') {
            this.usage.videoChecks++;
        }
    },

    setTier(tierKey) {
        if (Object.values(this.TIERS).includes(tierKey)) {
            this.currentTier = tierKey;
            console.log(`🛡️ Tier changed to: ${tierKey}`);
            return true;
        }
        return false;
    }
};

if (typeof module !== 'undefined') {
    module.exports = GuardianTiers;
}
