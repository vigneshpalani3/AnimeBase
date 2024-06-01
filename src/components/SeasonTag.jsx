import React from 'react'
import { Link } from 'react-router-dom'

const SeasonTag = ({item}) => {

  return (
    <div className='season-item'>
      <h3>{item.year}</h3>
      <div className='seasons'>
        {
          item?.seasons?.map(season=>(
            <Link key={season} to={`season/${item.year}/${season}`}>
              <div className='season-tag'>{season}</div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default SeasonTag