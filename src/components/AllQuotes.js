import React from 'react'
import Quote from './Quote'

class AllQuotes extends React.Component {
  render() {
    // console.dir(this.props.quotes.length)

    // if there's nothing to show (not loaded yet) return
    if(!this.props.quotes || this.props.quotes.length === 1599) return null

    return (
      <div className="quotes-div">
        <h4>All Quotes</h4>
        <ul className="quotes-ul">
        {
          this.props.quotes.map((quote, index) => {
            return (
                    <li className="quote-li" key={index}>
                      <Quote quote={quote} className="quote-small" />
                    </li>
                  )
          })  
        }
        </ul>
      </div>
    )
  }
}

export default AllQuotes
