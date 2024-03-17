
const quoteContainer = document.getElementById('Quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('Author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('New-Quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// showing loading
function loading(){
    loader.hidden= false;
    quoteContainer.hidden= true;

}
// hide loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
    
}

function newQuote() {
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    // Check if author name is blank, replace it with "Unknown"
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    
    // Check the length of the quote to determine the styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
// set the quote, hide loader
    quoteText.textContent = quote.text;
    complete();
}

async function getQuotes() {  
    loading();
    const apiUrl = 'https://type.fit/api/quotes'; 

    try {
        const response = await fetch(apiUrl);  
        apiQuotes = await response.json(); //  //means we are getting the deta as a response which is string and we are turing this       response into a json object and passed that into the "apiQuotes" which is global variable
        newQuote();
    } catch(error) {
        //console.error('Error fetching quotes:', error); fetch error here
    }
}

//Twitte quote
function tweetQuote(){
    const twitterUrl= `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')

}
// event listiner
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote)

// On Load
getQuotes();
