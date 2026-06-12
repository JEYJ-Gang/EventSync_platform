export default function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Recherche d'évènements"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border rounded-xl px-4 py-2 w-150"
    />
  );
}