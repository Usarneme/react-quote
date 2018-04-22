import React, { Component } from 'react'
import axios from 'axios'
import Quote from './Quote'
import sampleQuotes from '../sample-quotes'
import { getRandomNumber } from '../helpers'

class App extends Component {
  state = {
    quotes: [],
    currentQuoteNumber: 0,
    currentQuote: ''
  }

  displayNewQuote = () => {
    const randomNumber = getRandomNumber(this.state.quotes.length)
    console.log('displayNewQuote #'+randomNumber+'/'+this.state.quotes.length+' : '+this.state.quotes[randomNumber].quote)
    this.setState({
      currentQuoteNumber: randomNumber,
      currentQuote: this.state.quotes[randomNumber].quote
    })
  }

  componentWillMount() {
    axios.get(`https://talaikis.com/api/quotes/`)
      .then(res => {
        this.setState({
          quotes: res.data
        })
        this.displayNewQuote()
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
        <button onClick={this.displayNewQuote}>New Quote</button>
        { this.state && this.state.quotes.length > 0 &&
          <Quote quote={this.state.quotes[this.state.currentQuoteNumber]} />
        }

        <ul className="quotes-holder">
          {
            // this.state.quotes.map(quote => <Quote quote={quote} />)
          }
        </ul>

      </div>
    );
  }
}

export default App;
