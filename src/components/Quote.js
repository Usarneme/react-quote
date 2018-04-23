import React from 'react'

class Quote extends React.Component {
  render() {
    // console.log(this.props.quote)
    return (
      <div className="quote-div">
        <h3 className="author">
          {this.props.quote.author}
        </h3>
        <p className="quote">
          {this.props.quote.quote}
        </p>
        <small>
          category: {this.props.quote.cat}
        </small>
      </div>
    )
  }
}

export default Quote