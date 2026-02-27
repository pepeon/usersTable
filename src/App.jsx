import { useState, useCallback } from "react";
import { useUsers } from "./hooks/useUsers";

import Filters from "./components/Filters";
import UsersTable from "./components/UsersTable";
import Pagination from "./components/Pagination";
import UserModal from "./components/UserModal";
export default function App() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sort, setSort] = useState({ field: null, order: null });
  const [filters, setFilters] = useState({ search: "" });
  const [selectedUser, setSelectedUser] = useState(null);

  const { users, total, loading, error } = useUsers({
    page,
    limit,
    sort,
    filters,
  });

  const handleSort = useCallback((field) => {
    setSort((prev) => {
      if (prev.field !== field) return { field, order: "asc" };
      if (prev.order === "asc") return { field, order: "desc" };
      return { field: null, order: null };
    });
  }, []);
  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
    setPage(1);
  }, []);

  return (
    <div className="wrapper">
      <h1>Users Table</h1>

      <Filters filters={filters} onChange={handleFiltersChange} />

      {loading && <p>Загрузка...</p>}
      {error && <p className="error">{error}</p>}

      <UsersTable
        users={users}
        sort={sort}
        onSort={handleSort}
        onRowClick={setSelectedUser}
      />

      <Pagination
        page={page}
        total={total}
        limit={limit}
        onPageChange={setPage}
      />

      {selectedUser && (
        <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
}
