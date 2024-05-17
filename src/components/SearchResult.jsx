import React, { useEffect } from 'react'
import UseGlobalContext from '../context/GlobalContext'
import '../styles/page.css'
import AnimeTile from './AnimeTile'

const SearchResults = () => {

  const {searchResults,dispatch,searchResultsPageNo} = UseGlobalContext();

  function handlePage(mode){

    const nextPage = searchResults?.pagination?.has_next_page;
    
    if(mode==='prev' && searchResultsPageNo>1){
      const prevPage = searchResultsPageNo-1;
      dispatch({type:"SEARCH_RESULT_PAGE",payload:prevPage});
    }else if(mode==='next' && nextPage){
      const nextPage = searchResultsPageNo+1;
      dispatch({type:"SEARCH_RESULT_PAGE",payload:nextPage});
    }
  }

  return (
    <>
    <h2 className='page-title'>Results</h2>
    { searchResults?.data?.length!==0?
    (<>
    <div className='page-anime'>
      {
        searchResults?.data?.map((item,index)=>(
          <AnimeTile item={item} key={index} />
        ))
      }
    </div>
    <div className="page-nav-buttons">
      {
        searchResultsPageNo!==1&&
        <button onClick={()=>handlePage('prev')}>Prev</button>
      }{
        searchResults?.pagination?.has_next_page&&
        <button onClick={()=>handlePage('next')}>Next</button>
      }
    </div>
    </>):
    (
      <div className='no-results'>No Results Found</div>
    )
    }
    </>
  )
}

export default SearchResults