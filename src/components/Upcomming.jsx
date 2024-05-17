import React from 'react'
import UseGlobalContext from '../context/GlobalContext'
import '../styles/page.css'
import AnimeTile from './AnimeTile'

const Upcomming = () => {

  const {upcommingAnime,dispatch,upcommingPageNo} = UseGlobalContext();

  function handlePage(mode){

    const hasNextPage = upcommingAnime?.pagination?.has_next_page;

    if(mode==='prev' && upcommingPageNo>1){
      const prevPage = upcommingPageNo-1;
      dispatch({type:"UPCOMMING_PAGES",payload:prevPage});
    }else if(mode==='next' && hasNextPage){
      const nextPage = upcommingPageNo+1;
      dispatch({type:"UPCOMMING_PAGES",payload:nextPage});
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
        upcommingPageNo!==1&&
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