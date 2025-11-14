import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
  useQuery,
} from "@tanstack/react-query";
import { Client } from "~/lib/client";
import type { Route } from "~/+types/character.$id";

// const characterQuery = (id: string) => ({
//   queryKey: ["character", id],
//   queryFn: () => Client.getCharacter({ id }).queryFn(),
// });

// ------------------------
// 🚀 SERVER LOADER (SSR)
// ------------------------

export async function loader({ params }: Route.LoaderArgs) {
  const { id } = params;
  if (!id) throw new Error("Character ID is required");

  const queryClient = new QueryClient();

  try {
    // Ensures that the character data is fetched on the server
    await queryClient.ensureQueryData(Client.getCharacter({ id }));

    // Dehydrate the entire cache → client will hydrate it
    return {
      dehydratedState: dehydrate(queryClient),
      id,
    };
  } catch (error) {
    console.error("Error fetching character:", error);
    throw error;
  }
}

// ------------------------
// 🔥 META TAGS USING SSR DATA
// ------------------------

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Character Not Found" }];

  const queryData = data.dehydratedState?.queries?.[0]?.state?.data;
  const character = queryData?.character;

  if (!character) {
    return [
      { title: "Character Not Found" },
      { name: "description", content: "Character not found" },
    ];
  }

  return [
    { title: `${character.name} - Rick and Morty Character` },
    {
      name: "description",
      content: `Details about ${character.name}. Status: ${character.status}, Species: ${character.species}.`,
    },
    { property: "og:title", content: `${character.name} - Rick and Morty Character` },
    {
      property: "og:description",
      content: `Details about ${character.name}. Status: ${character.status}, Species: ${character.species}.`,
    },
    { property: "og:image", content: character.image || "" },
  ];
};

// ------------------------
// 🚀 COMPONENT (CSR + SSR hydrated)
// ------------------------

export default function CharacterDetail({ loaderData }: Route.ComponentProps) {
  const { dehydratedState, id } = loaderData;

  return (
    <HydrationBoundary state={dehydratedState}>
      <CharacterDetailContent id={id} />
    </HydrationBoundary>
  );
}

function CharacterDetailContent({ id }: { id: string }) {
  const { data } = useQuery(Client.getCharacter({ id }));
  const character = data?.character;

  if (!character) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Character Not Found</h1>
        <p>The requested character could not be found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 flex justify-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        {/* IMAGE */}
        <div className="flex justify-center mb-6">
          <img
            src={character.image || "/placeholder-image.jpg"}
            alt={character.name}
            className="w-48 h-48 rounded-xl object-cover shadow-md"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder-image.jpg";
            }}
          />
        </div>

        {/* NAME */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          {character.name}
        </h1>

        {/* DETAILS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-gray-700 mb-8">
          <p><span className="font-semibold">Status:</span> {character.status}</p>
          <p><span className="font-semibold">Species:</span> {character.species}</p>
          {character.type && <p><span className="font-semibold">Type:</span> {character.type}</p>}
          <p><span className="font-semibold">Gender:</span> {character.gender}</p>
          <p>
            <span className="font-semibold">Created:</span>{" "}
            {new Date(character.created).toLocaleDateString()}
          </p>
        </div>

        {/* ORIGIN */}
        {character.origin && (
          <div className="mb-8 pb-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Origin</h2>
            <div className="space-y-1 text-gray-700">
              <p><span className="font-semibold">Name:</span> {character.origin.name}</p>
              {character.origin.type && (
                <p><span className="font-semibold">Type:</span> {character.origin.type}</p>
              )}
              {character.origin.dimension && (
                <p><span className="font-semibold">Dimension:</span> {character.origin.dimension}</p>
              )}
            </div>
          </div>
        )}

        {/* LOCATION */}
        {character.location && (
          <div className="mb-8 pb-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Location</h2>
            <div className="space-y-1 text-gray-700">
              <p><span className="font-semibold">Name:</span> {character.location.name}</p>
              {character.location.type && (
                <p><span className="font-semibold">Type:</span> {character.location.type}</p>
              )}
              {character.location.dimension && (
                <p><span className="font-semibold">Dimension:</span> {character.location.dimension}</p>
              )}
            </div>
          </div>
        )}

        {/* EPISODES */}
        {character.episode?.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Episodes</h2>
            <p className="text-gray-700">
              Appears in {character.episode.length} episode
              {character.episode.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ------------------------
// ❌ ERROR BOUNDARY
// ------------------------

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Error Loading Character</h1>
      <p>There was an error loading this character: {error.message}</p>
    </div>
  );
}
