/**
 * RevenueCat integration for EasyBee Premium subscriptions.
 *
 * Uses @revenuecat/purchases-capacitor for IAP.
 * On web, falls back to local subscription state.
 * On iOS/Android, connects to real StoreKit/Google Play via RevenueCat.
 *
 * RevenueCat Dashboard Setup:
 * 1. Entitlement: "EasyBee Pro"
 * 2. Products: monthly ($9.99), 6-month ($34.99), annual ($59.99)
 * 3. Offering: "default" with all 3 products
 */

import { Capacitor } from '@capacitor/core';
import { setPremium, getSubscription } from './subscription';

const REVENUECAT_API_KEY = 'test_GZjgHpVUYiGLFZVOFpwcvoAkqbG';
const ENTITLEMENT_ID = 'EasyBee Pro';

function isNative(): boolean {
  return Capacitor.isNativePlatform() && !!REVENUECAT_API_KEY;
}

/**
 * Initialize RevenueCat SDK. Call once on app startup.
 */
export async function initRevenueCat(userId?: string): Promise<void> {
  if (!isNative()) {
    console.log('[RevenueCat] Skipping init — web mode');
    return;
  }

  try {
    const { Purchases, LOG_LEVEL } = await import('@revenuecat/purchases-capacitor');

    await Purchases.setLogLevel({ level: LOG_LEVEL.DEBUG });
    await Purchases.configure({
      apiKey: REVENUECAT_API_KEY,
      appUserID: userId || undefined,
    });

    console.log('[RevenueCat] Initialized');
    await syncSubscriptionStatus();
  } catch (e) {
    console.error('[RevenueCat] Init failed:', e);
  }
}

/**
 * Check and sync subscription status from RevenueCat.
 */
export async function syncSubscriptionStatus(): Promise<boolean> {
  if (!isNative()) return getSubscription().isPremium;

  try {
    const { Purchases } = await import('@revenuecat/purchases-capacitor');
    const { customerInfo } = await Purchases.getCustomerInfo();

    const isPremium = customerInfo.entitlements.active[ENTITLEMENT_ID] !== undefined;
    setPremium(isPremium);
    return isPremium;
  } catch (e) {
    console.error('[RevenueCat] Status check failed:', e);
    return getSubscription().isPremium;
  }
}

/**
 * Present the native RevenueCat paywall (designed in dashboard).
 * Falls back to purchasePackage if paywall UI not available.
 */
export async function presentNativePaywall(): Promise<boolean> {
  if (!isNative()) {
    setPremium(true);
    return true;
  }

  try {
    const { RevenueCatUI, PAYWALL_RESULT } = await import('@revenuecat/purchases-capacitor-ui');
    const { result } = await RevenueCatUI.presentPaywall();

    switch (result) {
      case PAYWALL_RESULT.PURCHASED:
      case PAYWALL_RESULT.RESTORED:
        await syncSubscriptionStatus();
        return true;
      default:
        return false;
    }
  } catch (e) {
    console.warn('[RevenueCat] Native paywall failed, falling back to package purchase:', e);
    return purchasePremium();
  }
}

/**
 * Purchase the premium subscription via package selection.
 */
export async function purchasePremium(packageType?: 'monthly' | 'annual' | 'sixMonth'): Promise<boolean> {
  if (!isNative()) {
    setPremium(true);
    return true;
  }

  try {
    const { Purchases } = await import('@revenuecat/purchases-capacitor');
    const { offerings } = await Purchases.getOfferings();

    if (!offerings.current) {
      console.error('[RevenueCat] No current offering');
      return false;
    }

    // Select package based on type
    const pkg = packageType === 'annual' ? offerings.current.annual
      : packageType === 'sixMonth' ? offerings.current.sixMonth
      : offerings.current.monthly;

    if (!pkg) {
      console.error(`[RevenueCat] No ${packageType || 'monthly'} package found`);
      return false;
    }

    const { customerInfo } = await Purchases.purchasePackage({ aPackage: pkg });
    const isPremium = customerInfo.entitlements.active[ENTITLEMENT_ID] !== undefined;
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
  if (!isNative()) return getSubscription().isPremium;

  try {
    const { Purchases } = await import('@revenuecat/purchases-capacitor');
    const { customerInfo } = await Purchases.restorePurchases();

    const isPremium = customerInfo.entitlements.active[ENTITLEMENT_ID] !== undefined;
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
  if (!isNative()) return;

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
  if (!isNative()) return;

  try {
    const { Purchases } = await import('@revenuecat/purchases-capacitor');
    await Purchases.logOut();
  } catch (e) {
    console.error('[RevenueCat] Logout failed:', e);
  }
}
