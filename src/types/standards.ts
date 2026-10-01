export type StandardCategory = 'Primary Product' | 'Safety' | 'Testing' | 'Terminology' | 'Installation' | 'Material';
export type StandardStatus = 'CURRENT' | 'AMENDED' | 'WITHDRAWN' | 'SUPERSEDED';
export type CertificationType = 'BIS CRS (Compulsory Registration)' | 'ISI Mark Scheme I' | 'Mandatory QCO' | 'Voluntary / Self-Declaration';

export interface ExtractedRequirement {
  id: string;
  category: 'Product' | 'Rating / Power' | 'Environmental / Protection' | 'Safety' | 'Testing' | 'Material' | 'Durability';
  rawText: string;
  normalizedValue: string;
  confidence: number;
}

export interface AlliedRelationship {
  standardId: string;
  relationshipType: 'Safety Requirement' | 'Test Method' | 'Installation Code' | 'Component Spec' | 'Terminology / Symbols' | 'Quality Control Order' | 'Allied Classification';
  description: string;
}

export interface EvidenceClause {
  clauseNumber: string;
  clauseTitle: string;
  clauseExcerpt: string;
  relevanceExplanation: string;
  retrievalScore: number;
}

export interface IndianStandard {
  id: string; // e.g. "IS 10322 (Part 5/Sec 3): 2012"
  bisCatalogueNumber: string;
  title: string;
  department: string; // e.g. "ETD 24 (Illuminating Engineering and Luminaires)"
  category: StandardCategory;
  relationship: 'PRIMARY STANDARD' | 'ALLIED STANDARD';
  status: StandardStatus;
  amendmentCount: number;
  lastAmendmentDate?: string;
  supersededStandard?: string;
  supersededBy?: string;
  mandatoryQCO: boolean;
  certificationScheme: CertificationType;
  gazetteOrderRef?: string;
  confidence: number;
  retrievalScore: number; // e.g. 0.94
  matchType: 'Semantic + BM25 Hybrid' | 'Cross-Encoder Reranked' | 'Knowledge Graph Traversal' | 'Clause Exact Match';
  whyApplies: string;
  matchedRequirements: string[];
  scopeEvidence: string;
  clauses: EvidenceClause[];
  alliedStandards: AlliedRelationship[];
  isVerifiedBIS: boolean;
  publishedYear: number;
  pageCount: number;
}

export interface AnalysisSummary {
  specificationText: string;
  extractedRequirements: ExtractedRequirement[];
  recommendedStandards: IndianStandard[];
  executionTimeMs: number;
  highConfidenceCount: number;
  alliedStandardsCount: number;
  mandatoryCertCount: number;
  timestamp: string;
  auditHash: string;
}

export interface ExamplePreset {
  id: string;
  title: string;
  shortDescription: string;
  sampleText: string;
  domain: string;
}
