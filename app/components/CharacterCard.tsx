import { Link } from 'react-router';

interface CharacterCardProps {
  id: string | null | undefined;
  name: string | null | undefined;
  image: string | null | undefined;
  status: string | null | undefined;
  species: string | null | undefined;
}

export function CharacterCard({ id, name, image, status, species }: CharacterCardProps) {
  if (!id) return null;

  return (
    <Link
      to={`/character/${id}`}
      className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white"
    >
      <img
        src={image || ''}
        alt={name || 'Character'}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-gray-600">
          <span className="font-semibold">Status:</span> {status}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Species:</span> {species}
        </p>
      </div>
    </Link>
  );
}
