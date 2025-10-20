import { useEffect, useState } from "react";
import { fetchWallet } from "../api";
import { type Wallet, type HookState } from "../types";

export const useWallet = (): HookState<Wallet> => {
  const [state, setState] = useState<HookState<Wallet>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    fetchWallet()
      .then((wallet) => setState({ data: wallet, loading: false, error: null }))
      .catch((err) =>
        setState({ data: null, loading: false, error: err.message })
      );
  }, []);

  return state;
};
