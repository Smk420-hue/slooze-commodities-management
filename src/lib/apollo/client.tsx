//src/lib/apollo/client.ts

"use client";

import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from '@apollo/client';
import { ReactNode } from 'react';

// Create HTTP link with a placeholder GraphQL endpoint
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || '/api/graphql',
  // For mock purposes, we'll use the Next.js API routes
});

// Configure Apollo Client
export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-first',
    },
    query: {
      fetchPolicy: 'cache-first',
    },
  },
});

// Apollo Provider wrapper component
interface ApolloProviderProps {
  children: ReactNode;
}

export function ApolloProviderWrapper({ children }: ApolloProviderProps) {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}

// For backward compatibility - exporting as default
export default ApolloProviderWrapper;