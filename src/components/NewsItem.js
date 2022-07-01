import React from 'react'

function NewsItem(props) {
    let {title, description, imageUrl, newsUrl, author , date, source} = props
  return (
    <>
      <div className='my-3'>
        <div className="card">
          <div style={{display: "flex", justifyContent:"flex-end", position:"absolute", right:0}}>
            <span className=" badge rounded-pill bg-danger" >{source}</span></div>
          
        <img src={!imageUrl? "https://static.politico.com/3c/eb/3f5946b24c1eb8dec0dd41dc52c5/https-delivery.gettyimages.com/downloads/1347922452":imageUrl} className="card-img-top" alt=""/>
           <div className="card-body">
           <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className='card-text'><small className='text-muted'>By {!author ? "Unknown": author} on {date}</small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read more</a>
            </div>
        </div>
      </div>
    </>
  )
}

export default NewsItem
