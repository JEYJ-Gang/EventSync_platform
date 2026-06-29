export default function SearchBar({ search, setSearch }) {
  return (
      <div className="search-bar">
        <input
            type="text"
            placeholder="Rechercher un événement, une session..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
        />
        <span className="search-live text-xs text-[#22c55e] font-medium tracking-wide uppercase">
        Live
      </span>
      </div>
  );
}