import { useEffect, useState } from "react";
import { fetchTransactions } from "../api";
import { type Transaction, type HookState } from "../types";

export const useTransactions = (): HookState<Transaction[]> => {
  const [state, setState] = useState<HookState<Transaction[]>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    fetchTransactions()
      .then((txs) => setState({ data: txs, loading: false, error: null }))
      .catch((err) =>
        setState({ data: null, loading: false, error: err.message })
      );
  }, []);

  return state;
};
