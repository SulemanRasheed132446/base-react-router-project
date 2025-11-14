import { useQuery } from "@tanstack/react-query";
import { Client } from "~/lib/client";

interface UseSearchProps {
  name: string;
  page?: number;
}

export default function useSearch({ name, page }: UseSearchProps) {
  // Only perform search when name is provided

  return useQuery({
    ...Client.search({ 
      name, 
      page: page || 1 
    }),
    enabled:name.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}