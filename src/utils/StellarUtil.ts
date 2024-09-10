const shortenStellarAddress = (address: string, charsToShow = 5): string => {
  if (!address) return '';
  return `${address.slice(0, charsToShow)}...${address.slice(-charsToShow)}`;
};

export { shortenStellarAddress };
