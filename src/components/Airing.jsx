import React, { useEffect } from 'react'
import UseGlobalContext from '../context/GlobalContext'
import '../styles/page.css'
import AnimeTile from './AnimeTile'

const Airing = () => {

  const {airingAnime,dispatch,airingPageNo} = UseGlobalContext();

  function handlePage(mode){

    const hasNextPage = airingAnime?.pagination?.has_next_page;

    if(mode==='prev' && airingPageNo>1){
      const prevPage = airingPageNo-1;
      dispatch({type:"AIRING_PAGES",payload:prevPage});
    }else if(mode==='next' && hasNextPage){
      const nextPage = airingPageNo+1;
      dispatch({type:"AIRING_PAGES",payload:nextPage});
    }
  }


  return (
    <>
    <h2 className='page-title'>Airing</h2>
    <div className='page-anime'>
      {
        airingAnime?.data?.map((item,index)=>(
          <AnimeTile item={item} key={index} />
        ))
      }
    </div>
    <div className="page-nav-buttons">
      {
        airingPageNo!==1&&
        <button onClick={()=>handlePage('prev')}>Prev</button>
      }{
        airingAnime?.pagination?.has_next_page&&
        <button onClick={()=>handlePage('next')}>Next</button>
      } 
    </div>
    </>
  )
}

export default Airing