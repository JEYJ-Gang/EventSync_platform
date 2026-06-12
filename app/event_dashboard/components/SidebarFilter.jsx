"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarFilter({ filter, setFilter }) {

  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen p-6  ">

      <div className="flex flex-col gap-2">

        {/* Lien toujours visible */}
        <Link
          href="/event_dashboard"
          className="text-2xl font-bold mb-6"
        >
          Events
        </Link>

        {/* Filtres visibles seulement sur event_dashboard */}
        {pathname === "/event_dashboard" && (
          <>


            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-3 rounded-xl text-left ${filter === "all"
                ? "bg-black text-white"
                : "hover:bg-gray-100"
                }`}>
              Tous
            </button>

            <button onClick={() => setFilter("today")}
              className={`px-4 py-3 rounded-xl text-left ${filter === "today"
                ? "bg-black text-white"
                : "hover:bg-gray-100"
                }`}>
              Aujourd`hui
            </button>

            <button onClick={() => setFilter("week")}
              className={`px-4 py-3 rounded-xl text-left ${filter === "week"
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
                }`}>
              Cette semaine
            </button>

            <button className="text-left px-4 py-3 rounded-xl hover:bg-gray-100">
              Live
            </button>
          </>
        )}

      </div>

    </aside>
  );
}