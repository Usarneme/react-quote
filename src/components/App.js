import React, { Component } from 'react'
import axios from 'axios'
import Quote from './Quote'
// import AllQuotes from './AllQuotes'
import { getRandomNumber } from '../helpers/helperFunctions'
import colorPalette from '../helpers/colorPalette'

import defaultQuotes from '../helpers/default_quotes'
import '../css/style.css'

class App extends Component {
  state = {
    quotes: defaultQuotes,
    currentQuoteNumber: 0,
    currentQuote: ''
  }

  changeBackgroundColor = () => {
    document.body.style = `background: ${colorPalette[Math.floor(Math.random() * Math.floor(colorPalette.length))]};`
  }

  getRandomQuote = () => {
    const randomNumber = getRandomNumber(this.state.quotes.length)
    console.log('getRandomQuote #'+randomNumber+'/'+this.state.quotes.length+' : '+this.state.quotes[randomNumber].quote)
    this.setState({
      currentQuoteNumber: randomNumber,
      currentQuote: this.state.quotes[randomNumber].quote
    })
    this.changeBackgroundColor()
  }

  componentWillMount = () => {
    // will return an Array [] of length posts_per_page, 
    // each post object has a TITLE (author/speaker), ID, CONTENT, and LINK, and optional CUSTOM_META obj containing a SOURCE
    axios.get(`https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=10`)
      .then(res => {
        // set state of quotes with fetched quotations
        this.setState({
          quotes: [...res.data]
        })
      }
    )
  }

  componentDidMount() {
    const { params } = this.props.match
    // Reinstate localStorage
    const localStorageRef = localStorage.getItem(params.cachedQuotes)
    if(localStorageRef) {
      this.setState({
        quotes: localStorageRef
      })
    }
    // initialize by setting a random background color
    this.changeBackgroundColor()
  }

  componentDidUpdate() {
    // Key : Value
    // cachedQuotes : quotes
    localStorage.setItem(this.props.match.params.cachedQuotes, this.state.quotes)
  }

  render() {
    return (
      <div className="home">
        <button className="selector" onClick={this.getRandomQuote}>Load New Quote</button>
        <div className="quote-div">
          <Quote quote={this.state.quotes[this.state.currentQuoteNumber]} />
        </div>
        {/* { this.state && this.state.quotes.length > 0 &&
          <AllQuotes quotes={this.state.quotes} />
        } */}
      </div>
    );
  }
}

export default App;
