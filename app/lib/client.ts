import { GraphQLClient } from 'graphql-request';
import {
  SearchCharactersDocument,
  type SearchCharactersQuery,
  type SearchCharactersQueryVariables,
  // TODO: Import GetCharacterDocument and types after running codegen
} from '../generated/graphql';

// TODO: Initialize GraphQLClient with the Rick and Morty API endpoint

export const Client = {
  /**
   * Search for characters by name
   * TODO: Implement this method
   */
  search: async (name: string, page?: number) => {
    throw new Error('Client.search not implemented');
  },

  /**
   * Get a single character by ID
   * TODO: Implement this method
   */
  getCharacter: async (id: string) => {
    throw new Error('Client.getCharacter not implemented');
  },
};
