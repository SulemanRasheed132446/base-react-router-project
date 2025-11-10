# Task: Rick and Morty Character Search

## Overview
Implement a character search application using the Rick and Morty GraphQL API:
- **Search Page** - Client-side search with React hook
- **Character Detail Page** - Server-side rendered with dynamic meta tags

## Setup
- GraphQL codegen configured
- `graphql-request` installed
- Run `npm run codegen` after creating/modifying GraphQL queries
- API endpoint: `https://rickandmortyapi.com/graphql`

## Requirements

### 1. GraphQL Query
Create a query to fetch a character by ID with all relevant fields.

### 2. GraphQL Client
Implement `Client.search()` and `Client.getCharacter()` using `graphql-request`.

### 3. Search Hook
Create a `useSearch()` hook that returns `{ data, loading, error, search }`.

### 4. Search Page
Client-side search page with a form. Display character cards linking to detail pages.

### 5. Character Detail Page
SSR route with:
- `loader` - Fetch character data server-side
- `meta` - Dynamic meta tags (title, description, og:image)
- Component - Display character details from loader data

## Testing

Start dev server: `npm run dev`

Verify:
- Search functionality works client-side
- Character cards link to detail pages
- Loading and error states display correctly
- SSR working on detail page (check page source)
- Dynamic meta tags present

## Notes

- Use generated TypeScript types
- Search page: client-side only (no loader)
- Character page: SSR with loader and meta function
- Handle errors appropriately (404s, API failures)
