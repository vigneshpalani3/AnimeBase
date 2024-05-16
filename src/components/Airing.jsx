import React, { useEffect } from 'react'
import UseGlobalContext from '../context/GlobalContext'
import '../styles/page.css'
import AnimeTile from './AnimeTile'

const Airing = () => {

  const {airingAnime,dispatch,airingPageNo,getAiringAnime} = UseGlobalContext();

  function handlePage(mode){

    const currentPage = airingAnime?.pagination?.current_page;
    const nextPage = airingAnime?.pagination?.has_next_page;

    if(mode==='prev' && currentPage>1){
      dispatch({type:"AIRING_PAGES",payload:airingPageNo-1});
      getAiringAnime();
    }else if(mode==='next' && nextPage){
      dispatch({type:"AIRING_PAGES",payload:airingPageNo+1});
      getAiringAnime();
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
        airingAnime?.pagination?.current_page!==1&&
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