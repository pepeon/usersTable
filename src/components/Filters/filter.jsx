import { useState, useEffect, memo } from "react";
import { useDebounce } from "./useDebounce";
import styles from "./filters.module.css";

export default memo(function Filters({ filters, onChange }) {
  const [search, setSearch] = useState(filters.search);
  const debounced = useDebounce(search, 500);

  useEffect(() => {
    onChange({ search: debounced });
  }, [debounced, onChange]);

  return (
    <div className={styles.filters}>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Поиск..."
      />
    </div>
  );
});
