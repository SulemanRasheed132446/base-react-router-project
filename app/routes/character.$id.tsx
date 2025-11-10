import type { Route } from './+types/character.$id';
import { Client } from '../lib/client';
import { Link } from 'react-router';



export function meta({ data }: Route.MetaArgs) {
  return [
    { title: 'Character - Rick and Morty' },
    { name: 'description', content: 'Rick and Morty character details' },
  ];
}

export default function CharacterDetail({ loaderData }: Route.ComponentProps) {

  return (
    <div className="container mx-auto p-4">
      <Link to="/search" className="text-blue-500 hover:underline mb-4 inline-block">
        ← Back to Search
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            {/* TODO: Display character image */}
            {/* <img src={character?.image} alt={character?.name} className="w-full rounded-lg shadow-lg" /> */}
          </div>

          <div>
            {/* TODO: Display character name as h1 */}
            {/* TODO: Display status, species, gender, type */}
            {/* TODO: Display origin (name, type, dimension) */}
            {/* TODO: Display location (name, type, dimension) */}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Episodes</h2>
          {/* TODO: Map over character?.episode and display episode info */}
          {/* Show: episode name, episode code (e.g., S01E01) */}
        </div>
      </div>
    </div>
  );
}
