import React, { useEffect } from 'react'
import UseGlobalContext from '../context/GlobalContext'
import '../styles/page.css'
import AnimeTile from './AnimeTile'

const Popular = () => {

  const {popularAnime,dispatch,popularPageNo,getPopularAnime} = UseGlobalContext();

  function handlePage(mode){

    const currentPage = popularAnime?.pagination?.current_page;
    const nextPage = popularAnime?.pagination?.has_next_page;
    if(mode==='prev' && currentPage >1){
      dispatch({type:"POPULAR_PAGES",payload:popularPageNo-1});
      getPopularAnime();
    }else if(mode==='next' && nextPage){
      dispatch({type:"POPULAR_PAGES",payload:popularPageNo+1});
      getPopularAnime();
    }
  }

  return (
    <>
    <h2 className='page-title'>Popular anime</h2>
    <div className='page-anime'>
      {
        popularAnime?.data?.map(item=>(
          <AnimeTile item={item} key={item.mal_id} />
        ))
      }
    </div>
    <div className="page-nav-buttons">
      {
        popularAnime?.pagination?.current_page!==1&&
        <button onClick={()=>handlePage('prev')}>Prev</button>
      }{
        popularAnime?.pagination?.has_next_page&&
        <button onClick={()=>handlePage('next')}>Next</button>
      }
    </div>
    </>
  )
}

export default Popular