import React from "react";
import SearchBar from "./SearchBar";
import BookCounter from "./BookCounter";
import StatusPieChart from "./StatusPieChart";

function Sidebar({ search, setSearch, books, genre, setGenre }) {
  return (
    <aside className="sidebar">

      {}
      <div className="sidebar-section">
        <SearchBar search={search} setSearch={setSearch} />
      </div>

      {}
      <div className="sidebar-section">
        <h4>Filter: Genre</h4>

        <div className="genre-filter-sidebar">
          {["All", "Romance", "Fantasy", "Classic", "Science"].map((g) => (
            <button
              key={g}
              className={`filter-btn ${genre === g ? "active-filter" : ""}`}
              onClick={() => setGenre(g)}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {}
      <div className="sidebar-section pie-chart-wrapper">
        <h4>Reading Status</h4>
        <StatusPieChart books={books} />
      </div>

      {}
      <div className="sidebar-section total-books">
        <BookCounter count={books.length} />
      </div>

    </aside>
  );
}

export default Sidebar;