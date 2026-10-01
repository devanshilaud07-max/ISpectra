import { apiClient } from './client';
import { AnalysisSummary } from '../types/standards';
import { analyzeSpecification as fallbackAnalyzer } from '../services/analyzer';

export async function requestSpecificationAnalysis(text: string): Promise<AnalysisSummary> {
  try {
    const data = await apiClient<AnalysisSummary>('/analyze', {
      method: 'POST',
      body: JSON.stringify({ text })
    });
    return data;
  } catch (error) {
    console.warn('[Analysis API] Falling back to client-side engine:', error);
    // Reliable fallback ensuring zero downtime if server API is cold
    return fallbackAnalyzer(text);
  }
}

export async function uploadTenderDocument(
  fileContent: string,
  fileName: string
): Promise<AnalysisSummary> {
  try {
    const data = await apiClient<AnalysisSummary>('/upload', {
      method: 'POST',
      body: JSON.stringify({ fileContent, fileName })
    });
    return data;
  } catch (error) {
    console.warn('[Upload API] Falling back to client-side engine:', error);
    return fallbackAnalyzer(fileContent);
  }
}
