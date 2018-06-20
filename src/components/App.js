import React, { Component } from 'react'
import axios from 'axios'
import Quote from './Quote'
// import AllQuotes from './AllQuotes'
import { getRandomNumber } from '../helpers/helperFunctions'
import colorPalette from '../helpers/colorPalette'


class App extends Component {
  state = {
    quotes: [],
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
    this.changeBackgroundColor()
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
      <div className="home">
        <button className="selector" onClick={this.getRandomQuote}>Load New Quote</button>
        <div className="quote-div">
          { !this.state && 
              <h2>Loading</h2>
          }
          { this.state && this.state.quotes.length > 0 &&
            <Quote quote={this.state.quotes[this.state.currentQuoteNumber]} />
          }
        </div>
        {/* { this.state && this.state.quotes.length > 0 &&
          <AllQuotes quotes={this.state.quotes} />
        } */}
      </div>
    );
  }
}

export default App;
