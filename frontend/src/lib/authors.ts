// Author / editorial desk profiles for blog posts.
// Each post may override any field via per-post props on BlogPost; these are
// defaults so that every byline resolves to a named role + bio (E-E-A-T).
//
// Replace these placeholder bios with real team members' credentials. Keep the
// team-name keys stable so existing posts don't lose their default profile.

export interface AuthorProfile {
  name: string;
  role: string;
  credentials: string;
  bio: string;
  photo?: string;
  knowsAbout: string[];
}

export const DEFAULT_AUTHOR_PHOTO = '/images/team.jpg';

export const authorProfiles: Record<string, AuthorProfile> = {
  'GURU Credits Team': {
    name: 'GURU Credits Team',
    role: 'Editorial collective',
    credentials: 'Loan consultants, CCRIS/CTOS specialists, and Malaysian banking analysts',
    bio:
      'Collective byline for articles written, reviewed, and maintained by the GURU Credits consulting team. Every article is reviewed by a senior loan consultant before publication.',
    knowsAbout: [
      'Malaysian personal finance',
      'CCRIS analysis',
      'CTOS reporting',
      'Debt-service ratio',
      'Bank loan eligibility',
    ],
  },
  'GURU Credits Research': {
    name: 'GURU Credits Research',
    role: 'Research desk',
    credentials: 'Internal research group covering Malaysian lending markets and BNM policy',
    bio:
      'The research desk aggregates public data from Bank Negara Malaysia, AKPK, Department of Statistics, and bank rate sheets. Findings are peer-reviewed before publication.',
    knowsAbout: ['Bank Negara Malaysia policy', 'Interest rate analysis', 'Market data'],
  },
  'Policy Desk': {
    name: 'Policy Desk',
    role: 'Regulatory & policy analyst',
    credentials: 'Tracks BNM guidelines, AKPK updates, and Malaysian consumer-finance legislation',
    bio:
      'The policy desk watches regulatory announcements from Bank Negara Malaysia, AKPK, and the Ministry of Finance and translates them into plain-language guidance for borrowers.',
    knowsAbout: ['BNM guidelines', 'AKPK programmes', 'Consumer credit regulation'],
  },
  'Data Insights Lab': {
    name: 'Data Insights Lab',
    role: 'Quantitative analyst',
    credentials: 'Analyses approval patterns across anonymised client records and public datasets',
    bio:
      'The insights lab cross-references GURU Credits anonymised case data (1,000+ consultations) with public BNM and DOSM datasets to surface approval patterns and rejection drivers.',
    knowsAbout: ['Approval rate analysis', 'DSR benchmarks', 'Rejection pattern analysis'],
  },
  'Credit Coaching Team': {
    name: 'Credit Coaching Team',
    role: 'Senior credit coaches',
    credentials: 'Specialise in CCRIS/CTOS dispute resolution and credit repair strategies',
    bio:
      'The credit coaching team works one-on-one with borrowers recovering from CCRIS issues, late markers, or AKPK enrolment — with an average 90-day profile-improvement plan.',
    knowsAbout: ['CCRIS dispute resolution', 'Credit repair', 'Late marker recovery'],
  },
  'Financial Wellness Desk': {
    name: 'Financial Wellness Desk',
    role: 'Personal finance editors',
    credentials: 'Covers household budgeting, debt consolidation strategy, and long-term planning',
    bio:
      'The financial wellness desk focuses on borrower-side decisions: when to consolidate, when to refinance, and how to build buffers before taking on new credit.',
    knowsAbout: ['Debt consolidation', 'Household budgeting', 'Refinancing strategy'],
  },
};

const FALLBACK_PROFILE: AuthorProfile = {
  name: 'GURU Credits Editorial',
  role: 'Editorial',
  credentials: 'Reviewed by GURU Credits senior consultants',
  bio:
    'Authored by the GURU Credits editorial team. Reviewed by a senior loan consultant prior to publication.',
  knowsAbout: ['Malaysian lending', 'Loan eligibility'],
};

export function getAuthorProfile(name: string): AuthorProfile {
  return authorProfiles[name] ?? { ...FALLBACK_PROFILE, name };
}
