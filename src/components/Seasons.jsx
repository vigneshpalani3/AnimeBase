import React, { useContext } from 'react'
import UseGlobalContext from '../context/GlobalContext'
import SeasonTag from './SeasonTag'
import '../styles/season-tag.css'

const Seasons = () => {

  const {seasonList} = UseGlobalContext()
  console.log(seasonList)
  return (
    <>
    <h2 className='page-title'>Seasons list</h2>
    <div className="seasons-page">
      {
        seasonList && seasonList.map(item=>(
          <SeasonTag key={item.year} item={item} />
        ))
      }
    </div>
    </>
  )
}

export default Seasons