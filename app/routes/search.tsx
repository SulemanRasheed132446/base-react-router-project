
import type { Route } from "./+types/search";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Search() {
 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Search Rick and Morty Characters</h1>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search characters..."
            className="flex-1 px-4 py-2 border rounded"
            // TODO: Add value and onChange handler
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </form>

     

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
       
      </div>
    </div>
  );
}
