import { useState } from "react";
import { Link } from "react-router";
import type { Route } from "~/+types/search";
import useSearch from "~/hooks/useSearch";

export async function loader() {
  return null;
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Rick and Morty Character Search" },
    { name: "description", content: "Search for characters from Rick and Morty" },
  ];
};

export default function Search({ loaderData }: Route.ComponentProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Update debounced search term after a delay to avoid excessive API calls
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // Clear previous timeout
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(e.target.value);
    }, 300); // 300ms delay

    // Clean up timeout if user continues typing
    return () => clearTimeout(timeoutId);
  };

  const { data, isLoading, isError, error } = useSearch({
    name: debouncedSearchTerm,
  });

  const characters = data?.characters?.results || [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Rick and Morty Character Search</h1>

      <div className="max-w-md mx-auto mb-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setDebouncedSearchTerm(searchTerm);
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search characters..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </form>
      </div>

      {isLoading && (
        <div className="text-center">
          <p className="text-lg">Loading characters...</p>
        </div>
      )}

      {isError && (
        <div className="text-center text-red-500">
          <p className="text-lg">Error loading characters: {error?.message || "Unknown error"}</p>
        </div>
      )}

      {!isLoading && !isError && debouncedSearchTerm && characters.length === 0 && (
        <div className="text-center">
          <p className="text-lg">No characters found for "{debouncedSearchTerm}"</p>
        </div>
      )}

      {!isLoading && !isError && characters.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {characters.map((character) => (
            character && (
              <Link
                key={character.id}
                to={`/character/${character.id}`}
                className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
              >
                <img
                  src={character.image || "/placeholder-image.jpg"}
                  alt={character.name || "Character"}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder-image.jpg"; // Fallback image
                  }}
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-1">{character.name}</h2>
                  <p className="text-gray-600 mb-1">Status: {character.status}</p>
                  <p className="text-gray-600 mb-1">Species: {character.species}</p>
                  <p className="text-gray-600">Gender: {character.gender}</p>
                </div>
              </Link>
            )
          ))}
        </div>
      )}
    </div>
  );
}
