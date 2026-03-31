/**
 * EasyBee Content — Phase 2 split architecture
 * Each class lives in its own file under lib/content/nail-salon/
 * To add a module: create a new folder, import classes here, add to modules[]
 * See CLAUDE.md and CONTENT_ROADMAP.md for lesson roadmap and generation workflow
 */

import basicCommunication from './content/nail-salon/basic-communication';
import services from './content/nail-salon/services';
import difficultSituations from './content/nail-salon/difficult-situations';
import dailyLife from './content/nail-salon/daily-life';
import nailCareTechniques from './content/nail-salon/nail-care-techniques';
import moneyTips from './content/nail-salon/money-tips';
import buildingRelationships from './content/nail-salon/building-relationships';
import pmuConsultation from './content/permanent-makeup/consultation';
import pmuDuringProcedure from './content/permanent-makeup/during-procedure';
import pmuAftercare from './content/permanent-makeup/aftercare';
import pmuPricingBusiness from './content/permanent-makeup/pricing-business';
import pmuProblemSituations from './content/permanent-makeup/problem-situations';
import groceryStore from './content/shopping-errands/grocery-store';
import pharmacy from './content/shopping-errands/pharmacy';
import clothingShopping from './content/shopping-errands/clothing-shopping';
import bankPostOffice from './content/shopping-errands/bank-post-office';
import atTheDoctor from './content/healthcare/at-the-doctor';
import atTheDentist from './content/healthcare/at-the-dentist';
import emergencyPhrases from './content/healthcare/emergency-phrases';
import schoolKids from './content/community/school-kids';
import neighborsBuilding from './content/community/neighbors-building';
import restaurants from './content/community/restaurants';

// ─── Re-export types ──────────────────────────────────────────────────────────
export type { DrillCard, Lesson, Class, Module, CEFRLevel } from './content/types';

// ─── Modules ─────────────────────────────────────────────────────────────────
export const modules: import('./content/types').Module[] = [
  {
    id: 'nail-salon',
    title: 'Nail Salon English',
    titleVi: 'Tiếng Anh Tại Tiệm Nail',
    classes: [
      basicCommunication,
      services,
      difficultSituations,
      dailyLife,
      nailCareTechniques,
      moneyTips,
      buildingRelationships,
    ],
  },
  {
    id: 'permanent-makeup',
    title: 'Permanent Makeup English',
    titleVi: 'Tiếng Anh Phun Xăm Thẩm Mỹ',
    classes: [
      pmuConsultation,
      pmuDuringProcedure,
      pmuAftercare,
      pmuPricingBusiness,
      pmuProblemSituations,
    ],
  },
  {
    id: 'shopping-errands',
    title: 'Shopping & Errands',
    titleVi: 'Mua Sắm Và Việc Vặt',
    classes: [
      groceryStore,
      pharmacy,
      clothingShopping,
      bankPostOffice,
    ],
  },
  {
    id: 'healthcare',
    title: 'Healthcare English',
    titleVi: 'Tiếng Anh Y Tế',
    classes: [
      atTheDoctor,
      atTheDentist,
      emergencyPhrases,
    ],
  },
  {
    id: 'community',
    title: 'Community & Daily Life',
    titleVi: 'Cộng Đồng Và Cuộc Sống',
    classes: [
      schoolKids,
      neighborsBuilding,
      restaurants,
    ],
  },
];

// Convenience flat list
export const classes: import('./content/types').Class[] = modules.flatMap(m => m.classes);
