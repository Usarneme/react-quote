import React from 'react'

class Quote extends React.Component {
  render() {
    // console.log(this.props.quote)
    return (
      <div>
        <p className="quote">
          {this.props.quote.quote}
        </p>
        <h3 className="author">
          {this.props.quote.author}
        </h3>
        <small className="category">
          category: {this.props.quote.cat}
        </small>
      </div>
    )
  }
}

export default Quote