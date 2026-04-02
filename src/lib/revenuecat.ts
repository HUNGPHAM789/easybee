/**
 * RevenueCat integration for EasyBee Premium subscriptions.
 * 
 * This module wraps RevenueCat's Capacitor plugin.
 * On web (development), it falls back to local subscription state.
 * On iOS (production), it connects to real StoreKit via RevenueCat.
 * 
 * Setup on Mac:
 * 1. Create RevenueCat account at https://app.revenuecat.com
 * 2. Create project "EasyBee"
 * 3. Add iOS app with bundle ID: com.easybee.english
 * 4. Create product: easybee_premium_monthly (auto-renewable, 7-day trial)
 * 5. Copy API key below
 * 6. Connect to App Store Connect
 */

import { Capacitor } from '@capacitor/core';
import { setPremium, getSubscription } from './subscription';

// RevenueCat API key — set after creating RevenueCat account
const REVENUECAT_API_KEY = ''; // TODO: Add after RevenueCat setup on Mac


/**
 * Initialize RevenueCat SDK.
 * Call once on app startup.
 */
export async function initRevenueCat(userId?: string): Promise<void> {
  if (!Capacitor.isNativePlatform()) {
    console.log('[RevenueCat] Skipping init — not native platform (web dev mode)');
    return;
  }

  if (!REVENUECAT_API_KEY) {
    console.warn('[RevenueCat] No API key set. Subscription features disabled.');
    return;
  }

  try {
    const { Purchases } = await import('@revenuecat/purchases-capacitor');
    
    await Purchases.configure({
      apiKey: REVENUECAT_API_KEY,
      appUserID: userId || undefined,
    });

    console.log('[RevenueCat] Initialized');
    
    // Check current subscription status
    await syncSubscriptionStatus();
  } catch (e) {
    console.error('[RevenueCat] Init failed:', e);
  }
}

/**
 * Check and sync subscription status from RevenueCat.
 */
export async function syncSubscriptionStatus(): Promise<boolean> {
  if (!Capacitor.isNativePlatform() || !REVENUECAT_API_KEY) {
    return getSubscription().isPremium;
  }

  try {
    const { Purchases } = await import('@revenuecat/purchases-capacitor');
    const { customerInfo } = await Purchases.getCustomerInfo();
    
    const isPremium = customerInfo.entitlements.active['premium'] !== undefined;
    setPremium(isPremium);
    return isPremium;
  } catch (e) {
    console.error('[RevenueCat] Status check failed:', e);
    return getSubscription().isPremium;
  }
}

/**
 * Purchase the premium subscription.
 * Shows the native StoreKit payment sheet.
 */
export async function purchasePremium(): Promise<boolean> {
  if (!Capacitor.isNativePlatform() || !REVENUECAT_API_KEY) {
    // Web fallback: just set premium locally (for testing)
    setPremium(true);
    return true;
  }

  try {
    const { Purchases } = await import('@revenuecat/purchases-capacitor');
    
    // Get available packages
    const { offerings } = await Purchases.getOfferings();
    const monthlyPackage = offerings.current?.monthly;
    
    if (!monthlyPackage) {
      console.error('[RevenueCat] No monthly package found');
      return false;
    }

    // Purchase
    const { customerInfo } = await Purchases.purchasePackage({ aPackage: monthlyPackage });
    const isPremium = customerInfo.entitlements.active['premium'] !== undefined;
    setPremium(isPremium);
    return isPremium;
  } catch (e: any) {
    if (e.code === '1' || e.message?.includes('cancelled')) {
      console.log('[RevenueCat] Purchase cancelled by user');
      return false;
    }
    console.error('[RevenueCat] Purchase failed:', e);
    return false;
  }
}

/**
 * Restore previous purchases (e.g., after reinstall).
 */
export async function restorePurchases(): Promise<boolean> {
  if (!Capacitor.isNativePlatform() || !REVENUECAT_API_KEY) {
    return getSubscription().isPremium;
  }

  try {
    const { Purchases } = await import('@revenuecat/purchases-capacitor');
    const { customerInfo } = await Purchases.restorePurchases();
    
    const isPremium = customerInfo.entitlements.active['premium'] !== undefined;
    setPremium(isPremium);
    return isPremium;
  } catch (e) {
    console.error('[RevenueCat] Restore failed:', e);
    return false;
  }
}

/**
 * Identify user with RevenueCat (call after login).
 */
export async function identifyUser(userId: string): Promise<void> {
  if (!Capacitor.isNativePlatform() || !REVENUECAT_API_KEY) return;

  try {
    const { Purchases } = await import('@revenuecat/purchases-capacitor');
    await Purchases.logIn({ appUserID: userId });
    await syncSubscriptionStatus();
  } catch (e) {
    console.error('[RevenueCat] Identify failed:', e);
  }
}

/**
 * Log out from RevenueCat (call on sign out).
 */
export async function logOutRevenueCat(): Promise<void> {
  if (!Capacitor.isNativePlatform() || !REVENUECAT_API_KEY) return;

  try {
    const { Purchases } = await import('@revenuecat/purchases-capacitor');
    await Purchases.logOut();
  } catch (e) {
    console.error('[RevenueCat] Logout failed:', e);
  }
}
