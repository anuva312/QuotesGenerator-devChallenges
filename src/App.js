import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [randomQuote, setRandomQuote] = useState();
  const [authorQuotes, setAuthorQuotes] = useState();

  const generateRandomQuote = async function () {
    setAuthorQuotes(false);
    const url = "https://api.quotable.io/random";
    try {
      const response = await (await fetch(url)).json();
      // console.log(response);
      setRandomQuote(response);
    } catch (error) {
      console.error(error);
    }
  };

  const generateAuthorQuotes = async function () {
    const url = `https://api.quotable.io/quotes?author=${randomQuote.author}`;
    setRandomQuote(false);
    try {
      const response = await (await fetch(url)).json();
      // console.log(response.results);
      setAuthorQuotes(response.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    generateRandomQuote();
  }, []);

  return (
    <div className="App">
      <div className="App-header " onClick={() => generateRandomQuote()}>
        <div className="random-button">
          <span>random</span>
          <span className="material-icons">autorenew</span>
        </div>
      </div>
      {randomQuote ? (
        <div>
          <div className="quote-content">{randomQuote.content}</div>
          <div
            className="about-quote-container"
            onClick={() => generateAuthorQuotes()}
          >
            <div className="about">
              <div>{randomQuote.author}</div>
              <div className="quote-tags">{randomQuote.tags.join(", ")}</div>
            </div>
            <div className="show-author-quotes-icon">
              <span className="material-icons">arrow_forward</span>
            </div>
          </div>
        </div>
      ) : authorQuotes ? (
        <div>
          {authorQuotes.map((quote) => (
            <div className="quote-content" key={quote._id}>
              {quote.content}
            </div>
          ))}
        </div>
      ) : (
        <div id="loader"></div>
      )}
    </div>
  );
}

export default App;
