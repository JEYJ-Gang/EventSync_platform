export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between p-4 border-b">
      <h1 className="text-2xl font-bold">
        EventSync
      </h1>

      <button className="border px-4 py-2 rounded-lg">
        About
      </button>
    </nav>
  );
}