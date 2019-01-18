import React from 'react'

const Quote = props => {
  if (props.isLoading) return ''
  console.log("Rendering quote with props")
  console.log(props.quote.content)
  console.dir(props)

  return (
    <div>
      <p className="quote">
        {props.quote.content && props.quote.content.length > 0 ? props.quote.content.substring(3, props.quote.content.length-5) : "Loading"}
      </p>
      <h3 className="author">
        {props.quote.title}
      </h3>
      <small className="origin">
        <a href={props.quote.link} alt="link-to-quote">{ props.quote.link } </a>
      </small>
    </div>
  )
}

export default Quote