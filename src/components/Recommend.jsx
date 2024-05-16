import React from 'react'
import UseGlobalContext from '../context/GlobalContext'
import '../styles/recommend.css'

const Recommend = () => {

  const {recommendation} = UseGlobalContext();

  return (
    <>
    <h1 className='page-title'>Recommendation</h1>
    <div className='recommend-page'>
      {
        recommendation?.data?.map((item,index)=>(
          <div className='recom-item' key={index}>
            <div className="recommendations">
              {
                item?.entry?.map((entry,index)=>(
                  <div className='entry-item' key={index}>
                    <img src={entry?.images?.jpg?.large_image_url} alt="" />
                    <h4>#{index+1}</h4>
                </div>
                ))
              }
            </div>
            <div className="recom-content">
              {item.content}
              <div className="anime-titles">
              {
                item?.entry?.map((entryItm,index)=>(
                  <span key={index} className="itm-title">#{`${index+1} ${entryItm.title}`}</span>
                ))
              }
              </div>
            </div>
          </div>

        ))
      }
    </div>
    </>
  )
}

export default Recommend