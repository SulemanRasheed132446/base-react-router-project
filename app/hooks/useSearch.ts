import { useState } from 'react';
import { Client } from '../lib/client';
import { type SearchCharactersQuery } from '../generated/graphql';

/**
 * Custom hook for searching Rick and Morty characters
 * TODO: Implement state management for data, loading, and error
 * TODO: Implement search function that calls Client.search()
 * TODO: Return { data, loading, error, search }
 */
export function useSearch() {
  const search = async (name: string, page?: number) => {
    throw new Error('useSearch.search not implemented');
  };

  return {
    data: null as SearchCharactersQuery | null,
    loading: false,
    error: null as Error | null,
    search,
  };
}
