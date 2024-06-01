import React, { useEffect, useState } from 'react'
import '../styles/page.css'
import AnimeTile from './AnimeTile'
import { useParams } from 'react-router-dom'
import UseGlobalContext from '../context/GlobalContext'
import Loader from './Loader'

const SeasonalAnime = () => {

  const {year,season} =  useParams()
  const [pageNo,setPageNo] = useState(1)
  const {dispatch,isLoading} = UseGlobalContext()
  const [seasonAnime,setSeasonAnime] = useState([])

  useEffect(()=>{
    getSeasonalAnime()
    window.scrollTo(0,0)
  },[pageNo])

  async function getSeasonalAnime(){
    try{
      dispatch({type:'LOADING'})
      const url = `https://api.jikan.moe/v4/seasons/${year}/${season}?page=${pageNo}`
      const responce = await fetch(url)
      const data = await responce.json()
      if(responce.ok){
        setSeasonAnime(data)
      }else{
        dispatch({type:"ACTIVE",payload:'error'});
        dispatch({type:"ERROR",payload:data});
      }
      dispatch({type:"LOADED"});
    }catch(err){
      console.log(err)
    }
    console.log(pageNo)
  } 

  function handlePage(mode){

    const hasNextPage = seasonAnime?.pagination?.has_next_page;
    console.log(hasNextPage)
    console.log(mode)
    if(mode==='prev' && pageNo>1){
      const prevPage = pageNo-1;
      setPageNo(prevPage)
    }else if(mode==='next' && hasNextPage){
      const nextPage = pageNo+1;
      setPageNo(nextPage)
    }
  }

  return (
    <>
    <h2 className='page-title'>{`${year} - ${season}`}</h2>
    {
      !isLoading ? (
        <>
        <div className='page-anime'>
          {
            seasonAnime?.data?.map((item,index)=>(
              <AnimeTile item={item} key={index} />
            ))
          }
        </div>
        <div className="page-nav-buttons">
          {
            pageNo!==1&&
            <button onClick={()=>handlePage('prev')}>Prev</button>
          }{
            seasonAnime?.pagination?.has_next_page&&
            <button onClick={()=>handlePage('next')}>Next</button>
          } 
        </div>
        </>
      ):<Loader />
    }
    </>
  )
}

export default SeasonalAnime