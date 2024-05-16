import React, { useEffect } from 'react'
import UseGlobalContext from '../context/GlobalContext'
import '../styles/page.css'
import AnimeTile from './AnimeTile'

const SearchResults = () => {

  const {searchResults,dispatch,searchResultsPageNo,getSearchResults} = UseGlobalContext();

  function handlePage(mode){

    console.log('entered handle page')
    const currentPage = searchResults?.pagination.current_page;
    const nextPage = searchResults?.pagination?.has_next_page;
    
    if(mode==='prev' && currentPage >1){
      dispatch({type:"SEARCH_RESULT_PAGE",payload:searchResultsPageNo-1});
      getSearchResults();
    }else if(mode==='next' && nextPage){
      dispatch({type:"SEARCH_RESULT_PAGE",payload:searchResultsPageNo+1});
      getSearchResults();
    }
  }

  return (
    <>
    <h2 className='page-title'>Results</h2>
    { searchResults?.data?.length!==0?
    (<>
    <div className='page-anime'>
      {
        searchResults?.data?.map(item=>(
          <AnimeTile item={item} key={item.mal_id} />
        ))
      }
    </div>
    <div className="page-nav-buttons">
      {
        searchResults?.pagination?.current_page!==1&&
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