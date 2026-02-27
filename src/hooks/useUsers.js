import { useEffect, useState } from "react";
import { getUsers } from "../api/usersApi";

export function useUsers({ page, limit, sort, filters }) {
  const [state, setState] = useState({
    users: [],
    total: 0,
    loading: false,
    error: null,
  });

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      try {
        setState((prev) => ({
          ...prev,
          loading: true,
        }));

        const data = await getUsers({ page, limit, sort, filters });

        if (!ignore) {
          setState((prev) => ({
            ...prev,
            total: data.total,
            users: data.users,
          }));
        }
      } catch (err) {
        if (!ignore)
          setState((prev) => ({
            ...prev,
            error: err.message,
          }));
      } finally {
        if (!ignore)
          setState((prev) => ({
            ...prev,
            loading: false,
          }));
      }
    }

    fetchData();

    return () => (ignore = true);
  }, [page, limit, sort, filters]);

  return state;
}
