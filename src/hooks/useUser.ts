import { useEffect, useState } from "react";
import { fetchUser } from "../api";
import { type User, type HookState } from "../types";

export const useUser = (): HookState<User> => {
  const [state, setState] = useState<HookState<User>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    fetchUser()
      .then((user) => setState({ data: user, loading: false, error: null }))
      .catch((err) =>
        setState({ data: null, loading: false, error: err.message })
      );
  }, []);

  return state;
};
