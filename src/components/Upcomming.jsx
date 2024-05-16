import React, { useEffect } from 'react'
import UseGlobalContext from '../context/GlobalContext'
import '../styles/page.css'
import AnimeTile from './AnimeTile'

const Upcomming = () => {

  const {upcommingAnime,dispatch,upcommingPageNo,getUpcommingAnime} = UseGlobalContext();

  function handlePage(mode){

    const currentPage = upcommingAnime?.pagination?.current_page;
    const nextPage = upcommingAnime?.pagination?.has_next_page;

    if(mode==='prev' && currentPage>1){
      dispatch({type:"UPCOMMING_PAGES",payload:upcommingPageNo-1});
      getUpcommingAnime();
    }else if(mode==='next' && nextPage){
      dispatch({type:"UPCOMMING_PAGES",payload:upcommingPageNo+1});
      getUpcommingAnime();
    }
  }

  return (
    <>
    <h2 className='page-title'>Upcomming</h2>
    <div className='page-anime'>
      {
        upcommingAnime?.data?.map((item,index)=>(
          <AnimeTile item={item} key={index} />
        ))
      }
    </div>
    <div className="page-nav-buttons">
      {
        upcommingAnime?.pagination?.current_page!==1&&
        <button onClick={()=>handlePage('prev')}>Prev</button>
      }{
        upcommingAnime?.pagination?.has_next_page&&
        <button onClick={()=>handlePage('next')}>Next</button>
      } 
    </div>
    </>
  )
}

export default Upcomming