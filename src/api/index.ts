import { type User } from "../types";
import { type Wallet } from "../types";
import { type Transaction } from "../types";

const BASE_URL = "https://fe-task-api.mainstack.io";

export const fetchUser = async (): Promise<User> => {
  const res = await fetch(`${BASE_URL}/user`);
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
};

export const fetchWallet = async (): Promise<Wallet> => {
  const res = await fetch(`${BASE_URL}/wallet`);
  if (!res.ok) throw new Error("Failed to fetch wallet");
  return res.json();
};

export const fetchTransactions = async (): Promise<Transaction[]> => {
  const res = await fetch(`${BASE_URL}/transactions`);
  if (!res.ok) throw new Error("Failed to fetch transactions");
  return res.json();
};
