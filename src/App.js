import  {useState, useEffect} from 'react'
import './App.scss';
import colors_Array from './colorsArray';
import{FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import{faTwitter} from '@fortawesome/free-brands-svg-icons'
import{faQuoteLeft} from '@fortawesome/free-solid-svg-icons'

function App() {

  const [quote, setQuote]=useState("Life is what happens to you while you are busy making other plans.");
  const [author, setAuthor]=useState("Charles Swindoll");
  const [randomNumber, setRandomNumber]=useState(0);
  const [randomColor, setRandomColor]=useState('#282c34');
  
  
  
const [quotesArray, setQuotesArray]=useState(null);
const fetchQuotes=async (url)=>{
  const response=await fetch(url)
  const parsedJSON=await response.json()
  setQuotesArray(parsedJSON.quotes)
 }
useEffect(()=>{
      fetchQuotes("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
  });

const getRandomQuote=()=>{
    const randomInteger=Math.floor(quotesArray.length*Math.random())
    setRandomNumber(randomInteger);
    setRandomColor(colors_Array[randomInteger]);
    setQuote(quotesArray[randomInteger].quote);
    setAuthor(quotesArray[randomInteger].author);
  }
  return (
    <div className="App-header"  style={{backgroundColor:randomColor}}>
      <div id="quote-box" style={{color:randomColor}} >
          <p id="text"><span id="quote-icon"><FontAwesomeIcon icon={faQuoteLeft} /></span> {quote}</p>
          <p id="author">--{author}</p>
         <div className="buttons">
            <a id="tweet-quote" href={encodeURI(`https://www.twitter.com/intent/tweet?text=${quote}   --${author}`)} style={{backgroundColor:randomColor}}><FontAwesomeIcon icon={faTwitter} /></a>
            <button id="new-quote"onClick={()=>getRandomQuote()} style={{backgroundColor:randomColor}}> New Quote</button>
         </div>
      </div>
   </div>
   
  );
}

export default App;
