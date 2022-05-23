import React, { createContext, useContext, useEffect, useState } from 'react';

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState('INR');
  const [symbol, setSymbol] = useState('₹');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (currency === 'INR') setSymbol('₹');
    else if (currency === 'USD') setSymbol('$');
  }, [currency]);

  return (
    <Crypto.Provider value={{ currency, setCurrency, symbol, page, setPage }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
