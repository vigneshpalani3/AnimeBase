import React from 'react'
import UseGlobalContext from '../context/GlobalContext'
import '../styles/page.css'
import AnimeTile from './AnimeTile'

const Popular = () => {

  const {popularAnime,dispatch,popularPageNo} = UseGlobalContext();

  function handlePopularPage(mode){
    
    const hasNextPage = popularAnime?.pagination?.has_next_page;

    if(mode==='prev' && popularPageNo>1){
      const prevPage = popularPageNo-1;
      dispatch({type:'POPULAR_PAGE',payload:prevPage});
    }else if(mode==='next' && hasNextPage){
      const nextPage = popularPageNo+1;
      dispatch({type:"POPULAR_PAGE",payload:nextPage});
    }
    console.log('page No :'+popularPageNo);
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
        popularPageNo!==1 &&
        <button onClick={()=>handlePopularPage('prev')}>Prev</button>
      }{
        popularAnime?.pagination?.has_next_page&&
        <button onClick={()=>handlePopularPage('next')}>Next</button>
      }
    </div>
    </>
  )
}

export default Popular