import { useEffect, useState } from "react";
import { getQuote } from "./api";
import QuoteGrid from "./components/QuoteGrid";

function App() {

  const [quote, setQuote] = useState("");
  const [hints, setHints] = useState("");
  const [check, setCheck] = useState("");
  

  useEffect(() => {
    getQuote().then(data => {
      console.log(data);
      setQuote(data.result);
      setHints(data.hints);
      setCheck(data.quote);
    });
  }, []);

  return <QuoteGrid quotes={quote} hints={hints} result={check}/>;
  
}

export default App;
