import React, { Component } from 'react'
import axios from 'axios'
import Quote from './Quote'
import AllQuotes from './AllQuotes'
import { getRandomNumber } from '../helpers'

class App extends Component {
  state = {
    quotes: [],
    currentQuoteNumber: 0,
    currentQuote: ''
  }

  getRandomQuote = () => {
    const randomNumber = getRandomNumber(this.state.quotes.length)
    console.log('getRandomQuote #'+randomNumber+'/'+this.state.quotes.length+' : '+this.state.quotes[randomNumber].quote)
    this.setState({
      currentQuoteNumber: randomNumber,
      currentQuote: this.state.quotes[randomNumber].quote
    })
  }

  componentWillMount() {
    axios.get(`https://talaikis.com/api/quotes/`)
      .then(res => {
        // set state of quotes with fetched quotations
        this.setState({
          quotes: res.data
        })
        // initialize a random quote to display
        this.getRandomQuote()
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
  }

  componentDidUpdate() {
    // Key : Value
    // cachedQuotes : quotes
    localStorage.setItem(this.props.match.params.cachedQuotes, this.state.quotes)
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React-Quotes</h1>
        </header>
        <button onClick={this.getRandomQuote}>New Quote</button>
        <div>
          { this.state && this.state.quotes.length > 0 &&
            <Quote quote={this.state.quotes[this.state.currentQuoteNumber]} />
          }
        </div>
        { this.state && this.state.quotes.length > 0 &&
          <AllQuotes quotes={this.state.quotes} />
        }
      </div>
    );
  }
}

export default App;
