import { apiClient } from './client';
import { IndianStandard } from '../types/standards';
import { VERIFIED_BIS_STANDARDS } from '../data/standardsDatabase';

export interface StandardsQueryFilter {
  category?: string;
  search?: string;
  status?: string;
}

export async function fetchStandards(
  filters: StandardsQueryFilter = {}
): Promise<{ total: number; standards: IndianStandard[] }> {
  try {
    const params = new URLSearchParams();
    if (filters.category && filters.category !== 'ALL') params.append('category', filters.category);
    if (filters.status) params.append('status', filters.status);
    if (filters.search) params.append('search', filters.search);

    const qs = params.toString() ? `?${params.toString()}` : '';
    return await apiClient<{ total: number; standards: IndianStandard[] }>(`/standards${qs}`);
  } catch (error) {
    console.warn('[Standards API] Using verified repository fallback:', error);
    let list = [...VERIFIED_BIS_STANDARDS];
    if (filters.category && filters.category !== 'ALL') {
      list = list.filter((s) => s.category.toLowerCase() === filters.category?.toLowerCase());
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter((s) => s.id.toLowerCase().includes(q) || s.title.toLowerCase().includes(q));
    }
    return { total: list.length, standards: list };
  }
}

export async function fetchStandardById(id: string): Promise<IndianStandard> {
  try {
    return await apiClient<IndianStandard>(`/standards/${encodeURIComponent(id)}`);
  } catch (error) {
    console.warn('[Standards API] Using standard fallback:', error);
    const found = VERIFIED_BIS_STANDARDS.find(
      (s) => s.id.toLowerCase() === id.toLowerCase() || s.bisCatalogueNumber === id
    );
    if (!found) throw new Error(`Standard ${id} not found in repository.`);
    return found;
  }
}
