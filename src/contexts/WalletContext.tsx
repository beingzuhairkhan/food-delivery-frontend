import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface WalletContextType {
  balance: number;
  addFunds: (amount: number) => void;
  canAfford: (amount: number) => boolean;
  spend: (amount: number) => boolean;
  setBalance: (amount: number) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const STORAGE_KEY = 'walletBalance';

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [balance, setBalanceState] = useState<number>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored == null) return 0;
      const val = Number(stored);
      return Number.isFinite(val) ? val : 0;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(balance));
    } catch {
      // ignore write errors
    }
  }, [balance]);

  const addFunds = (amount: number) => {
    if (amount <= 0) return;
    setBalanceState((b) => b + amount);
  };

  const canAfford = (amount: number) => balance >= amount;

  const spend = (amount: number) => {
    if (amount <= 0) return true;
    if (balance < amount) return false;
    setBalanceState((b) => b - amount);
    return true;
  };

  const setBalance = (amount: number) => setBalanceState(Math.max(0, amount));

  const value = useMemo(
    () => ({ balance, addFunds, canAfford, spend, setBalance }),
    [balance]
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export const useWallet = () => {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error('useWallet must be used within a WalletProvider');
  return ctx;
};
