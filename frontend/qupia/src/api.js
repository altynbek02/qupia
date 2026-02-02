export const getQuote = async () => {
  const res = await fetch("http://127.0.0.1:8000/crypter");
  return res.json();
};

