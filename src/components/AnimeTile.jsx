import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/animeTile.css'

const AnimeTile = ({item}) => {
  return (
    <Link to={`anime/${item.mal_id}`}>
      <div className="item-tile">
        <img className='item-tile-thumb' src={item.images.jpg.large_image_url} alt="" />
        <div className="item-tile-overlay">
          <div className="item-tile-titles">
          <h1>{item.title_english}</h1>
          <h2>{item.title}</h2>
          </div>
        </div>
      </div>
      </Link>
  )
}

export default AnimeTile